-- ============================================================
-- The Falcon Cafe & Lounge — Supabase Schema
-- ============================================================
-- Run this SQL in the Supabase SQL Editor to create all tables.
-- ============================================================

-- 1. Announcements (Bento Grid tiles on the homepage)
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  badge TEXT,                -- e.g. 'LIVE MATCH', 'NEW', 'SOLD OUT'
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  grid_size TEXT DEFAULT 'normal',  -- 'normal' | 'wide' | 'tall'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Featured Dishes (Signature Three section)
CREATE TABLE IF NOT EXISTS featured_dishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  image_url TEXT,
  category TEXT,             -- e.g. 'Appetizer', 'Main Course'
  is_featured BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Google Reviews (manually populated)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  text TEXT,
  relative_time TEXT,        -- e.g. '2 weeks ago'
  profile_photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Site Settings (global toggles and config)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Default settings
INSERT INTO site_settings (key, value) VALUES
  ('live_match', '{"enabled": false, "label": "LIVE MATCH"}'::jsonb),
  ('announcement_bar', '{"enabled": false, "text": ""}'::jsonb),
  ('operating_hours', '{"open": "8:30 AM", "close": "11:00 PM", "happy_hour_start": "4:00 PM", "happy_hour_end": "7:00 PM"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can view active content)
CREATE POLICY "Public read announcements" ON announcements
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read featured_dishes" ON featured_dishes
  FOR SELECT USING (is_featured = true);

CREATE POLICY "Public read reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Public read site_settings" ON site_settings
  FOR SELECT USING (true);

-- Authenticated write policies (admin only)
CREATE POLICY "Admin full access announcements" ON announcements
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access featured_dishes" ON featured_dishes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access reviews" ON reviews
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access site_settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');
