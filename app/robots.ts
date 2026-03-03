import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://restaurant-falcon.vercel.app/sitemap.xml",
    host: "https://restaurant-falcon.vercel.app",
  };
}
