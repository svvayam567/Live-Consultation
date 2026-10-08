-- =========================================================================
-- MIGRATION 006: Auth Test Seed & Project Naming Format Enforcement
-- 1. Drops foreign key constraint on profiles.id to allow pre-registration.
-- 2. Adds project naming columns: project_name, title, surname, product.
-- 3. Pre-flight RPC check_phone_registration for anonymous login verification.
-- 4. Auth.users trigger to link pre-registered profiles on first login.
-- 5. Seeds demo accounts for Mala Sharma and Svvayam Staff.
-- =========================================================================

-- 1. PROFILES TABLE FLEXIBILITY & PROJECT NAMING
-- Drop foreign key to auth.users if present to allow admin pre-registration
alter table public.profiles 
  drop constraint if exists profiles_id_fkey;

-- Ensure default gen_random_uuid for profiles.id
alter table public.profiles
  alter column id set default gen_random_uuid();

-- Add Project Naming Columns to profiles
alter table public.profiles
  add column if not exists title text default 'Mr.',
  add column if not exists surname text default '',
  add column if not exists product text default 'Temple',
  add column if not exists project_name text default null;

-- Add Project Naming Columns to consultations
alter table public.consultations
  add column if not exists project_name text default null,
  add column if not exists client_name text default null,
  add column if not exists title text default 'Mr.',
  add column if not exists surname text default '',
  add column if not exists product text default 'Temple';

-- 2. PRE-FLIGHT RPC FOR SECURE PHONE REGISTRATION CHECK
-- Called by login page before dispatching SMS OTP to prevent rate limit spam
create or replace function public.check_phone_registration(
  phone_input text,
  check_role text default 'customer'
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  clean_input text;
  is_reg boolean;
begin
  -- Extract last 10 digits for resilient national / international matching
  clean_input := right(regexp_replace(coalesce(phone_input, ''), '\D', '', 'g'), 10);
  
  if clean_input = '' or length(clean_input) < 10 then
    return false;
  end if;

  if check_role = 'admin' then
    select exists (
      select 1 from public.profiles
      where right(regexp_replace(phone, '\D', '', 'g'), 10) = clean_input
        and role = 'admin'
        and is_active = true
    ) into is_reg;
  else
    select exists (
      select 1 from public.profiles
      where right(regexp_replace(phone, '\D', '', 'g'), 10) = clean_input
        and role in ('customer', 'client')
        and is_active = true
    ) into is_reg;
  end if;

  return coalesce(is_reg, false);
end;
$$;

-- Grant execution to anon and authenticated callers
grant execute on function public.check_phone_registration(text, text) to anon, authenticated, service_role;

-- 3. TRIGGER TO AUTOMATICALLY LINK PRE-REGISTERED PROFILES ON LOGIN
create or replace function public.handle_new_phone_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  clean_user_phone text;
  matched_profile_id uuid;
begin
  if new.phone is null or new.phone = '' then
    return new;
  end if;

  clean_user_phone := right(regexp_replace(new.phone, '\D', '', 'g'), 10);

  -- Check if a pre-registered profile exists with matching phone
  select id into matched_profile_id
  from public.profiles
  where right(regexp_replace(phone, '\D', '', 'g'), 10) = clean_user_phone
  limit 1;

  if matched_profile_id is not null then
    if matched_profile_id <> new.id then
      -- Update existing profile id to match auth.users id
      -- First cascade to consultations if referenced
      update public.consultations 
        set client_id = new.id 
        where client_id = matched_profile_id;

      update public.consultations
        set created_by = new.id
        where created_by = matched_profile_id;

      update public.portal_messages
        set sender_id = new.id
        where sender_id = matched_profile_id;

      update public.profiles
        set id = new.id,
            phone = new.phone
        where id = matched_profile_id;
    end if;
  else
    -- Profile doesn't exist yet; create fallback customer profile
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
    ) values (
      new.id,
      coalesce(new.raw_user_meta_data->>'name', 'Valued Client'),
      new.phone,
      coalesce(new.raw_user_meta_data->>'role', 'customer'),
      'Mr.',
      '',
      'Temple',
      'Client Temple',
      true
    ) on conflict (phone) do update set
      id = new.id;
  end if;

  return new;
end;
$$;

-- Drop and recreate auth.users trigger
drop trigger if exists on_auth_user_created_phone_link on auth.users;
create trigger on_auth_user_created_phone_link
  after insert on auth.users
  for each row execute procedure public.handle_new_phone_user();

-- 4. SEED DEMO NUMBERS & OFFICIAL PROJECT NAMES
-- Demo Customer: +91 9845012345 (Mala Sharma) -> "Mrs. Sharma's Temple"
-- Demo Admin: +91 9182424228 (Svvayam Staff)

-- Seed Customer Profile
insert into public.profiles (
  name,
  phone,
  role,
  title,
  surname,
  product,
  project_name,
  is_active
) values (
  'Mala Sharma',
  '+919845012345',
  'customer',
  'Mrs.',
  'Sharma',
  'Temple',
  'Mrs. Sharma''s Temple',
  true
) on conflict (phone) do update set
  name = 'Mala Sharma',
  role = 'customer',
  title = 'Mrs.',
  surname = 'Sharma',
  product = 'Temple',
  project_name = 'Mrs. Sharma''s Temple',
  is_active = true;

-- Seed Admin Profile
insert into public.profiles (
  name,
  phone,
  role,
  title,
  surname,
  product,
  project_name,
  is_active
) values (
  'Svvayam Staff',
  '+919182424228',
  'admin',
  'Mr.',
  'Staff',
  'Sanctum',
  'Svvayam Central Sanctum',
  true
) on conflict (phone) do update set
  name = 'Svvayam Staff',
  role = 'admin',
  title = 'Mr.',
  surname = 'Staff',
  product = 'Sanctum',
  project_name = 'Svvayam Central Sanctum',
  is_active = true;

-- Seed Demo Consultation for Mala Sharma
insert into public.consultations (
  project_name,
  client_name,
  client_phone,
  title,
  surname,
  product,
  current_step,
  status,
  portal_visible,
  fields
) values (
  'Mrs. Sharma''s Temple',
  'Mala Sharma',
  '+919845012345',
  'Mrs.',
  'Sharma',
  'Temple',
  4,
  'draft',
  true,
  '{
    "client": "Mala Sharma",
    "title": "Mrs.",
    "surname": "Sharma",
    "product": "Temple",
    "projectName": "Mrs. Sharma''s Temple",
    "project_name": "Mrs. Sharma''s Temple",
    "location": "Indiranagar, Bengaluru",
    "date": "2026-10-08",
    "deity": "Lord Venkateshwara, Devi Lakshmi & Lord Ganesha",
    "idol": "Central Venkateshwara 24\" brass; flanking deities 12\" each",
    "rituals": "Daily morning abhishekam, archana, and evening aarti",
    "dimensions": "8 ft (W) x 6 ft (D) x 9 ft (H)",
    "dimensionType": "Dedicated sanctum room (ground floor, North-East corner)",
    "features": "Shikhara dome, stepped sanctum peetham, integrated oil-wick brass vents, brass jali double doors",
    "scope": "Comprehensive teakwood mandir with hand-carved pillars and brass repousse work",
    "materials": "Grade A Burma Teakwood, Makrana White Marble platform, 24k gold leaf accents",
    "estimate": "18 lakh"
  }'::jsonb
) on conflict do nothing;
