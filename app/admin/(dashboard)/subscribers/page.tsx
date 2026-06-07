import { getSql } from "@/lib/db";

const label = "mb-1 block text-xs font-semibold uppercase tracking-wide text-muted";

type Row = { id: string; email: string; created_at: string };

async function getSubscribers(): Promise<Row[]> {
  const sql = getSql();
  if (!sql) return [];
  try {
    const rows = await sql`
      select id, email,
        to_char(created_at, 'YYYY-MM-DD HH24:MI') as created_at
      from subscribers
      order by created_at desc
      limit 2000
    `;
    return rows as Row[];
  } catch {
    return [];
  }
}

export default async function AdminSubscribersPage() {
  const rows = await getSubscribers();
  const emails = rows.map((r) => r.email).join(", ");

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
        Subscribers
      </h1>
      <p className="mt-2 text-muted">{rows.length} subscriber(s).</p>

      {rows.length === 0 ? (
        <p className="mt-6 text-muted">No subscribers yet.</p>
      ) : (
        <>
          <div className="mt-6 overflow-hidden rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-elevated text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-line">
                    <td className="px-4 py-2">{r.email}</td>
                    <td className="px-4 py-2 text-muted">{r.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <p className={label}>Copy all emails</p>
            <textarea
              readOnly
              value={emails}
              rows={3}
              className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-fg"
            />
          </div>
        </>
      )}
    </div>
  );
}
