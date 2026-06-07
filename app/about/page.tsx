import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MemberCard } from "@/components/about/MemberCard";
import { SubscribeSection } from "@/components/sections/SubscribeSection";
import { about, members } from "@/lib/content";
import { aboutPhotos } from "@/lib/assets";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story of The Kings of Strings, a rock and roll band from Detroit, Michigan, and the members behind the music.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={about.subtitle}
        title={about.title}
      />

      {/* The Story */}
      <Section aria-labelledby="story-heading">
        <SectionHeading
          eyebrow="How They Got Here"
          title="The Story"
          id="story-heading"
        />
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-2">
            {about.story.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {aboutPhotos[2] ? (
            <Image
              src={aboutPhotos[2].localPath}
              alt={aboutPhotos[2].altText}
              width={aboutPhotos[2].width ?? 800}
              height={aboutPhotos[2].height ?? 1200}
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="h-full w-full rounded-2xl border border-line object-cover shadow-xl"
            />
          ) : null}
        </div>
      </Section>

      {/* Band photo strip */}
      <Section className="bg-surface" aria-labelledby="photos-heading">
        <h2 id="photos-heading" className="sr-only">
          Band photos
        </h2>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {aboutPhotos.map((photo) => (
            <Image
              key={photo.localFilename}
              src={photo.localPath}
              alt={photo.altText}
              width={photo.width ?? 1200}
              height={photo.height ?? 800}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
              loading="lazy"
              className="w-full rounded-xl border border-line"
            />
          ))}
        </div>
      </Section>

      {/* Members */}
      <Section aria-labelledby="members-heading">
        <SectionHeading
          eyebrow={about.membersSubheading}
          title={about.membersHeading}
          id="members-heading"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {members.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </Section>

      <SubscribeSection />
    </>
  );
}
