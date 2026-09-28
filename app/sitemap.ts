import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { animals } from "@/content/animals";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/kits-de-crochet"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/aprende-a-tejer-crochet"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/productos"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/tutoriales"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/nosotros"), changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/contacto"), changeFrequency: "yearly", priority: 0.5 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/productos/${product.slug}`),
    changeFrequency: "weekly",
    priority: 0.8,
    images: product.images.filter((src) => !src.endsWith(".svg")).map(absoluteUrl),
  }));

  const animalPages: MetadataRoute.Sitemap = animals.map((animal) => ({
    url: absoluteUrl(`/${animal.slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...animalPages].map((entry) => ({
    ...entry,
    lastModified,
  }));
}
