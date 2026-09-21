import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /studio is a private authoring surface — it has nothing to index and
    // nothing worth crawling.
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
