-- ============================================================
-- ASZ Company FZCO — Supabase Fix Script
-- Run this in: Supabase Dashboard → SQL Editor → New Query
--
-- This script is safe to run multiple times (idempotent).
-- It ensures all tables, policies, and storage are correctly
-- configured for the website and admin panel.
-- ============================================================


-- ============================================================
-- 1. ENABLE ROW LEVEL SECURITY ON ALL TABLES
--    (Safe to run even if already enabled)
-- ============================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 2. TABLE RLS POLICIES
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
-- 3. CREATE STORAGE BUCKET FOR IMAGE UPLOADS
--    This is the critical fix — without this bucket, image
--    uploads from the admin panel silently fail.
-- ============================================================

-- Delete any broken/ghost bucket entry first, then create fresh
DELETE FROM storage.buckets WHERE id = 'images';
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);


-- ============================================================
-- 4. STORAGE RLS POLICIES
--    Allow public read/upload/update/delete on the images bucket
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
--    that don't exist in Supabase Storage. Clear them so the
--    website shows the letter fallback instead of broken images.
-- ============================================================

UPDATE blog_posts
  SET featured_image = NULL
  WHERE featured_image IS NOT NULL
    AND featured_image NOT LIKE 'https://%';


-- ============================================================
-- DONE! After running this:
--
-- 1. Go to the admin panel and upload featured images for
--    blog posts — they will now save correctly.
--
-- 2. Product images stored in /public/images/products/ work
--    as-is (they're bundled with the website deployment).
--
-- 3. Enquiries from the contact form will now appear in
--    the admin panel under Enquiries.
-- ============================================================
