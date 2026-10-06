-- =========================================================================
-- SVVAYAM LIVE CONSULTATION - STORAGE BUCKETS SETUP
-- =========================================================================

-- Insert storage buckets
insert into storage.buckets (id, name, public)
values 
  ('reference-grid', 'reference-grid', true),
  ('journey', 'journey', true),
  ('client-projects', 'client-projects', true),
  ('consultation-uploads', 'consultation-uploads', false)
on conflict (id) do nothing;

-- 1. Reference Grid bucket policies
create policy "Reference grid public read"
  on storage.objects for select
  using (bucket_id = 'reference-grid');

create policy "Admins manage reference grid objects"
  on storage.objects for all
  using (bucket_id = 'reference-grid' and public.is_admin());

-- 2. Journey bucket policies
create policy "Journey public read"
  on storage.objects for select
  using (bucket_id = 'journey');

create policy "Admins manage journey objects"
  on storage.objects for all
  using (bucket_id = 'journey' and public.is_admin());

-- 3. Client Projects bucket policies
create policy "Client projects public read"
  on storage.objects for select
  using (bucket_id = 'client-projects');

create policy "Admins manage client projects objects"
  on storage.objects for all
  using (bucket_id = 'client-projects' and public.is_admin());

-- 4. Consultation Uploads bucket policies
create policy "Admins manage consultation uploads"
  on storage.objects for all
  using (bucket_id = 'consultation-uploads' and public.is_admin());

create policy "Clients read own consultation uploads"
  on storage.objects for select
  using (
    bucket_id = 'consultation-uploads' and
    auth.role() = 'authenticated'
  );
