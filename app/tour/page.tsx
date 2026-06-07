import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { TourList, type TourDate } from "@/components/tour/TourList";
import { EmptyState } from "@/components/tour/EmptyState";
import { SubscribeSection } from "@/components/sections/SubscribeSection";
import { getSql } from "@/lib/db";

export const metadata: Metadata = {
  title: "Tour",
  description:
    "Upcoming shows for The Kings of Strings, a rock and roll band from Detroit, Michigan.",
};

// Re-fetch periodically so newly published dates appear without a redeploy.
export const revalidate = 60;

async function getUpcomingDates(): Promise<TourDate[]> {
  const sql = getSql();
  if (!sql) return [];

  const today = new Date().toISOString().slice(0, 10);
  try {
    const rows = await sql`
      select
        id, title, venue, city, state,
        to_char(date, 'YYYY-MM-DD') as date,
        ticket_url
      from tour_dates
      where is_published = true and date >= ${today}
      order by date asc
    `;
    return rows as TourDate[];
  } catch (err) {
    // Table may not exist yet (migration not run): fall back to the empty state
    // rather than crashing the page.
    console.error(
      "tour_dates fetch failed:",
      err instanceof Error ? err.message : err
    );
    return [];
  }
}

export default async function TourPage() {
  const dates = await getUpcomingDates();

  return (
    <>
      <PageHeader
        eyebrow="Live"
        title="Tour"
        subtitle="Catch The Kings of Strings on stage."
      />
      <Section>
        {dates.length > 0 ? <TourList dates={dates} /> : <EmptyState />}
      </Section>
      <SubscribeSection />
    </>
  );
}
