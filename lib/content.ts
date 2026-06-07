// All band copy, preserved verbatim from the live thekingsofstringsband.com.
// This file is the single source of truth for text content. Do not paraphrase,
// summarize, or invent. Edits should only fix clearly requested typos.

export const home = {
  bandName: "The Kings of Strings",
  tagline: "Rock and roll from Detroit, Michigan",
  heroImage: "/media/original/band-banner.jpg",
  liveImage: "/media/original/kos-live.jpg",

  bio: {
    heading: "Band Biography",
    text: "The Kings of Strings are a rock and roll band from Detroit, Michigan. They are a group of friends who met in school and found themselves forming a band first for their enjoyment, and then for the enjoyment of a live audience.",
  },

  contact: {
    heading: "Contact",
    intro: "Booking inquiries or questions can be sent to...",
  },
} as const;

export type Release = {
  title: string;
  kind: string;
  cover: string;
  coverAlt: string;
  spotifyUrl: string;
  spotifyAlbumId: string;
  extraLinks?: { label: string; href: string }[];
};

// Featured single.
export const deadManWalking: Release = {
  title: "Dead Man Walking",
  kind: "New Single",
  cover: "/media/original/dead-man-walking-cover.png",
  coverAlt: "The Kings of Strings Dead Man Walking cover art",
  spotifyUrl:
    "https://open.spotify.com/album/4CaDrhtSHlGOR30RteRuNz?si=06rYIMLAT2CxGLmqe3A4cQ",
  spotifyAlbumId: "4CaDrhtSHlGOR30RteRuNz",
};

// Featured album.
export const memento: Release = {
  title: "Memento LP",
  kind: "Album",
  cover: "/media/original/memento-cover.jpg",
  coverAlt: "The Kings of Strings Memento album cover art",
  spotifyUrl:
    "https://open.spotify.com/album/45YyDgjBPpnp9NhbNTVKjZ?si=4i9CW_YERF-WemCSPiWlkA",
  spotifyAlbumId: "45YyDgjBPpnp9NhbNTVKjZ",
  extraLinks: [
    {
      label: "Apple Music",
      href: "https://music.apple.com/us/album/memento/1753625844",
    },
    {
      label: "iHeartRadio",
      href: "https://www.iheart.com/artist/the-kings-of-strings-38709864/albums/the-kings-of-strings-191431752/",
    },
  ],
};

export const about = {
  title: "The Kings of Strings: The Story",
  subtitle: "How They Got Here",
  // Three story paragraphs, verbatim.
  story: [
    "The Kings of Strings were formed in the Summer of 2016 by high school classmates Giovanni Rugiero on Vocals, multi-instrumentalist Jacob St. Pierre on Guitar, Luke Porada on Bass and Ben Bustamante on Drums. Close friend and the bands second multi-instrumentalist Noah Wojcik would later replace Ben on the Drums and help to define the bands current sound.",
    "Giovanni would later leave the band to pursue other obligations and be replaced with another longtime friend and fellow classmate, Aaron Weisman on Vocals and Rhythm Guitar. The band played many covers from the likes of Led Zeppelin, The Beatles, The Smashing Pumpkins, Green Day, and AC/DC just to name a few. In 2018, the band began to write their own original songs and perform them in bars and clubs in and around Metro Detroit, Lansing, Chicago and Toledo.",
    "They have been performing both originals and covers ever since. The Kings of Strings officially published their first original music featuring the current lineup in September 2022, releasing We Were Young.",
  ],
  membersHeading: "Band Members",
  membersSubheading: "Sum of Talented Parts",
  // Band photos from the original About page. These are group/live photos; the
  // original did not label which image belongs to which member, so they are
  // shown as a band photo strip rather than assigned to individual members.
  photos: [
    { src: "/media/original/about-01.jpg", alt: "The Kings of Strings band photo" },
    { src: "/media/original/about-02.jpg", alt: "The Kings of Strings band photo" },
    { src: "/media/original/about-03.jpg", alt: "The Kings of Strings band photo" },
    { src: "/media/original/about-04.jpg", alt: "The Kings of Strings band photo" },
    { src: "/media/original/about-05.jpg", alt: "The Kings of Strings band photo" },
  ],
} as const;

export type Member = {
  name: string;
  role: string;
  bio: string;
};

// Member bios, verbatim.
export const members: Member[] = [
  {
    name: "Aaron Weisman",
    role: "Vocalist and Guitarist",
    bio: "Aaron has an uncanny sense for finding the right melody for any song. He is a primary songwriter for The Kings of Strings and plays guitar alongside Jake. He is incredibly entertaining both on and off the stage and is an exceptional leader for the band.",
  },
  {
    name: "Jacob St. Pierre",
    role: "Guitarist",
    bio: "Jake is the main musical composer of the group and for good reason, he knows how to simply churn out memorable riffs and solos that range from melodic to chaotic, perfectly encapsulating the sound of the band as a whole. His triad of favorite guitarists are Jimmy Page, Chuck Berry, and Angus Young.",
  },
  {
    name: "Luke Porada",
    role: "Bassist",
    bio: "Luke Porada spearheaded the formation of the band by recruiting his friends to form The Kings of Strings. Luke is the main lyricist of the band's music who prides himself on penning interesting, and inspiring pieces on a whole array of topics. His bass playing is the glue that holds all of the grooves on stage together. His chill and welcoming nature allows him to see things others can't through his artist's eye.",
  },
  {
    name: "Noah Wojcik",
    role: "Drummer",
    bio: "Noah Wojcik joined The Kings of Strings in 2019 and has an energetic, powerful yet light touch behind the kit. Dave Grohl is his main inspiration on drums.",
  },
];

export const tour = {
  heading: "Tour",
  emptyState: "No upcoming shows listed right now. Check back soon.",
} as const;

export const merch = {
  heading: "Merch",
  emptyState: "Merch is on the way. Check back soon.",
} as const;

export const forms = {
  successMessage: "Thanks for submitting!",
} as const;
