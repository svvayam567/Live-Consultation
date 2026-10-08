-- =========================================================================
-- MIGRATION 003: Single Selected Reference Architecture
-- Converts multi-selection (3 references) to exactly 1 reference
-- Enforces server-side database constraint & trigger
-- Preserves existing data for backward compatibility
-- =========================================================================

-- 1. Add selected_reference column (jsonb object) if it does not exist
alter table public.consultations 
  add column if not exists selected_reference jsonb default null;

-- 2. Data Migration: Populate selected_reference with the first pick from old selected_refs
--    Keeps the first item so no old consultations break, and does NOT delete old selected_refs data.
update public.consultations
set selected_reference = case
  when jsonb_typeof(selected_refs) = 'array' and jsonb_array_length(selected_refs) > 0 then selected_refs->0
  when jsonb_typeof(selected_refs) = 'object' then selected_refs
  else null
end
where selected_reference is null 
  and selected_refs is not null 
  and selected_refs != '[]'::jsonb;

-- 3. Database Check Constraint: Enforce that selected_reference is an object (single ref) or null
alter table public.consultations
  drop constraint if exists check_single_selected_reference;

alter table public.consultations
  add constraint check_single_selected_reference
  check (
    selected_reference is null 
    or jsonb_typeof(selected_reference) = 'object'
  );

-- 4. Check Constraint on legacy selected_refs: cannot hold more than 1 item
alter table public.consultations
  drop constraint if exists check_selected_refs_max_one;

alter table public.consultations
  add constraint check_selected_refs_max_one
  check (
    selected_refs is null
    or (jsonb_typeof(selected_refs) = 'array' and jsonb_array_length(selected_refs) <= 1)
    or jsonb_typeof(selected_refs) = 'object'
  );

-- 5. Trigger to strictly reject any direct API call attempting to save more than one reference
create or replace function public.enforce_single_selected_reference()
returns trigger as $$
begin
  -- Validate selected_reference column: must NOT be an array with > 1 items
  if new.selected_reference is not null then
    if jsonb_typeof(new.selected_reference) = 'array' and jsonb_array_length(new.selected_reference) > 1 then
      raise exception 'Database constraint violation: Cannot save more than 1 selected reference. Provided % items.', jsonb_array_length(new.selected_reference);
    end if;
  end if;

  -- Validate legacy selected_refs column: cannot contain > 1 items
  if new.selected_refs is not null and jsonb_typeof(new.selected_refs) = 'array' then
    if jsonb_array_length(new.selected_refs) > 1 then
      raise exception 'Database constraint violation: Cannot save more than 1 reference in selected_refs. Provided % items.', jsonb_array_length(new.selected_refs);
    end if;
  end if;

  -- Synchronize selected_reference and selected_refs[0] if one is provided
  if new.selected_reference is not null and (new.selected_refs is null or new.selected_refs = '[]'::jsonb) then
    new.selected_refs := jsonb_build_array(new.selected_reference);
  elsif (new.selected_reference is null) and (new.selected_refs is not null and jsonb_typeof(new.selected_refs) = 'array' and jsonb_array_length(new.selected_refs) = 1) then
    new.selected_reference := new.selected_refs->0;
  end if;

  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_enforce_single_selected_reference on public.consultations;
create trigger trg_enforce_single_selected_reference
  before insert or update on public.consultations
  for each row
  execute function public.enforce_single_selected_reference();
