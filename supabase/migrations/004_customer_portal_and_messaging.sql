-- =========================================================================
-- MIGRATION 004: Customer Portal, Access Roles & Realtime Messaging
-- Adds customer portal access controls, portal visibility toggle,
-- internal admin notes, 8-stage progress tracking, and customer messaging.
-- =========================================================================

-- 1. Update profiles table to include customer role and active status
alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check 
  check (role in ('admin', 'client', 'customer'));

alter table public.profiles
  add column if not exists is_active boolean default true not null;

-- 2. Update consultations table for portal visibility and internal admin notes
alter table public.consultations
  add column if not exists portal_visible boolean default false not null;

alter table public.consultations
  add column if not exists internal_notes text default null;

-- Ensure client_id column is present and references public.profiles
do $$
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'consultations' and column_name = 'client_id'
  ) then
    alter table public.consultations 
      add column client_id uuid references public.profiles(id) on delete set null;
  end if;
end $$;

-- 3. Create journey_stage_progress table (tracking status per consultation & stage)
create table if not exists public.journey_stage_progress (
  id uuid default uuid_generate_v4() primary key,
  consultation_id uuid references public.consultations(id) on delete cascade not null,
  stage integer not null check (stage >= 0 and stage < 8),
  status text not null check (status in ('not_started', 'in_progress', 'completed')) default 'not_started',
  start_date date,
  completion_date date,
  notes text,
  updated_at timestamptz default now() not null,
  unique (consultation_id, stage)
);

-- 4. Create journey_updates table (feed of timeline updates posted by team)
create table if not exists public.journey_updates (
  id uuid default uuid_generate_v4() primary key,
  consultation_id uuid references public.consultations(id) on delete cascade not null,
  stage integer check (stage >= 0 and stage < 8),
  title text not null,
  note text not null,
  media_urls jsonb default '[]'::jsonb not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null
);

-- 5. Create portal_messages table (realtime thread per consultation)
create table if not exists public.portal_messages (
  id uuid default uuid_generate_v4() primary key,
  consultation_id uuid references public.consultations(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete set null,
  sender_role text not null check (sender_role in ('customer', 'admin', 'team')),
  sender_name text not null,
  content text not null,
  attachment_url text,
  attachment_name text,
  attachment_type text,
  section_context text,
  is_read boolean default false not null,
  created_at timestamptz default now() not null
);

-- Enable Realtime on portal_messages and journey_updates
alter publication supabase_realtime add table public.portal_messages;
alter publication supabase_realtime add table public.journey_updates;

-- 6. Restricted database view for customer portal (omits internal notes, fee workings, creator info)
create or replace view public.customer_consultation_view as
select
  c.id,
  c.client_id,
  c.client_phone,
  c.fields,
  c.selected_reference,
  c.current_step,
  c.status,
  c.portal_visible,
  c.created_at,
  c.updated_at,
  p.name as client_name
from public.consultations c
left join public.profiles p on p.id = c.client_id
where c.portal_visible = true;

-- 7. Row Level Security Policies
alter table public.journey_stage_progress enable row level security;
alter table public.journey_updates enable row level security;
alter table public.portal_messages enable row level security;

-- Journey stage progress policies
create policy "Admins have full access to stage progress"
  on public.journey_stage_progress for all
  using (public.is_admin());

create policy "Customers can view stage progress of visible consultations"
  on public.journey_stage_progress for select
  using (
    consultation_id in (
      select id from public.consultations
      where (client_id = auth.uid() or client_phone in (select phone from public.profiles where id = auth.uid()))
        and portal_visible = true
    )
  );

-- Journey updates policies
create policy "Admins have full access to journey updates"
  on public.journey_updates for all
  using (public.is_admin());

create policy "Customers can view updates of visible consultations"
  on public.journey_updates for select
  using (
    consultation_id in (
      select id from public.consultations
      where (client_id = auth.uid() or client_phone in (select phone from public.profiles where id = auth.uid()))
        and portal_visible = true
    )
  );

-- Portal messages policies
create policy "Admins have full access to portal messages"
  on public.portal_messages for all
  using (public.is_admin());

create policy "Customers can view messages in their consultation"
  on public.portal_messages for select
  using (
    consultation_id in (
      select id from public.consultations
      where client_id = auth.uid() or client_phone in (select phone from public.profiles where id = auth.uid())
    )
  );

create policy "Customers can send messages in their consultation"
  on public.portal_messages for insert
  with check (
    sender_id = auth.uid() and
    consultation_id in (
      select id from public.consultations
      where client_id = auth.uid() or client_phone in (select phone from public.profiles where id = auth.uid())
    )
  );

-- Storage bucket for portal attachments (private bucket)
insert into storage.buckets (id, name, public)
values ('portal-attachments', 'portal-attachments', false)
on conflict (id) do update set public = false;

create policy "Admins can manage portal attachments"
  on storage.objects for all
  using (bucket_id = 'portal-attachments' and public.is_admin());

create policy "Authenticated users can upload portal attachments"
  on storage.objects for insert
  with check (bucket_id = 'portal-attachments' and auth.role() = 'authenticated');

create policy "Authenticated users can read portal attachments"
  on storage.objects for select
  using (bucket_id = 'portal-attachments' and auth.role() = 'authenticated');
