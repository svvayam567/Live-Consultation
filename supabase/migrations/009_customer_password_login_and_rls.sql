-- =========================================================================
-- MIGRATION 009: Customer Password Login & RLS Security
-- 1. Enforces role 'client' for customer portal accounts.
-- 2. Ensures consultations and projects are linked to client_id (auth user id).
-- 3. Enables Row Level Security (RLS) for client access to their own data.
-- =========================================================================

-- 1. Ensure profiles.role constraint allows 'client'
alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('admin', 'client', 'customer'));

-- 2. Helper function to check client or customer role
create or replace function public.is_client()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('customer', 'client') and is_active = true
  );
$$;

-- 3. Consultations Policy for Clients (by client_id or phone)
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

-- 4. Projects Policy for Clients
drop policy if exists "Customers can view their own projects" on public.projects;
create policy "Customers can view their own projects"
  on public.projects for select
  using (
    client_id = auth.uid()
  );

-- 5. Helper function to compute internal hidden email from phone
create or replace function public.phone_to_hidden_email(p_phone text)
returns text language sql immutable as $$
  select right(regexp_replace(coalesce(p_phone, ''), '\D', '', 'g'), 10) || '@svvayam.internal';
$$;

grant execute on function public.phone_to_hidden_email(text) to anon, authenticated, service_role;
