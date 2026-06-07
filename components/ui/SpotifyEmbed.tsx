// Spotify album player embed. Lazy-loaded so it never blocks first paint.
export function SpotifyEmbed({
  albumId,
  title,
  compact = false,
}: {
  albumId: string;
  title: string;
  compact?: boolean;
}) {
  return (
    <iframe
      title={`Spotify player: ${title}`}
      src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`}
      width="100%"
      height={compact ? 152 : 352}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
      style={{ border: 0 }}
      className="w-full rounded-xl"
    />
  );
}
