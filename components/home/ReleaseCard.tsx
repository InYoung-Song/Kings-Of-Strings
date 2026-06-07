import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SpotifyEmbed } from "@/components/ui/SpotifyEmbed";
import { SpotifyIcon } from "@/components/ui/Icons";
import { getAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import type { Release } from "@/lib/content";

export function ReleaseCard({
  release,
  reverse = false,
}: {
  release: Release;
  reverse?: boolean;
}) {
  const filename = release.cover.split("/").pop() ?? "";
  const meta = getAsset(filename);
  const width = meta?.width ?? 600;
  const height = meta?.height ?? 600;

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className={cn(reverse && "md:order-2")}>
        <Image
          src={release.cover}
          alt={release.coverAlt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 40vw, 90vw"
          className="mx-auto w-full max-w-md rounded-2xl border border-line shadow-2xl"
        />
      </div>

      <div className={cn(reverse && "md:order-1")}>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          {release.kind}
        </p>
        <h3 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
          {release.title}
        </h3>

        <div className="mt-6">
          <SpotifyEmbed albumId={release.spotifyAlbumId} title={release.title} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={release.spotifyUrl} external>
            <SpotifyIcon className="h-5 w-5" />
            Listen on Spotify
          </Button>
          {release.extraLinks?.map((link) => (
            <Button key={link.href} href={link.href} external variant="outline">
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
