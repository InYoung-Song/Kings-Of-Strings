# The Kings of Strings

Modern website for The Kings of Strings, a rock and roll band from Detroit, Michigan. Rebuilt from the original Wix site on Next.js with all original content, images, music links, and branding preserved.

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** with dark/light themes (`next-themes`)
- **Neon** (serverless Postgres) for contact messages, subscribers, and tour dates
- **next/image** for optimized, lazy-loaded images
- Deploy target: **Vercel**

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Neon connection string
npm run dev                  # http://localhost:3000
```

The site renders fully without a database configured (the Tour page shows its empty state and the forms report that they are not configured). To enable the forms and tour management, set the environment variable below and run the database migration.

## Environment variables

| Variable | Exposure | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | server only | Neon Postgres connection string. Used by the API routes and the Tour page. Never exposed to the browser. |

Find this in the Neon console under **Connection Details** (use the pooled connection string, ending in `?sslmode=require`). In Vercel, add it under **Project Settings -> Environment Variables**.

## Database setup

1. Create a free project at [neon.tech](https://neon.tech) and open its **SQL Editor**.
2. Run [`db/migrations/0001_init.sql`](db/migrations/0001_init.sql) to create the tables.
3. (Optional) Run [`db/seed.sql`](db/seed.sql) to pre-populate the two real music releases. No tour dates are seeded.

Access model:

- The website connects to Neon only from the server (the API routes and the Tour page) using `DATABASE_URL`, which is never exposed to the browser.
- The API routes are the only writers, so there is no public database connection and no row level security is needed for the public site.
- Admin authentication for the future `/admin` dashboard (pass 2) is handled at the app layer. See [docs/admin-setup.md](docs/admin-setup.md).

## Asset migration

All original images were downloaded from the live Wix CDN into [`public/media/original/`](public/media/original/) so the site never hotlinks Wix. The manifest is [`data/original-assets.json`](data/original-assets.json) (source URL, local path, page, alt text, dimensions, type).

To re-run or update the migration:

```bash
npm run migrate:assets          # downloads missing files, refreshes the manifest
npm run migrate:assets -- --force   # re-download everything
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint |
| `npm run migrate:assets` | Download original media + rebuild the asset manifest |

## Project structure

```
app/            Routes (home, about, gallery, tour, contact) + API routes + layout
components/     UI, layout, home, about, gallery, tour, forms, sections
lib/            content.ts (verbatim copy), site.ts (links/nav), db.ts (Neon), assets, utils
data/           original-assets.json (migration manifest)
public/media/   Downloaded original images (backup + served)
scripts/        migrate-assets.mjs
db/             SQL migration + seed (Neon Postgres)
docs/           deployment, domain migration, admin setup
```

## Content integrity

All band copy lives in [`lib/content.ts`](lib/content.ts) and is preserved verbatim from the original site. Links live in [`lib/site.ts`](lib/site.ts). Do not paraphrase, summarize, or invent band history or tour dates.

## Deployment

See [docs/deployment.md](docs/deployment.md). The domain cutover (reference-only for now) is in [docs/domain-migration.md](docs/domain-migration.md).
