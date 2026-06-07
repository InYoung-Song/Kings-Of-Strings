import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { navLinks } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return navLinks.map((link) => ({
    url: new URL(link.href, siteConfig.url).toString(),
    lastModified,
    changeFrequency: link.href === "/tour" ? "weekly" : "monthly",
    priority: link.href === "/" ? 1 : 0.7,
  }));
}
