import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://distributed-async-await.io";

  // Exclude the root page here; it is emitted once explicitly below so the
  // sitemap doesn't carry both `/` and the bare origin as duplicate entries.
  const pages = source
    .getPages()
    .filter((page) => page.url !== "/")
    .map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pages,
  ];
}
