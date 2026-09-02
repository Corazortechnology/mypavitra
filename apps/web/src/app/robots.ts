import type { MetadataRoute } from "next";
import { BRAND } from "@puja/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout", "/checkout/", "/admin", "/api/"],
      },
    ],
    sitemap: `${BRAND.domain}/sitemap.xml`,
  };
}
