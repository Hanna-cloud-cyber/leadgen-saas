import type { MetadataRoute } from "next";
import {
  getAllCategories,
  getAllCountries,
  getAllSuppliers,
  getAllProducts,
  getSuppliersByCategoryAndCountry,
} from "@/lib/marketplace/data";

const BASE_URL = "https://www.veridian.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/search",
    "/products",
    "/pricing",
    "/rfq",
    "/compare",
    "/ai-match",
    "/verification",
    "/for-suppliers",
    "/about",
    "/resources",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes = getAllCategories().map((c) => ({
    url: `${BASE_URL}/categories/${c.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const countryRoutes = getAllCountries().map((c) => ({
    url: `${BASE_URL}/countries/${c.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const productCategoryRoutes = getAllCategories().map((c) => ({
    url: `${BASE_URL}/products/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const categoryCountryRoutes: MetadataRoute.Sitemap = [];
  for (const c of getAllCategories()) {
    for (const country of getAllCountries()) {
      if (getSuppliersByCategoryAndCountry(c.slug, country.slug).length > 0) {
        categoryCountryRoutes.push({
          url: `${BASE_URL}/categories/${c.slug}/${country.slug}`,
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    }
  }

  const supplierRoutes = getAllSuppliers().map((s) => ({
    url: `${BASE_URL}/suppliers/${s.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${BASE_URL}/products/${p.categorySlug}#${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...countryRoutes,
    ...productCategoryRoutes,
    ...categoryCountryRoutes,
    ...supplierRoutes,
    ...productRoutes,
  ];
}
