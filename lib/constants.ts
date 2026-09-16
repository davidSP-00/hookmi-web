export const SITE_NAME = "HOOKMI";

export const WHATSAPP_PHONE_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER ?? "51922007912";

export const DEFAULT_WHATSAPP_MESSAGE =
  "¡Hola! Tengo una consulta sobre los kits de crochet de HOOKMI 🧶";

export const SUPPORT_EMAIL = "ayuda@hookmi.com";

export const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/tutoriales", label: "Tutoriales" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/hookmi.pe",
  facebook: "https://facebook.com/hookmi.pe",
  tiktok: "https://tiktok.com/@hookmi.pe",
} as const;

export const RESERVED_SLUGS = [
  "productos",
  "tutoriales",
  "nosotros",
  "contacto",
  "api",
] as const;

export const UNLOCK_COOKIE_PREFIX = "hookmi_unlock_";
export const UNLOCK_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 días
