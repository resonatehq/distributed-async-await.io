import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicit Allow rules for search-retrieval crawlers (ChatGPT Search / Claude web citations)
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
      },
    ],
    sitemap: "https://www.distributed-async-await.io/sitemap.xml",
  };
}
