import { siteConfig } from "@/src/config/site";
import { products } from "@/src/data/products";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/aviso-de-privacidad", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terminos", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/entregas", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/devoluciones", priority: 0.3, changeFrequency: "monthly" as const },
  ];
  const productRoutes = products.map((product) => ({
    path: `/productos/${product.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));

  return [...staticRoutes, ...productRoutes].map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

