import type { MetadataRoute } from "next";
import { getAllEditions } from "@/lib/bulletin";

const SITE = "https://www.ovnnexus.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const editions = getAllEditions();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/science`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/education`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/blog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/signup`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE}/login`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogEntries: MetadataRoute.Sitemap = editions.map((e) => ({
    url: `${SITE}/blog/${e.slug}`,
    lastModified: e.published_at,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
