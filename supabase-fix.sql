-- ============================================================
-- ASZ Company FZCO — Supabase Fix Script
-- Run this in: Supabase Dashboard → SQL Editor → New Query
--
-- This script is safe to run multiple times (idempotent).
-- It ensures all tables, policies, and storage are correctly
-- configured for the website and admin panel.
-- ============================================================
--
-- INSTRUCTIONS (2 steps):
--
-- STEP 1: Run this SQL script (paste it here and click Run)
--
-- STEP 2: Create the storage bucket via the Dashboard UI:
--   1. Go to Storage in the left sidebar
--   2. Click "New bucket"
--   3. Name: images
--   4. Toggle ON "Public bucket"
--   5. Click "Create bucket"
--
-- After both steps, go to the admin panel, upload a featured
-- image on any blog post, click Save, and it will work.
-- ============================================================


-- ============================================================
-- 1. CLEAN UP GHOST BUCKET ROW
--    A previous SQL INSERT created a row in storage.buckets
--    that the Storage API doesn't recognise. Remove it so
--    the Dashboard UI can create the bucket properly.
-- ============================================================

DELETE FROM storage.objects WHERE bucket_id = 'images';
DELETE FROM storage.buckets WHERE id = 'images';


-- ============================================================
-- 2. ENABLE ROW LEVEL SECURITY ON ALL TABLES
--    (Safe to run even if already enabled)
-- ============================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 3. TABLE RLS POLICIES
--    Drop-then-create pattern avoids "already exists" errors
-- ============================================================

-- Products
DROP POLICY IF EXISTS "Allow public read of products" ON products;
CREATE POLICY "Allow public read of products" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert of products" ON products;
CREATE POLICY "Allow public insert of products" ON products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update of products" ON products;
CREATE POLICY "Allow public update of products" ON products FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete of products" ON products;
CREATE POLICY "Allow public delete of products" ON products FOR DELETE USING (true);

-- Blog posts
DROP POLICY IF EXISTS "Allow public read of blog_posts" ON blog_posts;
CREATE POLICY "Allow public read of blog_posts" ON blog_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert of blog_posts" ON blog_posts;
CREATE POLICY "Allow public insert of blog_posts" ON blog_posts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update of blog_posts" ON blog_posts;
CREATE POLICY "Allow public update of blog_posts" ON blog_posts FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete of blog_posts" ON blog_posts;
CREATE POLICY "Allow public delete of blog_posts" ON blog_posts FOR DELETE USING (true);

-- Enquiries
DROP POLICY IF EXISTS "Allow public read of enquiries" ON enquiries;
CREATE POLICY "Allow public read of enquiries" ON enquiries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert of enquiries" ON enquiries;
CREATE POLICY "Allow public insert of enquiries" ON enquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update of enquiries" ON enquiries;
CREATE POLICY "Allow public update of enquiries" ON enquiries FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete of enquiries" ON enquiries;
CREATE POLICY "Allow public delete of enquiries" ON enquiries FOR DELETE USING (true);


-- ============================================================
-- 4. STORAGE RLS POLICIES
--    Allow public read/upload/update/delete on the images bucket.
--    (The bucket itself must be created via the Dashboard UI —
--    see Step 2 in the instructions at the top of this file.)
-- ============================================================

DROP POLICY IF EXISTS "Allow public read of images" ON storage.objects;
CREATE POLICY "Allow public read of images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Allow public upload of images" ON storage.objects;
CREATE POLICY "Allow public upload of images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'images');

DROP POLICY IF EXISTS "Allow public update of images" ON storage.objects;
CREATE POLICY "Allow public update of images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Allow public delete of images" ON storage.objects;
CREATE POLICY "Allow public delete of images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'images');


-- ============================================================
-- 5. CLEAN UP INVALID IMAGE PATHS IN EXISTING DATA
--    The seed data had fake local paths like /images/blog/...
--    that don't exist in storage. Clear them so the website
--    shows a clean fallback instead of a broken image.
-- ============================================================

UPDATE blog_posts
  SET featured_image = NULL
  WHERE featured_image IS NOT NULL
    AND featured_image NOT LIKE 'https://%';


-- ============================================================
-- ✅ SQL complete! Now do Step 2:
--
--   Go to Storage (left sidebar) → New bucket → Name: images
--   → Toggle ON "Public bucket" → Create bucket
--
-- Then in the admin panel, upload featured images on blog
-- posts, click Save, and they will display on the live site.
-- ============================================================
