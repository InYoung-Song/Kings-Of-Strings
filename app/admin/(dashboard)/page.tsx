import Link from "next/link";
import { getSql } from "@/lib/db";

type Counts = {
  tour: number;
  merch: number;
  messages: number;
  subscribers: number;
};

async function getCounts(): Promise<Counts | null> {
  const sql = getSql();
  if (!sql) return null;
  try {
    const [tour] = await sql`select count(*)::int as c from tour_dates`;
    const [merch] = await sql`select count(*)::int as c from merch`;
    const [messages] = await sql`select count(*)::int as c from contact_messages`;
    const [subs] = await sql`select count(*)::int as c from subscribers`;
    return {
      tour: tour.c,
      merch: merch.c,
      messages: messages.c,
      subscribers: subs.c,
    };
  } catch {
    return null;
  }
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const cards = [
    { href: "/admin/tour", label: "Tour dates", value: counts?.tour },
    { href: "/admin/merch", label: "Merch items", value: counts?.merch },
    { href: "/admin/messages", label: "Messages", value: counts?.messages },
    {
      href: "/admin/subscribers",
      label: "Subscribers",
      value: counts?.subscribers,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
        Dashboard
      </h1>
      <p className="mt-2 text-muted">Manage your site content and submissions.</p>

      {counts === null ? (
        <p className="mt-6 rounded-xl border border-line bg-surface p-4 text-sm text-muted">
          The database is not reachable. Make sure `DATABASE_URL` is set and the
          migrations have been run.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">
                {c.label}
              </p>
              <p className="mt-2 font-display text-4xl font-bold">{c.value}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
