-- =====================================================================
-- Migration 011: Consultant Name Tracking & Draft Consultation Deletion RLS
-- =====================================================================

-- 1. Ensure 'name' column exists on profiles table (full name, required for admins)
alter table public.profiles
  add column if not exists name text;

-- Safe update statement for existing admin (phone 8074257384):
-- (Fill in your real name below and execute in Supabase SQL editor)
update public.profiles
set name = 'Ar. Jagirdhar'
where phone like '%8074257384%' and role = 'admin';

-- 2. Add consultant_id and consultant_name to consultations table
alter table public.consultations
  add column if not exists consultant_id uuid references auth.users(id) on delete set null;

alter table public.consultations
  add column if not exists consultant_name text;

-- Backfill legacy consultations without a consultant name to fallback 'Svvayam Admin'
update public.consultations
set consultant_name = coalesce(consultant_name, 'Svvayam Admin')
where consultant_name is null;

-- Index for consultant lookups
create index if not exists idx_consultations_consultant_id
  on public.consultations(consultant_id);

-- 3. Row Level Security policy for deleting draft consultations
-- Enforces in the database that ONLY authenticated admins can delete consultations,
-- and ONLY when status = 'draft'. Completed/proposal_sent consultations CANNOT be deleted.
alter table public.consultations enable row level security;

drop policy if exists "Admins can delete draft consultations" on public.consultations;
create policy "Admins can delete draft consultations"
  on public.consultations for delete
  using (
    public.is_admin() and status = 'draft'
  );

-- 4. Policy for admins and users to edit their own profile display name
drop policy if exists "Users can update their own profile name" on public.profiles;
create policy "Users can update their own profile name"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());
