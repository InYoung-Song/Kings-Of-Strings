import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { home, deadManWalking } from "@/lib/content";
import { SpotifyIcon } from "@/components/ui/Icons";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
      {/* Background performance photo from the original site. */}
      <Image
        src={home.liveImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Readability overlay; blends into the page background at the bottom. */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-bg" />

      <Container className="relative z-10 py-24 text-white">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand">
          {home.tagline}
        </p>
        <h1 className="max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          The Kings of Strings
        </h1>
        <p className="mt-6 max-w-xl text-lg text-zinc-200">
          A rock and roll band from Detroit, Michigan.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href={deadManWalking.spotifyUrl} external size="lg">
            <SpotifyIcon className="h-5 w-5" />
            Stream the Single
          </Button>
          <Button href="/contact" variant="outline" size="lg" className="text-white">
            Book the Band
          </Button>
        </div>
      </Container>
    </section>
  );
}
