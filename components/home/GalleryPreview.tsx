import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { galleryImages } from "@/lib/assets";

export function GalleryPreview() {
  const preview = galleryImages.slice(0, 6);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {preview.map((img, i) => (
          <Link
            key={img.localFilename}
            href="/gallery"
            className="group relative aspect-square overflow-hidden rounded-xl border border-line"
          >
            <Image
              src={img.localPath}
              alt={img.altText}
              fill
              sizes="(min-width: 640px) 30vw, 45vw"
              loading={i < 2 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button href="/gallery" variant="outline">
          View Full Gallery
        </Button>
      </div>
    </div>
  );
}
