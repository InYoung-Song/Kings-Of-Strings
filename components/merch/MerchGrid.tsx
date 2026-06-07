import Image from "next/image";
import { Button } from "@/components/ui/Button";

export type MerchItem = {
  id: string;
  name: string;
  description: string | null;
  price: string | null;
  image_path: string | null;
  buy_url: string | null;
};

export function MerchGrid({ items }: { items: MerchItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
        >
          {item.image_path ? (
            <div className="relative aspect-square bg-elevated">
              <Image
                src={item.image_path}
                alt={item.name}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">
              {item.name}
            </h3>
            {item.price ? (
              <p className="mt-1 font-semibold text-brand">{item.price}</p>
            ) : null}
            {item.description ? (
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            ) : null}
            {item.buy_url ? (
              <div className="mt-4 pt-2">
                <Button href={item.buy_url} external size="sm">
                  Buy
                </Button>
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
