import { getSql } from "@/lib/db";
import { addMerch, deleteMerch, toggleMerchPublished } from "@/lib/admin-actions";
import { Button } from "@/components/ui/Button";

type Row = {
  id: string;
  name: string;
  description: string | null;
  price: string | null;
  image_path: string | null;
  buy_url: string | null;
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
      select id, name, description, price, image_path, buy_url, is_published
      from merch
      order by sort_order asc, created_at asc
    `;
    return rows as Row[];
  } catch {
    return [];
  }
}

export default async function AdminMerchPage() {
  const rows = await getAll();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight">
          Merch
        </h1>
        <p className="mt-2 text-muted">
          Add products here. Until you add one, the public Merch page shows a
          &quot;coming soon&quot; message. Image URL can be a Vercel Blob/Imgur/etc.
          link or a path under /media.
        </p>
      </div>

      <form
        action={addMerch}
        className="rounded-2xl border border-line bg-surface p-6"
      >
        <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-tight">
          Add a product
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="m-name">
              Name (required)
            </label>
            <input id="m-name" className={field} name="name" required />
          </div>
          <div>
            <label className={label} htmlFor="m-price">
              Price
            </label>
            <input id="m-price" className={field} name="price" placeholder="$25" />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="m-desc">
              Description
            </label>
            <input id="m-desc" className={field} name="description" />
          </div>
          <div>
            <label className={label} htmlFor="m-img">
              Image URL
            </label>
            <input id="m-img" className={field} name="image_path" placeholder="https://" />
          </div>
          <div>
            <label className={label} htmlFor="m-buy">
              Buy URL
            </label>
            <input id="m-buy" className={field} name="buy_url" placeholder="https://" />
          </div>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_published" defaultChecked />
          Publish immediately
        </label>
        <div className="mt-5">
          <Button type="submit">Add product</Button>
        </div>
      </form>

      {rows.length === 0 ? (
        <p className="text-muted">No merch items yet.</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <li
              key={r.id}
              className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">
                  {r.name}
                  {r.price ? ` - ${r.price}` : ""}
                  {!r.is_published ? (
                    <span className="ml-2 rounded-full bg-elevated px-2 py-0.5 text-xs text-muted">
                      Draft
                    </span>
                  ) : null}
                </p>
                {r.description ? (
                  <p className="text-sm text-muted">{r.description}</p>
                ) : null}
              </div>
              <div className="flex gap-2">
                <form action={toggleMerchPublished}>
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold hover:border-brand hover:text-brand"
                  >
                    {r.is_published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deleteMerch}>
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
