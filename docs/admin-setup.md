# Admin Setup (pass 2 preview)

The public site (pass 1) is complete and requires no login. The admin dashboard
at `/admin` is **planned for pass 2**. The database tables it will use already
exist in [`../db/migrations/0001_init.sql`](../db/migrations/0001_init.sql)
(`tour_dates`, `music_releases`, `media_assets`, `site_content`, plus
`contact_messages` and `subscribers` to review submissions).

## How access control works now

The site uses **Neon** (serverless Postgres). The database is reached only from
the server using `DATABASE_URL`, which is never exposed to the browser, and the
API routes are the only writers. So there is no public database access to lock
down, and no row level security is needed for the public site.

Because Neon does not include an auth product (unlike Supabase), admin login for
pass 2 will be handled at the **application layer**. Planned approach:

- A protected `/admin` route group guarded by middleware.
- Auth via one of: a single shared password stored as an env var (simplest),
  or an auth library such as Auth.js (NextAuth) with email magic links if
  per-user accounts and roles are wanted.
- Admin reads/writes go through server actions or API routes that already hold
  the `DATABASE_URL` connection, so credentials never reach the browser.

No admin credentials exist yet; they will be introduced with the pass 2 build.

## Planned dashboard (pass 2)

Protected `/admin` routes with login, logout, and clear loading/error/success
states:

- Dashboard overview
- Contact messages (read-only list)
- Newsletter subscribers (list / export)
- Tour date manager (add / edit / delete / publish / unpublish)
- Gallery / media manager
- Music / release manager
- Site content manager

Visitors never need an account. They can view the site, submit the contact form,
subscribe, and view tour dates and the gallery.
