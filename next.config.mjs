/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local migrated assets live under /public/media/original, so no remote
    // patterns are required for normal operation. The entry below is kept only
    // so that, if a Wix URL is ever referenced directly, next/image can still
    // optimize it. The site does not depend on Wix hotlinks.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
};

export default nextConfig;
