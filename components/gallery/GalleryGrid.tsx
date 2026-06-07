"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox, type LightboxImage } from "./Lightbox";

export function GalleryGrid({ images }: { images: LightboxImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Masonry via CSS columns; items keep their natural aspect ratio. */}
      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open ${img.alt}`}
            className="group block w-full overflow-hidden rounded-xl border border-line focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
              loading={i < 4 ? "eager" : "lazy"}
              className="w-full transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      {openIndex !== null ? (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      ) : null}
    </>
  );
}
