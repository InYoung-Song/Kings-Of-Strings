// Quick database connectivity + schema check.
// Run with:  npm run db:check   (loads .env.local for DATABASE_URL)
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local.");
  process.exit(1);
}

const sql = neon(url);

// Explicit templated count per table (the serverless driver cannot interpolate
// identifiers, so table names are not dynamic).
const tableQueries = [
  ["contact_messages", () => sql`select count(*)::int as count from contact_messages`],
  ["subscribers", () => sql`select count(*)::int as count from subscribers`],
  ["tour_dates", () => sql`select count(*)::int as count from tour_dates`],
  ["merch", () => sql`select count(*)::int as count from merch`],
  ["music_releases", () => sql`select count(*)::int as count from music_releases`],
  ["media_assets", () => sql`select count(*)::int as count from media_assets`],
  ["site_content", () => sql`select count(*)::int as count from site_content`],
];

try {
  const [{ now }] = await sql`select now()`;
  console.log("Connected to Neon. Server time:", now);

  let missing = 0;
  for (const [name, run] of tableQueries) {
    try {
      const rows = await run();
      console.log(`  ${name.padEnd(16)} ${rows[0].count} rows`);
    } catch (e) {
      missing++;
      console.log(`  ${name.padEnd(16)} MISSING (${e.message})`);
    }
  }

  if (missing > 0) {
    console.log(
      `\n${missing} table(s) missing. Run db/migrations/0001_init.sql in the Neon SQL editor.`
    );
    process.exit(1);
  }
  console.log("\nDatabase is wired up correctly.");
} catch (e) {
  console.error("Connection failed:", e.message);
  process.exit(1);
}
