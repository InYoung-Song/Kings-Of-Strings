// Neon serverless Postgres client.
//
// Only ever used on the server (API routes + server components). The connection
// string is never exposed to the browser. Returns null when DATABASE_URL is not
// set so the site still renders (Tour falls back to its empty state, and the
// forms return a clear "not configured" error) instead of crashing.
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;

let cached: NeonQueryFunction<false, false> | null = null;

export function isDbConfigured(): boolean {
  return Boolean(url);
}

export function getSql(): NeonQueryFunction<false, false> | null {
  if (!url) return null;
  if (!cached) cached = neon(url);
  return cached;
}
