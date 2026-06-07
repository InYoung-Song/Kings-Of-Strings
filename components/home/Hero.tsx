import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { deadManWalking } from "@/lib/content";
import { SpotifyIcon } from "@/components/ui/Icons";

export function Hero() {
  return (
    // Always-dark hero so the official logo (white wordmark + king cards on
    // black) blends seamlessly and the cards pop, in both light and dark themes.
    <section className="relative isolate flex min-h-[88vh] items-center justify-center overflow-hidden bg-black text-white">
      <Container className="py-20 text-center">
        <Image
          src="/media/original/band-banner.jpg"
          alt="The Kings of Strings"
          width={1176}
          height={875}
          priority
          sizes="(min-width: 768px) 720px, 90vw"
          className="mx-auto w-full max-w-2xl"
        />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-brand">
          A rock and roll band from Detroit, Michigan
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={deadManWalking.spotifyUrl} external size="lg">
            <SpotifyIcon className="h-5 w-5" />
            Stream the Single
          </Button>
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:border-brand hover:text-brand"
          >
            Book the Band
          </Button>
        </div>
      </Container>
    </section>
  );
}
