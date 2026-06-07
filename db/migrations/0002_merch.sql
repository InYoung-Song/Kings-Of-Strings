-- Adds the merch table. Run this after 0001_init.sql.
-- The Merch page shows a "coming soon" state until rows are added (from the
-- admin dashboard). No products are invented or seeded.

create extension if not exists pgcrypto;

create table if not exists merch (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price text,
  image_path text,
  buy_url text,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists merch_published_sort_idx
  on merch (is_published, sort_order);
