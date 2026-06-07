-- The Kings of Strings: initial schema (plain Postgres, for Neon).
-- Run this once against your Neon database, for example with the Neon SQL editor
-- or:  psql "$DATABASE_URL" -f db/migrations/0001_init.sql
--
-- Access model: the website connects to this database ONLY from the server
-- (API routes + server components) using DATABASE_URL, which is never exposed to
-- the browser. The API routes are the only writers. Because there is no public
-- database connection, no row level security is required for the public site.
-- (Admin auth for the future /admin dashboard will be handled at the app layer.)

create extension if not exists pgcrypto; -- provides gen_random_uuid()

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists tour_dates (
  id uuid primary key default gen_random_uuid(),
  title text,
  venue text,
  city text,
  state text,
  date date not null,
  ticket_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists tour_dates_published_date_idx
  on tour_dates (is_published, date);

-- Optional content tables for the future admin dashboard (pass 2). The public
-- site currently renders music from lib/content.ts and images from the asset
-- manifest, so these are not required for the site to run.

create table if not exists music_releases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null default 'single',
  cover_path text,
  spotify_url text,
  apple_music_url text,
  other_links jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  title text,
  type text not null default 'image',
  source_url text,
  local_path text,
  page text,
  alt_text text,
  created_at timestamptz not null default now()
);

create table if not exists site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text,
  updated_at timestamptz not null default now()
);
