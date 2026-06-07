# Admin Dashboard

The site has a password-protected admin dashboard at **`/admin`** for managing
content without touching code.

## What you can do there

- **Overview:** counts of tour dates, merch, messages, and subscribers.
- **Tour:** add / publish / unpublish / delete shows. Only published shows appear
  on the public Tour page (which refreshes within about a minute).
- **Merch:** add / publish / unpublish / delete products. Until you add one, the
  public Merch page shows a "coming soon" message.
- **Messages:** read contact / booking form submissions.
- **Subscribers:** view the newsletter list and copy all emails.

## Setup

Two environment variables enable the admin area (in `.env.local` for local dev,
and in Vercel -> Settings -> Environment Variables for production):

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | The password you type at `/admin/login`. Choose a strong one. |
| `AUTH_SECRET` | Signs the admin session cookie. Use a long random string. |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

You also need the `merch` table. Run [`../db/migrations/0002_merch.sql`](../db/migrations/0002_merch.sql)
in the Neon SQL editor (after `0001_init.sql`).

## How to log in

1. Go to `/admin` (or `/admin/login`).
2. Enter `ADMIN_PASSWORD`.
3. You stay signed in for 7 days (an httpOnly, signed cookie). Use **Log out** to
   end the session.

## Security model

- Middleware blocks every `/admin` route except the login page unless a valid
  signed session cookie is present, and each admin page and write action checks
  the session again on the server.
- The session cookie is httpOnly and HMAC-signed with `AUTH_SECRET`; it cannot be
  read by JavaScript or forged without the secret.
- The database is only reached from the server, and writes go through server
  actions that re-verify the session. Visitors never get database access.

To rotate access later: change `ADMIN_PASSWORD` (forces re-login on next attempt)
or change `AUTH_SECRET` (immediately invalidates all existing sessions).
