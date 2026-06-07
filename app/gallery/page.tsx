import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SubscribeSection } from "@/components/sections/SubscribeSection";
import { galleryImages } from "@/lib/assets";
import type { LightboxImage } from "@/components/gallery/Lightbox";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of The Kings of Strings on stage and beyond. A rock and roll band from Detroit, Michigan.",
};

export default function GalleryPage() {
  const images: LightboxImage[] = galleryImages.map((img) => ({
    src: img.localPath,
    alt: img.altText,
    width: img.width ?? 1200,
    height: img.height ?? 800,
  }));

  return (
    <>
      <PageHeader
        eyebrow="On Stage"
        title="Gallery"
        subtitle="Moments from The Kings of Strings live and behind the scenes."
      />
      <Section>
        <GalleryGrid images={images} />
      </Section>
      <SubscribeSection />
    </>
  );
}
