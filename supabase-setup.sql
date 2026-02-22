-- ============================================================
-- ASZ Company FZCO — Supabase Database Setup
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Drop existing tables (if they exist from the basic schema)
DROP TABLE IF EXISTS enquiries CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- ============================================================
-- PRODUCTS TABLE
-- ============================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'ferro_alloy',
  short_description TEXT NOT NULL DEFAULT '',
  image TEXT,
  images TEXT[],
  specifications JSONB NOT NULL DEFAULT '{}',
  mmta_specs JSONB,
  grades JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- BLOG POSTS TABLE
-- ============================================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  featured_image TEXT,
  author TEXT NOT NULL DEFAULT 'ASZ Company FZCO',
  status TEXT NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ENQUIRIES TABLE
-- ============================================================
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  country TEXT,
  products TEXT[],
  quantity TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Allow public read, authenticated write
-- ============================================================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read active products, anon can also insert/update/delete (admin panel has no auth yet)
CREATE POLICY "Allow public read of products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert of products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update of products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete of products" ON products FOR DELETE USING (true);

-- Blog posts: anyone can read published posts, anon can also manage
CREATE POLICY "Allow public read of blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public insert of blog_posts" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update of blog_posts" ON blog_posts FOR UPDATE USING (true);
CREATE POLICY "Allow public delete of blog_posts" ON blog_posts FOR DELETE USING (true);

-- Enquiries: anyone can insert (contact form), anon can read/update (admin panel)
CREATE POLICY "Allow public read of enquiries" ON enquiries FOR SELECT USING (true);
CREATE POLICY "Allow public insert of enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update of enquiries" ON enquiries FOR UPDATE USING (true);
CREATE POLICY "Allow public delete of enquiries" ON enquiries FOR DELETE USING (true);

-- ============================================================
-- STORAGE BUCKET FOR IMAGES
-- ============================================================

-- Create the public images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to read images (public bucket)
DROP POLICY IF EXISTS "Allow public read of images" ON storage.objects;
CREATE POLICY "Allow public read of images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow anyone to upload images
DROP POLICY IF EXISTS "Allow public upload of images" ON storage.objects;
CREATE POLICY "Allow public upload of images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images');

-- Allow anyone to update images
DROP POLICY IF EXISTS "Allow public update of images" ON storage.objects;
CREATE POLICY "Allow public update of images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images');

-- Allow anyone to delete images
DROP POLICY IF EXISTS "Allow public delete of images" ON storage.objects;
CREATE POLICY "Allow public delete of images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images');
