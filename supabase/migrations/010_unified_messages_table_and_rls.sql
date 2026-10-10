-- =========================================================================
-- MIGRATION 010: Unified Customer-to-Admin Messages Table & RLS Policies
-- Single table 'messages' with customer_id, sender_role, body, read flags
-- =========================================================================

-- 1. Create public.messages table if it does not exist
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  sender_role text not null check (sender_role in ('client', 'admin')),
  sender_id uuid references public.profiles(id) on delete set null,
  body text not null,
  created_at timestamptz default now() not null,
  read_by_admin boolean default false not null,
  read_by_customer boolean default false not null,
  attachment_url text,
  attachment_name text
);

-- In case messages table already existed with missing columns, add them safely:
do $$
begin
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'messages' and column_name = 'customer_id') then
    alter table public.messages add column customer_id uuid references public.profiles(id) on delete cascade;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'messages' and column_name = 'sender_role') then
    alter table public.messages add column sender_role text check (sender_role in ('client', 'admin'));
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'messages' and column_name = 'sender_id') then
    alter table public.messages add column sender_id uuid references public.profiles(id) on delete set null;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'messages' and column_name = 'body') then
    alter table public.messages add column body text;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'messages' and column_name = 'read_by_admin') then
    alter table public.messages add column read_by_admin boolean default false not null;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'messages' and column_name = 'read_by_customer') then
    alter table public.messages add column read_by_customer boolean default false not null;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'messages' and column_name = 'attachment_url') then
    alter table public.messages add column attachment_url text;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'messages' and column_name = 'attachment_name') then
    alter table public.messages add column attachment_name text;
  end if;
end $$;

-- 2. Performance indexes
create index if not exists idx_messages_customer_id_created on public.messages (customer_id, created_at asc);
create index if not exists idx_messages_unread_admin on public.messages (read_by_admin) where read_by_admin = false;
create index if not exists idx_messages_unread_customer on public.messages (customer_id, read_by_customer) where read_by_customer = false;

-- 3. Enable Realtime on messages
do $$
begin
  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'messages'
  ) then
    alter publication supabase_realtime add table public.messages;
  end if;
exception
  when others then null;
end $$;

-- 4. Enable Row Level Security (RLS)
alter table public.messages enable row level security;

-- Drop existing policies if any to ensure clean idempotent setup
drop policy if exists "Admins have full access to messages" on public.messages;
drop policy if exists "Admins read all messages" on public.messages;
drop policy if exists "Admins insert messages" on public.messages;
drop policy if exists "Admins update messages" on public.messages;
drop policy if exists "Clients read own messages" on public.messages;
drop policy if exists "Clients insert own messages" on public.messages;
drop policy if exists "Clients update read status on own messages" on public.messages;

-- Ensure is_admin function exists and checks profiles.role = 'admin'
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and is_active = true
  );
$$;

-- Admin Policy: Admins can read, insert and update all messages
create policy "Admins have full access to messages"
  on public.messages for all
  using (public.is_admin())
  with check (public.is_admin());

-- Customer Policy: Customers can read only messages where customer_id is their own id
create policy "Clients read own messages"
  on public.messages for select
  using (customer_id = auth.uid());

-- Customer Policy: Customers can insert only messages where customer_id is their own id and sender_role = 'client'
create policy "Clients insert own messages"
  on public.messages for insert
  with check (
    customer_id = auth.uid()
    and sender_id = auth.uid()
    and sender_role = 'client'
  );

-- Customer Policy: Customers can update read_by_customer on their own messages
create policy "Clients update read status on own messages"
  on public.messages for update
  using (customer_id = auth.uid())
  with check (customer_id = auth.uid());

-- 5. Safe migration of any existing messages from portal_messages
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'portal_messages') then
    insert into public.messages (
      id,
      customer_id,
      sender_role,
      sender_id,
      body,
      created_at,
      read_by_admin,
      read_by_customer,
      attachment_url,
      attachment_name
    )
    select
      pm.id,
      coalesce(c.client_id, pm.sender_id) as customer_id,
      case when pm.sender_role in ('admin', 'team') then 'admin' else 'client' end as sender_role,
      pm.sender_id,
      coalesce(pm.content, '') as body,
      pm.created_at,
      coalesce(pm.is_read, false) as read_by_admin,
      true as read_by_customer,
      pm.attachment_url,
      pm.attachment_name
    from public.portal_messages pm
    left join public.consultations c on c.id = pm.consultation_id
    where coalesce(c.client_id, pm.sender_id) in (select id from public.profiles)
    on conflict (id) do nothing;
  end if;
end $$;
