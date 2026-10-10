-- =====================================================================
-- Migration 012: Admin Deletion RLS & Cascading Foreign Keys for Consultations
-- Safe to run multiple times
-- =====================================================================

-- 1. Ensure public.is_admin() exists and safely checks profiles table
create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() 
      and role = 'admin' 
      and coalesce(is_active, true) = true
  );
$$;

-- 2. Drop existing restrictive delete policies on consultations
alter table public.consultations enable row level security;

drop policy if exists "Admins can delete draft consultations" on public.consultations;
drop policy if exists "Admins can delete consultations" on public.consultations;
drop policy if exists "Admins full access on consultations" on public.consultations;

-- 3. Create comprehensive admin DELETE policy on consultations (applies to ALL statuses)
create policy "Admins can delete consultations"
  on public.consultations for delete
  using (
    public.is_admin() 
    or exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- 4. Ensure admins have full access (select, insert, update, delete) for all consultations
create policy "Admins full access on consultations"
  on public.consultations for all
  using (
    public.is_admin() 
    or exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  )
  with check (
    public.is_admin() 
    or exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- 5. Ensure foreign keys on child tables have ON DELETE CASCADE so they do NOT block deletion
-- (And never delete the customer's auth account or profiles)
do $$
begin
  -- consultation_images
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'consultation_images') then
    alter table public.consultation_images drop constraint if exists consultation_images_consultation_id_fkey;
    alter table public.consultation_images add constraint consultation_images_consultation_id_fkey
      foreign key (consultation_id) references public.consultations(id) on delete cascade;
  end if;

  -- sheet_sync_log
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'sheet_sync_log') then
    alter table public.sheet_sync_log drop constraint if exists sheet_sync_log_consultation_id_fkey;
    alter table public.sheet_sync_log add constraint sheet_sync_log_consultation_id_fkey
      foreign key (consultation_id) references public.consultations(id) on delete cascade;
  end if;

  -- journey_stage_progress
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'journey_stage_progress') then
    alter table public.journey_stage_progress drop constraint if exists journey_stage_progress_consultation_id_fkey;
    alter table public.journey_stage_progress add constraint journey_stage_progress_consultation_id_fkey
      foreign key (consultation_id) references public.consultations(id) on delete cascade;
  end if;

  -- journey_updates
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'journey_updates') then
    alter table public.journey_updates drop constraint if exists journey_updates_consultation_id_fkey;
    alter table public.journey_updates add constraint journey_updates_consultation_id_fkey
      foreign key (consultation_id) references public.consultations(id) on delete cascade;
  end if;

  -- portal_messages
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'portal_messages') then
    alter table public.portal_messages drop constraint if exists portal_messages_consultation_id_fkey;
    alter table public.portal_messages add constraint portal_messages_consultation_id_fkey
      foreign key (consultation_id) references public.consultations(id) on delete cascade;
  end if;
end $$;

-- 6. Ensure admins have delete permissions on child tables if RLS is enabled on them
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'journey_stage_progress') then
    alter table public.journey_stage_progress enable row level security;
    drop policy if exists "Admins delete stage progress" on public.journey_stage_progress;
    create policy "Admins delete stage progress" on public.journey_stage_progress for delete using (public.is_admin());
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'journey_updates') then
    alter table public.journey_updates enable row level security;
    drop policy if exists "Admins delete journey updates" on public.journey_updates;
    create policy "Admins delete journey updates" on public.journey_updates for delete using (public.is_admin());
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'portal_messages') then
    alter table public.portal_messages enable row level security;
    drop policy if exists "Admins delete portal messages" on public.portal_messages;
    create policy "Admins delete portal messages" on public.portal_messages for delete using (public.is_admin());
  end if;

  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'consultation_images') then
    alter table public.consultation_images enable row level security;
    drop policy if exists "Admins delete consultation images" on public.consultation_images;
    create policy "Admins delete consultation images" on public.consultation_images for delete using (public.is_admin());
  end if;
end $$;

-- 7. Atomic RPC function for admins to delete a consultation and all its child records
create or replace function public.admin_delete_consultation(p_consultation_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_caller_role text;
  v_rows_deleted integer;
begin
  -- 1. Verify caller has admin role
  select role into v_caller_role
  from public.profiles
  where id = auth.uid();

  if v_caller_role is distinct from 'admin' then
    raise exception 'Permission denied: Only administrators can delete consultations.';
  end if;

  -- 2. Clean up child records belonging strictly to this consultation
  delete from public.journey_stage_progress where consultation_id = p_consultation_id;
  delete from public.journey_updates where consultation_id = p_consultation_id;
  delete from public.portal_messages where consultation_id = p_consultation_id;
  delete from public.consultation_images where consultation_id = p_consultation_id;
  delete from public.sheet_sync_log where consultation_id = p_consultation_id;

  -- 3. Delete consultation row
  delete from public.consultations where id = p_consultation_id;
  get diagnostics v_rows_deleted = row_count;

  return v_rows_deleted > 0;
end;
$$;

grant execute on function public.admin_delete_consultation(uuid) to authenticated;

