import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { MerchGrid, type MerchItem } from "@/components/merch/MerchGrid";
import { SubscribeSection } from "@/components/sections/SubscribeSection";
import { merch } from "@/lib/content";
import { getSql } from "@/lib/db";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "Official merch from The Kings of Strings, a rock and roll band from Detroit, Michigan.",
};

export const revalidate = 60;

async function getMerch(): Promise<MerchItem[]> {
  const sql = getSql();
  if (!sql) return [];
  try {
    const rows = await sql`
      select id, name, description, price, image_path, buy_url
      from merch
      where is_published = true
      order by sort_order asc, created_at asc
    `;
    return rows as MerchItem[];
  } catch (err) {
    console.error(
      "merch fetch failed:",
      err instanceof Error ? err.message : err
    );
    return [];
  }
}

export default async function MerchPage() {
  const items = await getMerch();

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title="Merch"
        subtitle="Represent The Kings of Strings."
      />
      <Section>
        {items.length > 0 ? (
          <MerchGrid items={items} />
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-surface px-6 py-16 text-center">
            <p className="mx-auto max-w-md text-xl font-semibold text-fg">
              {merch.emptyState}
            </p>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Subscribe below and follow us on social to know when merch drops.
            </p>
          </div>
        )}
      </Section>
      <SubscribeSection />
    </>
  );
}
