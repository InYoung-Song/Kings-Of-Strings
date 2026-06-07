"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
} from "@/components/ui/Icons";

export type LightboxImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = images[index];
  const hasMultiple = images.length > 1;

  const goPrev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate]
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate]
  );

  // Keyboard controls and body scroll lock.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [goPrev, goNext, onClose]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <CloseIcon className="h-6 w-6" />
      </button>

      {hasMultiple ? (
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
      ) : null}

      {/* Stop propagation so clicking the image itself does not close. */}
      <figure
        className="relative max-h-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          sizes="100vw"
          priority
          className="max-h-[85vh] w-auto rounded-lg object-contain"
        />
        <figcaption className="mt-3 text-center text-sm text-white/70">
          {index + 1} / {images.length}
        </figcaption>
      </figure>

      {hasMultiple ? (
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4"
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      ) : null}
    </div>
  );
}
