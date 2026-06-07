import { Button } from "@/components/ui/Button";

export type TourDate = {
  id: string;
  title: string | null;
  venue: string | null;
  city: string | null;
  state: string | null;
  date: string; // YYYY-MM-DD
  ticket_url: string | null;
};

function formatDate(dateStr: string): { month: string; day: string; year: string } {
  // Parse as local date (avoid timezone shifting the day).
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1);
  return {
    month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: String(date.getDate()),
    year: String(date.getFullYear()),
  };
}

function locationLine(t: TourDate): string {
  return [t.city, t.state].filter(Boolean).join(", ");
}

export function TourList({ dates }: { dates: TourDate[] }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
      {dates.map((t) => {
        const { month, day, year } = formatDate(t.date);
        const location = locationLine(t);
        return (
          <li
            key={t.id}
            className="flex flex-col gap-4 bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div className="flex items-center gap-5">
              <div className="flex w-16 shrink-0 flex-col items-center rounded-lg bg-elevated px-3 py-2 text-center">
                <span className="text-xs font-semibold text-brand">{month}</span>
                <span className="font-display text-2xl font-bold leading-none">
                  {day}
                </span>
                <span className="text-xs text-muted">{year}</span>
              </div>
              <div>
                {t.title ? (
                  <p className="font-display text-lg font-bold uppercase tracking-tight">
                    {t.title}
                  </p>
                ) : null}
                {t.venue ? (
                  <p className="font-semibold text-fg">{t.venue}</p>
                ) : null}
                {location ? (
                  <p className="text-sm text-muted">{location}</p>
                ) : null}
              </div>
            </div>
            {t.ticket_url ? (
              <Button href={t.ticket_url} external size="sm" className="self-start sm:self-auto">
                Tickets
              </Button>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
