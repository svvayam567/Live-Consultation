-- =========================================================================
-- MIGRATION 014: Canonical Project Naming Architecture (<Title> <Surname>'s <Product>)
-- 1. Adds and ensures project_name, title, surname, product columns.
-- 2. Defines authoritative build_project_name() function with strict fallbacks.
-- 3. Creates automatic triggers on profiles and consultations to maintain project_name.
-- 4. Corrects specified historical client records (Rajasekhar, Chetan, Deepthi Kunchey).
-- 5. Backfills project_name for all existing client, consultation, and project rows.
-- 6. Safe to run more than once (Idempotent).
-- =========================================================================

-- 1. ENSURE COLUMNS EXIST ACROSS PROFILES, CONSULTATIONS, AND PROJECTS
alter table public.profiles
  add column if not exists title text default 'Mr.',
  add column if not exists surname text default '',
  add column if not exists product text default 'Temple',
  add column if not exists project_name text default null,
  add column if not exists location text default 'India';

alter table public.consultations
  add column if not exists project_name text default null,
  add column if not exists client_name text default null,
  add column if not exists title text default 'Mr.',
  add column if not exists surname text default '',
  add column if not exists product text default 'Temple';

alter table public.projects
  add column if not exists project_name text default null,
  add column if not exists product_type text default 'Temple',
  add column if not exists location text default 'India';

-- 2. SINGLE SOURCE OF TRUTH FUNCTION IN POSTGRESQL
create or replace function public.build_project_name(
  p_title text,
  p_surname text,
  p_product text,
  p_fallback_name text default null
)
returns text
language plpgsql
immutable
as $$
declare
  clean_title text;
  clean_surname text;
  clean_product text;
begin
  -- 1. Format Title: ensure ending full stop and trailing space
  clean_title := trim(coalesce(p_title, ''));
  if clean_title <> '' then
    if right(clean_title, 1) <> '.' then
      clean_title := clean_title || '.';
    end if;
    clean_title := clean_title || ' ';
  end if;

  -- 2. Format Surname: exact spelling preserved, extra spaces trimmed
  clean_surname := trim(coalesce(p_surname, ''));

  -- If surname is missing or blank, attempt extraction of family name from fallback name
  if clean_surname = '' and p_fallback_name is not null and trim(p_fallback_name) <> '' then
    clean_surname := trim(split_part(trim(regexp_replace(trim(p_fallback_name), '^(Mr\.|Mrs\.|Ms\.|Dr\.|Mr|Mrs|Ms|Dr)\s+', '', 'i')), ' ', -1));
  end if;

  -- Sensible fallback if surname is still missing
  if clean_surname = '' then
    clean_surname := 'Client';
  end if;

  -- 3. Format Product: exact product type, fallback to 'Temple'
  clean_product := trim(coalesce(p_product, ''));
  if clean_product = '' then
    clean_product := 'Temple';
  end if;

  -- 4. Result: <Title> <Surname>'s <Product>
  return clean_title || clean_surname || '''s ' || clean_product;
end;
$$;

grant execute on function public.build_project_name(text, text, text, text) to anon, authenticated, service_role;

-- 3. SPECIFIC CLIENT DATA CLEANUPS (AS REQUESTED)
-- A. Mr. Rajasekhar: remove "Anantapur" from name/surname, keep location as Anantapur
update public.profiles
set 
  name = regexp_replace(name, '\s*anantapur\s*', '', 'i'),
  surname = case when surname ilike '%anantapur%' then 'Rajasekhar' else surname end,
  location = 'Anantapur'
where name ilike '%rajasekhar%' or surname ilike '%rajasekhar%';

update public.consultations
set 
  client_name = regexp_replace(client_name, '\s*anantapur\s*', '', 'i'),
  surname = case when surname ilike '%anantapur%' then 'Rajasekhar' else surname end
where client_name ilike '%rajasekhar%' or surname ilike '%rajasekhar%';

-- B. Mr. Chetan: remove "Thane" from name/surname, keep location as Thane
update public.profiles
set 
  name = regexp_replace(name, '\s*thane\s*', '', 'i'),
  surname = case when surname ilike '%thane%' then 'Chetan' else surname end,
  location = 'Thane'
where name ilike '%chetan%' or surname ilike '%chetan%';

update public.consultations
set 
  client_name = regexp_replace(client_name, '\s*thane\s*', '', 'i'),
  surname = case when surname ilike '%thane%' then 'Chetan' else surname end
where client_name ilike '%chetan%' or surname ilike '%chetan%';

-- C. Ms. Deepthi Kunchey: location updated to Texas, USA
update public.profiles
set 
  location = 'Texas, USA',
  surname = case when coalesce(surname, '') = '' then 'Kunchey' else surname end,
  title = 'Ms.'
where name ilike '%deepthi%' or surname ilike '%kunchey%';

update public.consultations
set 
  surname = case when coalesce(surname, '') = '' then 'Kunchey' else surname end,
  title = 'Ms.',
  fields = jsonb_set(coalesce(fields, '{}'::jsonb), '{location}', '"Texas, USA"')
where client_name ilike '%deepthi%' or surname ilike '%kunchey%';

-- 4. DATABASE TRIGGERS FOR AUTOMATIC PROJECT_NAME SYNCHRONIZATION
-- A. Trigger function for public.profiles
create or replace function public.trg_sync_profile_project_name()
returns trigger
language plpgsql
as $$
begin
  if new.role in ('client', 'customer') then
    new.project_name := public.build_project_name(new.title, new.surname, new.product, new.name);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_profiles_project_name on public.profiles;
create trigger trg_profiles_project_name
  before insert or update of title, surname, product, name
  on public.profiles
  for each row
  execute function public.trg_sync_profile_project_name();

-- B. Trigger function for public.consultations
create or replace function public.trg_sync_consultation_project_name()
returns trigger
language plpgsql
as $$
begin
  -- Synchronize top-level project_name column
  new.project_name := public.build_project_name(new.title, new.surname, new.product, new.client_name);

  -- Keep JSON fields->>'projectName' and fields->>'project_name' in lockstep
  if new.fields is not null then
    new.fields := jsonb_set(
      jsonb_set(coalesce(new.fields, '{}'::jsonb), '{projectName}', to_jsonb(new.project_name)),
      '{project_name}', to_jsonb(new.project_name)
    );
  end if;

  return new;
end;
$$;

drop trigger if exists trg_consultations_project_name on public.consultations;
create trigger trg_consultations_project_name
  before insert or update of title, surname, product, client_name
  on public.consultations
  for each row
  execute function public.trg_sync_consultation_project_name();

-- 5. BACKFILL ALL EXISTING RECORDS
-- Backfill profiles
update public.profiles
set project_name = public.build_project_name(title, surname, product, name)
where role in ('client', 'customer');

-- Backfill consultations
update public.consultations
set project_name = public.build_project_name(title, surname, product, client_name);

-- Backfill linked projects table
update public.projects p
set project_name = c.project_name
from public.consultations c
where c.project_id = p.id and c.project_name is not null;
