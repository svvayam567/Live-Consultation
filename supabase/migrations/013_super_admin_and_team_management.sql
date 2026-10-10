-- =========================================================================
-- MIGRATION 013: Super Admin, Team Management, Instant Lockout & Activity Log
-- Safe and idempotent: safe to execute multiple times
-- =========================================================================

-- 1. ADD COLUMNS TO PROFILES (active, must_change_password)
alter table public.profiles
  add column if not exists active boolean default true not null;

alter table public.profiles
  add column if not exists must_change_password boolean default false not null;

alter table public.profiles
  add column if not exists is_active boolean default true;

-- Update role constraint on profiles to allow 'super_admin'
alter table public.profiles drop constraint if exists profiles_role_check;
do $$
begin
  alter table public.profiles
    add constraint profiles_role_check check (role in ('super_admin', 'admin', 'client', 'customer'));
exception
  when duplicate_object then null;
  when others then null;
end $$;

-- Synchronize 'active' and 'is_active' columns automatically
create or replace function public.sync_profile_active_status()
returns trigger
language plpgsql
as $$
begin
  if new.active is distinct from old.active then
    new.is_active = new.active;
  elsif new.is_active is distinct from old.is_active then
    new.active = coalesce(new.is_active, true);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_sync_profile_active on public.profiles;
create trigger trg_sync_profile_active
  before insert or update on public.profiles
  for each row execute function public.sync_profile_active_status();

-- 2. PROMOTE PHONE 8074257384 TO 'super_admin'
update public.profiles
set role = 'super_admin',
    active = true,
    is_active = true,
    must_change_password = false
where phone like '%8074257384%';

-- 3. CORE SECURITY DEFINER FUNCTIONS: is_admin() and is_super_admin()
-- Both functions enforce that the account MUST be active (instant lockout enforcement at DB level)
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('admin', 'super_admin')
      and coalesce(active, is_active, true) = true
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'super_admin'
      and coalesce(active, is_active, true) = true
  );
$$;

grant execute on function public.is_admin() to authenticated, anon;
grant execute on function public.is_super_admin() to authenticated, anon;

-- 4. APPEND-ONLY ADMIN ACTIVITY AUDIT LOG TABLE
create table if not exists public.admin_activity (
  id uuid default gen_random_uuid() primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  actor_name text,
  action text not null check (action in (
    'admin_created',
    'admin_disabled',
    'admin_enabled',
    'admin_deleted',
    'admin_password_reset',
    'customer_created',
    'consultation_deleted',
    'login'
  )),
  target text,
  created_at timestamptz default now() not null
);

create index if not exists idx_admin_activity_created_at on public.admin_activity (created_at desc);
create index if not exists idx_admin_activity_actor_id on public.admin_activity (actor_id);
create index if not exists idx_admin_activity_action on public.admin_activity (action);

-- Enable RLS on admin_activity
alter table public.admin_activity enable row level security;

-- Drop all existing policies on admin_activity to keep clean
drop policy if exists "Super admins view activity log" on public.admin_activity;
drop policy if exists "Admins insert activity log" on public.admin_activity;
drop policy if exists "No updates on activity log" on public.admin_activity;
drop policy if exists "No deletes on activity log" on public.admin_activity;

-- Policy: Only super_admin can read the activity log
create policy "Super admins view activity log"
  on public.admin_activity for select
  using (public.is_super_admin());

-- Policy: Authenticated admins and super admins can insert audit records
create policy "Admins insert activity log"
  on public.admin_activity for insert
  with check (public.is_admin());

-- NOTE: No UPDATE or DELETE policies are granted to ANYONE (including super admin).
-- This strictly guarantees that the activity table is immutable and append-only.

-- RPC Helper for logging activity from client or database functions
create or replace function public.log_admin_activity(
  p_action text,
  p_target text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor_name text;
  v_is_active boolean;
begin
  select name, coalesce(active, is_active, true)
  into v_actor_name, v_is_active
  from public.profiles
  where id = auth.uid();

  if v_is_active is not true then
    raise exception 'Inactive or disabled account cannot perform actions.';
  end if;

  insert into public.admin_activity (
    actor_id,
    actor_name,
    action,
    target,
    created_at
  ) values (
    auth.uid(),
    coalesce(v_actor_name, 'Svvayam Admin'),
    p_action,
    p_target,
    now()
  );
end;
$$;

grant execute on function public.log_admin_activity(text, text) to authenticated;

-- 5. UPDATE PROFILES RLS POLICIES
alter table public.profiles enable row level security;

drop policy if exists "Admins full access on profiles" on public.profiles;
drop policy if exists "Admins read all profiles" on public.profiles;
drop policy if exists "Super admins full access on profiles" on public.profiles;
drop policy if exists "Admins manage client profiles" on public.profiles;
drop policy if exists "Users read own profile" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Users can update their own profile name" on public.profiles;

-- Active users can read their own profile (disabled profiles cannot)
create policy "Users read own profile"
  on public.profiles for select
  using (
    id = auth.uid() 
    and coalesce(active, is_active, true) = true
  );

-- All active admins & super admins can view all profiles
create policy "Admins read all profiles"
  on public.profiles for select
  using (public.is_admin());

-- Super admin has full control over all profiles
create policy "Super admins full access on profiles"
  on public.profiles for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- Regular admins can update and manage customer/client profiles only
create policy "Admins manage client profiles"
  on public.profiles for update
  using (
    public.is_admin() 
    and role in ('client', 'customer')
  )
  with check (
    public.is_admin() 
    and role in ('client', 'customer')
  );

-- Users can update their own profile display information if active
create policy "Users update own profile"
  on public.profiles for update
  using (
    id = auth.uid() 
    and coalesce(active, is_active, true) = true
  )
  with check (
    id = auth.uid() 
    and coalesce(active, is_active, true) = true
  );

-- 6. UPDATE PROJECTS RLS POLICIES
alter table public.projects enable row level security;

drop policy if exists "Admins have full access to projects" on public.projects;
create policy "Admins have full access to projects"
  on public.projects for all
  using (public.is_admin())
  with check (public.is_admin());

-- 7. UPDATE ATOMIC RPC admin_delete_consultation
create or replace function public.admin_delete_consultation(p_consultation_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller_role text;
  v_caller_name text;
  v_rows_deleted integer;
  v_client_name text;
begin
  -- 1. Verify caller has active admin or super_admin role
  if not public.is_admin() then
    raise exception 'Permission denied: Only active administrators can delete consultations.';
  end if;

  select name, role into v_caller_name, v_caller_role
  from public.profiles
  where id = auth.uid();

  -- Get consultation details for activity log
  select client_name into v_client_name
  from public.consultations
  where id = p_consultation_id;

  -- 2. Clean up child records belonging strictly to this consultation
  delete from public.journey_stage_progress where consultation_id = p_consultation_id;
  delete from public.journey_updates where consultation_id = p_consultation_id;
  delete from public.portal_messages where consultation_id = p_consultation_id;
  delete from public.consultation_images where consultation_id = p_consultation_id;
  delete from public.sheet_sync_log where consultation_id = p_consultation_id;

  -- 3. Delete consultation row
  delete from public.consultations where id = p_consultation_id;
  get diagnostics v_rows_deleted = row_count;

  -- 4. Record to admin_activity log
  if v_rows_deleted > 0 then
    insert into public.admin_activity (
      actor_id,
      actor_name,
      action,
      target,
      created_at
    ) values (
      auth.uid(),
      coalesce(v_caller_name, 'Svvayam Admin'),
      'consultation_deleted',
      coalesce('Consultation of ' || v_client_name || ' (' || p_consultation_id::text || ')', 'Consultation ' || p_consultation_id::text),
      now()
    );
  end if;

  return v_rows_deleted > 0;
end;
$$;

grant execute on function public.admin_delete_consultation(uuid) to authenticated;
