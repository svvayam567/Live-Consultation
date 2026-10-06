-- =========================================================================
-- SVVAYAM LIVE CONSULTATION - INITIAL DATABASE SCHEMA
-- Migrations for Supabase PostgreSQL
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  phone text not null unique,
  role text not null check (role in ('admin', 'client')) default 'client',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. CONSULTATIONS TABLE
create table if not exists public.consultations (
  id uuid default uuid_generate_v4() primary key,
  created_by uuid references public.profiles(id) on delete set null,
  client_id uuid references public.profiles(id) on delete set null,
  client_phone text,
  fields jsonb default '{}'::jsonb not null,
  selected_refs jsonb default '[]'::jsonb not null,
  current_step integer default 0 not null,
  status text check (status in ('draft', 'proposal_sent', 'completed')) default 'draft' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CONSULTATION IMAGES TABLE (Step 3 site photos & client references)
create table if not exists public.consultation_images (
  id uuid default uuid_generate_v4() primary key,
  consultation_id uuid references public.consultations(id) on delete cascade not null,
  storage_path text not null,
  kind text check (kind in ('Client reference', 'Inspiration', 'Completed Svvayam project')) not null,
  caption text default '',
  step integer default 2 not null,
  sort_order integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. REFERENCE GRID TABLE (4x4 Matrix Slots 0-15)
create table if not exists public.reference_grid (
  slot integer primary key check (slot >= 0 and slot < 16),
  storage_path text not null,
  caption text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. JOURNEY ASSETS TABLE (8 Stages 0-7)
create table if not exists public.journey_assets (
  id uuid default uuid_generate_v4() primary key,
  stage integer not null check (stage >= 0 and stage < 8),
  storage_path text not null,
  mime_type text not null,
  caption text not null,
  sort_order integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. CLIENT PROJECTS TABLE (Client Architecture Explorer Data)
create table if not exists public.client_projects (
  id text primary key,
  client_name text not null,
  category text not null check (category in ('Compact', 'Medium', 'Grand')),
  stage text,
  asset_url text not null,
  storage_path text,
  caption text,
  sort_order integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. GOOGLE SHEET SYNC LOG TABLE
create table if not exists public.sheet_sync_log (
  id uuid default uuid_generate_v4() primary key,
  consultation_id uuid references public.consultations(id) on delete cascade not null,
  status text not null check (status in ('success', 'failure', 'pending')),
  error text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

alter table public.profiles enable row level security;
alter table public.consultations enable row level security;
alter table public.consultation_images enable row level security;
alter table public.reference_grid enable row level security;
alter table public.journey_assets enable row level security;
alter table public.client_projects enable row level security;
alter table public.sheet_sync_log enable row level security;

-- Helper function to check if current user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Profiles:
-- Any authenticated user can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

-- Admins can update profiles (e.g. promoting roles)
create policy "Admins can update profiles"
  on public.profiles for update
  using (public.is_admin());

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Consultations:
-- Admins have full access
create policy "Admins have full access to consultations"
  on public.consultations for all
  using (public.is_admin());

-- Clients can read only their own consultations (by client_id or phone matching profile)
create policy "Clients can view own consultations"
  on public.consultations for select
  using (
    auth.uid() = client_id or
    client_phone in (select phone from public.profiles where id = auth.uid())
  );

-- Consultation images:
create policy "Admins have full access to consultation images"
  on public.consultation_images for all
  using (public.is_admin());

create policy "Clients can view own consultation images"
  on public.consultation_images for select
  using (
    consultation_id in (
      select id from public.consultations
      where auth.uid() = client_id or
      client_phone in (select phone from public.profiles where id = auth.uid())
    )
  );

-- Reference Grid, Journey Assets, Client Projects:
-- Readable by any authenticated user; writable only by admins
create policy "Anyone authenticated can read reference grid"
  on public.reference_grid for select
  using (auth.role() = 'authenticated');

create policy "Admins can manage reference grid"
  on public.reference_grid for all
  using (public.is_admin());

create policy "Anyone authenticated can read journey assets"
  on public.journey_assets for select
  using (auth.role() = 'authenticated');

create policy "Admins can manage journey assets"
  on public.journey_assets for all
  using (public.is_admin());

create policy "Anyone can read client projects"
  on public.client_projects for select
  using (true);

create policy "Admins can manage client projects"
  on public.client_projects for all
  using (public.is_admin());

-- Sheet Sync Log:
create policy "Admins can manage sheet sync logs"
  on public.sheet_sync_log for all
  using (public.is_admin());
