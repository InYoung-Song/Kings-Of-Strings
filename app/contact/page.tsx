import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { SubscribeSection } from "@/components/sections/SubscribeSection";
import { home } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Booking inquiries and questions for The Kings of Strings, a rock and roll band from Detroit, Michigan.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title="Contact"
        subtitle="Booking inquiries or questions are always welcome."
      />
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-lg text-muted">{home.contact.intro}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block text-xl font-semibold text-brand hover:underline"
            >
              {siteConfig.email}
            </a>
            <div className="mt-10">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                Follow + Listen
              </p>
              <SocialLinks />
            </div>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>
      <SubscribeSection />
    </>
  );
}
