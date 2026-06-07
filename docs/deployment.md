# Deployment (Vercel + Neon)

The frontend deploys to **Vercel**. The database and form storage run on **Neon** (serverless Postgres). Neon is not used as a web host.

## 1. Neon database

1. Create a free project at [neon.tech](https://neon.tech) (no credit card).
2. Open the **SQL Editor** and run [`../db/migrations/0001_init.sql`](../db/migrations/0001_init.sql).
3. (Optional) run [`../db/seed.sql`](../db/seed.sql).
4. **Connection Details** -> copy the **pooled** connection string (ends with `?sslmode=require`). This is your `DATABASE_URL`.

## 2. Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel: **Add New Project** -> import the repo. Framework preset auto-detects **Next.js**.
3. Add one environment variable under **Project Settings -> Environment Variables**:
   - `DATABASE_URL` (the Neon pooled connection string; it is only read in server code and never exposed to the browser)
4. Deploy. Vercel gives you a preview URL such as `kings-of-strings.vercel.app`.

> Tip: you can also provision Neon directly from the Vercel dashboard (**Storage -> Create -> Neon**), which sets `DATABASE_URL` automatically.

## 3. Verify on the preview URL

Run the full checklist before any domain change:

- [ ] Home, About, Gallery, Tour, Contact all load
- [ ] All images load from `/media/original/...` (no Wix hotlinks)
- [ ] Spotify embeds and links work (Dead Man Walking + Memento)
- [ ] Apple Music / iHeart / social links work
- [ ] Gallery lightbox opens; arrow keys + Esc work
- [ ] Tour shows the empty state (or seeded published dates)
- [ ] Contact form submits and a row appears in `contact_messages`
- [ ] Subscribe form submits and a row appears in `subscribers`; duplicate email is handled
- [ ] Dark/light theme toggle works and persists
- [ ] Mobile layout looks correct
- [ ] Open Graph preview renders (paste the URL into a link preview tool)

## 4. Domain

Pointing `thekingsofstringsband.com` at this deployment is documented separately and is reference-only for now (the domain is not currently owned/managed by the site builder). See [domain-migration.md](domain-migration.md). The existing Wix site stays live until a verified cutover.
