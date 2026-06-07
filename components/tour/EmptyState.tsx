import { Button } from "@/components/ui/Button";
import { tour } from "@/lib/content";

export function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center">
      <p className="mx-auto max-w-md text-xl font-semibold text-fg">
        {tour.emptyState}
      </p>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Subscribe below and follow us on social to be the first to know when new
        shows are announced.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/contact" variant="outline">
          Book the Band
        </Button>
      </div>
    </div>
  );
}
