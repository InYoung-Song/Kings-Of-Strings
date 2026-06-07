// Central site configuration: navigation, social/music links, contact email,
// and default SEO metadata. All links are preserved verbatim from the original
// thekingsofstringsband.com site.

export const siteConfig = {
  name: "The Kings of Strings",
  shortDescription: "Rock and roll band from Detroit, Michigan.",
  description:
    "The Kings of Strings are a rock and roll band from Detroit, Michigan. Stream Dead Man Walking and the Memento LP, browse the gallery, and book the band.",
  // Update this to the production URL once deployed (Vercel preview or final domain).
  url: "https://www.thekingsofstringsband.com",
  email: "thekingsofstrings@gmail.com",
  ogImage: "/media/original/band-banner.jpg",
} as const;

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/tour", label: "Tour" },
  { href: "/merch", label: "Merch" },
  { href: "/contact", label: "Contact" },
];

export type SocialIcon =
  | "instagram"
  | "facebook"
  | "youtube"
  | "x"
  | "spotify"
  | "appleMusic"
  | "iheart";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

// Preserved exactly from the live site footer/header.
export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/thekingsofstringsband/",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Kosofficial18/",
    icon: "facebook",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCIwN_cwT0AXEa1FbnW4nNeQ",
    icon: "youtube",
  },
  {
    label: "X",
    href: "https://x.com/KoSofficial_of",
    icon: "x",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/album/45YyDgjBPpnp9NhbNTVKjZ",
    icon: "spotify",
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/us/album/memento/1753625844",
    icon: "appleMusic",
  },
  {
    label: "iHeartRadio",
    href: "https://www.iheart.com/artist/the-kings-of-strings-38709864/albums/the-kings-of-strings-191431752/",
    icon: "iheart",
  },
];
