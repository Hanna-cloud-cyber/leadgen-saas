import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account", "/account/", "/supplier", "/supplier/"],
      },
    ],
    sitemap: "https://www.veridian.com/sitemap.xml",
  };
}
