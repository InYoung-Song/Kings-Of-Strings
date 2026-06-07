import { getSql } from "@/lib/db";

type Row = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

async function getMessages(): Promise<Row[]> {
  const sql = getSql();
  if (!sql) return [];
  try {
    const rows = await sql`
      select id, name, email, message,
        to_char(created_at, 'YYYY-MM-DD HH24:MI') as created_at
      from contact_messages
      order by created_at desc
      limit 500
    `;
    return rows as Row[];
  } catch {
    return [];
  }
}

export default async function AdminMessagesPage() {
  const rows = await getMessages();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
        Contact Messages
      </h1>
      <p className="mt-2 text-muted">{rows.length} message(s).</p>

      {rows.length === 0 ? (
        <p className="mt-6 text-muted">No messages yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((r) => (
            <li key={r.id} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold">
                  {r.name}{" "}
                  <a
                    href={`mailto:${r.email}`}
                    className="font-normal text-brand hover:underline"
                  >
                    {r.email}
                  </a>
                </p>
                <p className="text-xs text-muted">{r.created_at}</p>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm text-fg/90">
                {r.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
