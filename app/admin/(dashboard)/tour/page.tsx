import { getSql } from "@/lib/db";
import {
  addTourDate,
  deleteTourDate,
  toggleTourPublished,
} from "@/lib/admin-actions";
import { Button } from "@/components/ui/Button";

type Row = {
  id: string;
  title: string | null;
  venue: string | null;
  city: string | null;
  state: string | null;
  date: string;
  ticket_url: string | null;
  is_published: boolean;
};

const field =
  "w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-fg focus-visible:border-brand";
const label = "mb-1 block text-xs font-semibold uppercase tracking-wide text-muted";

async function getAll(): Promise<Row[]> {
  const sql = getSql();
  if (!sql) return [];
  try {
    const rows = await sql`
      select id, title, venue, city, state,
        to_char(date, 'YYYY-MM-DD') as date, ticket_url, is_published
      from tour_dates
      order by date asc
    `;
    return rows as Row[];
  } catch {
    return [];
  }
}

export default async function AdminTourPage() {
  const rows = await getAll();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
          Tour Dates
        </h1>
        <p className="mt-2 text-muted">
          Add shows here. Only published shows appear on the public Tour page.
        </p>
      </div>

      {/* Add form */}
      <form
        action={addTourDate}
        className="rounded-2xl border border-line bg-surface p-6"
      >
        <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-tight">
          Add a show
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={label} htmlFor="t-date">
              Date (required)
            </label>
            <input id="t-date" className={field} type="date" name="date" required />
          </div>
          <div>
            <label className={label} htmlFor="t-title">
              Title
            </label>
            <input id="t-title" className={field} name="title" placeholder="Show name" />
          </div>
          <div>
            <label className={label} htmlFor="t-venue">
              Venue
            </label>
            <input id="t-venue" className={field} name="venue" placeholder="Venue" />
          </div>
          <div>
            <label className={label} htmlFor="t-city">
              City
            </label>
            <input id="t-city" className={field} name="city" placeholder="City" />
          </div>
          <div>
            <label className={label} htmlFor="t-state">
              State
            </label>
            <input id="t-state" className={field} name="state" placeholder="MI" />
          </div>
          <div>
            <label className={label} htmlFor="t-ticket">
              Ticket URL
            </label>
            <input id="t-ticket" className={field} name="ticket_url" placeholder="https://" />
          </div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_published" defaultChecked />
          Publish immediately
        </label>
        <div className="mt-5">
          <Button type="submit">Add show</Button>
        </div>
      </form>

      {/* List */}
      {rows.length === 0 ? (
        <p className="text-muted">No tour dates yet.</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <li
              key={r.id}
              className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">
                  {r.date}
                  {r.title ? ` - ${r.title}` : ""}
                  {!r.is_published ? (
                    <span className="ml-2 rounded-full bg-elevated px-2 py-0.5 text-xs text-muted">
                      Draft
                    </span>
                  ) : null}
                </p>
                <p className="text-sm text-muted">
                  {[r.venue, r.city, r.state].filter(Boolean).join(", ")}
                </p>
              </div>
              <div className="flex gap-2">
                <form action={toggleTourPublished}>
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold hover:border-brand hover:text-brand"
                  >
                    {r.is_published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deleteTourDate}>
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-red-500 hover:border-red-500"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
