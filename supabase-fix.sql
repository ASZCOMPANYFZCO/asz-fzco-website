-- ============================================================
-- ASZ Company FZCO — Supabase Fix Script
-- ============================================================
--
-- INSTRUCTIONS:
--
--   STEP 1: Create the storage bucket (do this FIRST)
--     1. In Supabase Dashboard, click "Storage" in the left sidebar
--     2. Click "New bucket"
--     3. Name:   images
--     4. Toggle "Public bucket" to ON
--     5. Click "Create bucket"
--
--   STEP 2: Run this SQL
--     1. Go to SQL Editor in the left sidebar
--     2. Click "New Query"
--     3. Paste everything below and click "Run"
--
--   STEP 3: Test it
--     1. Go to the admin panel → Blog → open any post
--     2. Upload a featured image and click Save
--     3. Go to the live website /news page — the image should appear
--
-- ============================================================


-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Products policies
DROP POLICY IF EXISTS "Allow public read of products" ON products;
CREATE POLICY "Allow public read of products" ON products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert of products" ON products;
CREATE POLICY "Allow public insert of products" ON products FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update of products" ON products;
CREATE POLICY "Allow public update of products" ON products FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow public delete of products" ON products;
CREATE POLICY "Allow public delete of products" ON products FOR DELETE USING (true);

-- Blog posts policies
DROP POLICY IF EXISTS "Allow public read of blog_posts" ON blog_posts;
CREATE POLICY "Allow public read of blog_posts" ON blog_posts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert of blog_posts" ON blog_posts;
CREATE POLICY "Allow public insert of blog_posts" ON blog_posts FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update of blog_posts" ON blog_posts;
CREATE POLICY "Allow public update of blog_posts" ON blog_posts FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow public delete of blog_posts" ON blog_posts;
CREATE POLICY "Allow public delete of blog_posts" ON blog_posts FOR DELETE USING (true);

-- Enquiries policies
DROP POLICY IF EXISTS "Allow public read of enquiries" ON enquiries;
CREATE POLICY "Allow public read of enquiries" ON enquiries FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert of enquiries" ON enquiries;
CREATE POLICY "Allow public insert of enquiries" ON enquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update of enquiries" ON enquiries;
CREATE POLICY "Allow public update of enquiries" ON enquiries FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow public delete of enquiries" ON enquiries;
CREATE POLICY "Allow public delete of enquiries" ON enquiries FOR DELETE USING (true);

-- Storage policies (for the "images" bucket created in Step 1)
DROP POLICY IF EXISTS "Allow public read of images" ON storage.objects;
CREATE POLICY "Allow public read of images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
DROP POLICY IF EXISTS "Allow public upload of images" ON storage.objects;
CREATE POLICY "Allow public upload of images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
DROP POLICY IF EXISTS "Allow public update of images" ON storage.objects;
CREATE POLICY "Allow public update of images" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
DROP POLICY IF EXISTS "Allow public delete of images" ON storage.objects;
CREATE POLICY "Allow public delete of images" ON storage.objects FOR DELETE USING (bucket_id = 'images');

-- Clean up fake image paths left over from seed data
UPDATE blog_posts SET featured_image = NULL WHERE featured_image IS NOT NULL AND featured_image NOT LIKE 'https://%';
