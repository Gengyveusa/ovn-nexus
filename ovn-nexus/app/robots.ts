import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/science", "/education", "/blog", "/signup", "/login"],
        disallow: [
          "/api/",
          "/dashboard",
          "/admin",
          "/clinics",
          "/patients",
          "/biomarkers",
          "/experiments",
          "/datasets",
          "/papers",
          "/trials",
          "/hub",
        ],
      },
    ],
    sitemap: "https://www.ovnnexus.com/sitemap.xml",
  };
}
