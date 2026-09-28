import type { Metadata } from "next";
import { SITE_NAME, SOCIAL_LINKS, SUPPORT_EMAIL, WHATSAPP_PHONE_NUMBER } from "@/lib/constants";

// Dominio canónico: todas las URLs que ve Google apuntan a www.
export const SITE_URL = "https://www.hookmi.com";

export const DEFAULT_OG_IMAGE = {
  url: "/images/products/henry.jpg",
  width: 1400,
  height: 1400,
  alt: "Kit de crochet HOOKMI: amigurumi Henry el Ratón tejido a mano",
};

export const SEO_KEYWORDS = [
  "kits de crochet",
  "kit de crochet para principiantes",
  "kits de tejido",
  "kit de amigurumi",
  "amigurumi",
  "aprender a tejer desde cero",
  "aprender crochet",
  "crochet para principiantes",
  "tutoriales de crochet",
  "kit de crochet Perú",
  "amigurumi Perú",
];

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

// Metadata completa de una página: título, descripción, canonical y
// Open Graph/Twitter con la foto de Henry por defecto.
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_PE",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/images/web/logo.png"),
  image: absoluteUrl(DEFAULT_OG_IMAGE.url),
  description:
    "Kits de crochet y amigurumi para principiantes en Perú, con todos los materiales y tutoriales en video para aprender a tejer desde cero.",
  email: SUPPORT_EMAIL,
  telephone: `+${WHATSAPP_PHONE_NUMBER}`,
  areaServed: { "@type": "Country", name: "Perú" },
  sameAs: Object.values(SOCIAL_LINKS),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "es-PE",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
