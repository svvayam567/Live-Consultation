-- =========================================================================
-- MIGRATION 007: Grant Admin Access to 8074257384
-- =========================================================================

-- 1. Insert or update profile for +918074257384 with admin role
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
  'Svvayam Admin',
  '+918074257384',
  'admin',
  'Mr.',
  'Admin',
  'Sanctum',
  'Svvayam Central Sanctum',
  true
) on conflict (phone) do update set
  role = 'admin',
  is_active = true;

-- 2. Update any existing profile matching last 10 digits to admin
update public.profiles
set role = 'admin',
    is_active = true
where right(regexp_replace(phone, '\D', '', 'g'), 10) = '8074257384';
