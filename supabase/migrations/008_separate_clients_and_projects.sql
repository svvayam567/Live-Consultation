-- =========================================================================
-- MIGRATION 008: Separate Clients (Profiles) and Projects
-- 1. Creates public.projects table (one client can have multiple projects)
-- 2. Links public.consultations to public.projects (project_id)
-- 3. Enables Row Level Security (RLS) for projects
-- 4. Creates helper function for atomic client & project registration
-- =========================================================================

-- 1. CREATE PROJECTS TABLE
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references public.profiles(id) on delete cascade not null,
  project_name text not null,
  product_type text not null default 'Temple',
  location text default 'India',
  status text not null check (status in ('draft', 'in_progress', 'completed', 'on_hold')) default 'draft',
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Index for speedy lookup by client
create index if not exists idx_projects_client_id on public.projects(client_id);

-- 2. LINK CONSULTATIONS TO PROJECTS
alter table public.consultations
  add column if not exists project_id uuid references public.projects(id) on delete set null;

create index if not exists idx_consultations_project_id on public.consultations(project_id);

-- 3. ROW LEVEL SECURITY (RLS) ON PROJECTS
alter table public.projects enable row level security;

drop policy if exists "Admins have full access to projects" on public.projects;
create policy "Admins have full access to projects"
  on public.projects for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

drop policy if exists "Customers can view their own projects" on public.projects;
create policy "Customers can view their own projects"
  on public.projects for select
  using (
    client_id = auth.uid()
  );

-- 4. BACKFILL PROJECTS FROM EXISTING CONSULTATIONS
do $$
declare
  r record;
  new_proj_id uuid;
begin
  for r in 
    select c.id as consult_id, c.client_id, c.project_name, c.client_name, c.product, c.fields
    from public.consultations c
    where c.project_id is null and c.client_id is not null
  loop
    -- Insert project if not exists
    insert into public.projects (
      client_id,
      project_name,
      product_type,
      location,
      status
    )
    values (
      r.client_id,
      coalesce(r.project_name, (r.fields->>'projectName'), 'Sanctum Project'),
      coalesce(r.product, (r.fields->>'product'), 'Temple'),
      coalesce((r.fields->>'location'), 'India'),
      'in_progress'
    )
    returning id into new_proj_id;

    -- Link consultation to newly created project
    update public.consultations
    set project_id = new_proj_id
    where id = r.consult_id;
  end loop;
end $$;

-- 5. RPC FUNCTION: ATOMIC CLIENT & PROJECT CREATION / ATTACHMENT
create or replace function public.provision_client_and_project(
  p_phone text,
  p_name text,
  p_surname text,
  p_title text,
  p_product text,
  p_location text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  clean_phone text;
  v_client_id uuid;
  v_project_id uuid;
  v_project_name text;
  v_is_new_client boolean := false;
begin
  -- Format phone with digits
  clean_phone := right(regexp_replace(coalesce(p_phone, ''), '\D', '', 'g'), 10);
  if clean_phone = '' or length(clean_phone) < 10 then
    raise exception 'Invalid 10-digit mobile number';
  end if;
  clean_phone := '+91' || clean_phone;

  -- Generate canonical project name: "<Title> <Surname>'s <Product>"
  v_project_name := trim(p_title || ' ' || coalesce(p_surname, '') || '''s ' || coalesce(p_product, 'Temple'));

  -- Check if client already exists
  select id into v_client_id
  from public.profiles
  where right(regexp_replace(phone, '\D', '', 'g'), 10) = right(clean_phone, 10)
  limit 1;

  if v_client_id is null then
    -- Create new profile
    v_is_new_client := true;
    insert into public.profiles (
      id,
      name,
      phone,
      role,
      title,
      surname,
      product,
      project_name,
      is_active
    )
    values (
      gen_random_uuid(),
      trim(p_name),
      clean_phone,
      'customer',
      p_title,
      p_surname,
      p_product,
      v_project_name,
      true
    )
    returning id into v_client_id;
  end if;

  -- Create project for client
  insert into public.projects (
    client_id,
    project_name,
    product_type,
    location,
    status
  )
  values (
    v_client_id,
    v_project_name,
    p_product,
    coalesce(p_location, 'India'),
    'draft'
  )
  returning id into v_project_id;

  return jsonb_build_object(
    'client_id', v_client_id,
    'project_id', v_project_id,
    'project_name', v_project_name,
    'is_new_client', v_is_new_client,
    'phone', clean_phone
  );
end;
$$;

grant execute on function public.provision_client_and_project(text, text, text, text, text, text) to anon, authenticated, service_role;
