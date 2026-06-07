import Image from "next/image";
import { Hero } from "@/components/home/Hero";
import { ReleaseCard } from "@/components/home/ReleaseCard";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { SubscribeForm } from "@/components/forms/SubscribeForm";
import { home, deadManWalking, memento } from "@/lib/content";
import { getAsset } from "@/lib/assets";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const bioPhoto = getAsset("about-01.jpg");

  return (
    <>
      <Hero />

      {/* Band Biography */}
      <Section aria-labelledby="bio-heading">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Detroit, Michigan"
              title={home.bio.heading}
              id="bio-heading"
              className="mb-6"
            />
            <p className="text-lg leading-relaxed text-muted">{home.bio.text}</p>
            <div className="mt-8">
              <Button href="/about" variant="outline">
                Read the Full Story
              </Button>
            </div>
          </div>
          {bioPhoto ? (
            <Image
              src={bioPhoto.localPath}
              alt={bioPhoto.altText}
              width={bioPhoto.width ?? 1200}
              height={bioPhoto.height ?? 800}
              sizes="(min-width: 768px) 45vw, 90vw"
              className="w-full rounded-2xl border border-line object-cover shadow-xl"
            />
          ) : null}
        </div>
      </Section>

      {/* Music: featured single + album */}
      <Section className="bg-surface" aria-labelledby="music-heading">
        <SectionHeading eyebrow="Music" title="Listen" id="music-heading" />
        <div className="space-y-20">
          <ReleaseCard release={deadManWalking} />
          <ReleaseCard release={memento} reverse />
        </div>
      </Section>

      {/* Gallery preview */}
      <Section aria-labelledby="gallery-heading">
        <SectionHeading eyebrow="On Stage" title="Gallery" id="gallery-heading" />
        <GalleryPreview />
      </Section>

      {/* Contact / booking */}
      <Section className="bg-surface" aria-labelledby="contact-heading">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Booking"
              title={home.contact.heading}
              id="contact-heading"
            />
            <p className="text-lg text-muted">{home.contact.intro}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block text-lg font-semibold text-brand hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* Subscribe */}
      <Section aria-labelledby="subscribe-heading">
        <Container className="max-w-2xl text-center">
          <SectionHeading
            eyebrow="Stay in the loop"
            title="Subscribe"
            id="subscribe-heading"
            className="mb-6"
          />
          <p className="mx-auto mb-8 max-w-md text-muted">
            Join the mailing list for new music, show announcements, and more.
          </p>
          <SubscribeForm />
        </Container>
      </Section>
    </>
  );
}
