-- =========================================================================
-- MIGRATION 005: Login-First Architecture & Strict Role-Based Security
-- Enforces login-first access, client data isolation, and admin management.
-- =========================================================================

-- 1. Profiles Table Updates
alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('admin', 'client', 'customer'));

alter table public.profiles
  add column if not exists is_active boolean default true not null;

-- Ensure helper function for admin check
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and is_active = true
  );
$$;

-- Ensure helper function for client check
create or replace function public.is_client()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('customer', 'client') and is_active = true
  );
$$;

-- 2. Consultations Table Security & Foreign Keys
do $$
begin
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'consultations' and column_name = 'client_id'
  ) then
    alter table public.consultations 
      add column client_id uuid references public.profiles(id) on delete set null;
  end if;
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'consultations' and column_name = 'portal_visible'
  ) then
    alter table public.consultations 
      add column portal_visible boolean default false not null;
  end if;
  if not exists (
    select 1 from information_schema.columns 
    where table_name = 'consultations' and column_name = 'internal_notes'
  ) then
    alter table public.consultations 
      add column internal_notes text default null;
  end if;
end $$;

-- 3. Row Level Security Policies

-- Profiles Policies
alter table public.profiles enable row level security;

drop policy if exists "Admins full access on profiles" on public.profiles;
create policy "Admins full access on profiles"
  on public.profiles for all
  using (public.is_admin());

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile"
  on public.profiles for select
  using (id = auth.uid());

drop policy if exists "Users update own profile" on public.profiles;
create policy "Users update own profile"
  on public.profiles for update
  using (id = auth.uid());

-- Consultations Policies
alter table public.consultations enable row level security;

drop policy if exists "Admins full access on consultations" on public.consultations;
create policy "Admins full access on consultations"
  on public.consultations for all
  using (public.is_admin());

drop policy if exists "Clients read own visible consultation" on public.consultations;
create policy "Clients read own visible consultation"
  on public.consultations for select
  using (
    (
      client_id = auth.uid() 
      or client_phone in (select phone from public.profiles where id = auth.uid())
    )
    and portal_visible = true
  );

-- Journey Stage Progress Policies
alter table public.journey_stage_progress enable row level security;

drop policy if exists "Admins full access on stage progress" on public.journey_stage_progress;
create policy "Admins full access on stage progress"
  on public.journey_stage_progress for all
  using (public.is_admin());

drop policy if exists "Clients read own stage progress" on public.journey_stage_progress;
create policy "Clients read own stage progress"
  on public.journey_stage_progress for select
  using (
    consultation_id in (
      select id from public.consultations
      where (
        client_id = auth.uid() 
        or client_phone in (select phone from public.profiles where id = auth.uid())
      )
      and portal_visible = true
    )
  );

-- Journey Updates Policies
alter table public.journey_updates enable row level security;

drop policy if exists "Admins full access on journey updates" on public.journey_updates;
create policy "Admins full access on journey updates"
  on public.journey_updates for all
  using (public.is_admin());

drop policy if exists "Clients read own journey updates" on public.journey_updates;
create policy "Clients read own journey updates"
  on public.journey_updates for select
  using (
    consultation_id in (
      select id from public.consultations
      where (
        client_id = auth.uid() 
        or client_phone in (select phone from public.profiles where id = auth.uid())
      )
      and portal_visible = true
    )
  );

-- Portal Messages Policies
alter table public.portal_messages enable row level security;

drop policy if exists "Admins full access on portal messages" on public.portal_messages;
create policy "Admins full access on portal messages"
  on public.portal_messages for all
  using (public.is_admin());

drop policy if exists "Clients read own consultation messages" on public.portal_messages;
create policy "Clients read own consultation messages"
  on public.portal_messages for select
  using (
    consultation_id in (
      select id from public.consultations
      where client_id = auth.uid() or client_phone in (select phone from public.profiles where id = auth.uid())
    )
  );

drop policy if exists "Clients insert own messages" on public.portal_messages;
create policy "Clients insert own messages"
  on public.portal_messages for insert
  with check (
    sender_id = auth.uid() and
    consultation_id in (
      select id from public.consultations
      where client_id = auth.uid() or client_phone in (select phone from public.profiles where id = auth.uid())
    )
  );
