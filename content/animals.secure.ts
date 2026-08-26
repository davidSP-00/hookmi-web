import "server-only";

// Archivo SOLO servidor: nunca lo importes desde un componente de cliente
// ni desde `content/animals.ts`. Solo lo deben leer las Route Handlers
// en app/api/unlock y app/api/pdf/[slug].
//
// Para generar el hash de una contraseña nueva:
//   node scripts/hash-password.mjs "miContraseña"

export type AnimalSecureSection = {
  title: string; // debe calzar 1:1 en orden y cantidad con `sectionsMeta` en content/animals.ts
  videoUrl: string; // URL embebible de YouTube/Vimeo (modo no listado)
};

export type AnimalSecure = {
  slug: string; // FK -> Animal.slug en content/animals.ts
  passwordHash: string; // generado con scripts/hash-password.mjs
  sections: AnimalSecureSection[];
  pdfFile: string; // nombre de archivo dentro de private/pdfs/
};

export const animalsSecure: AnimalSecure[] = [
  {
    slug: "henry-001",
    // contraseña de demo: henry2024
    passwordHash:
      "d2ddaf3cb08eec89c9d90cd4da30397f:fe35dc2b376437add7dab3e65ef014267c00c1ed7704aece4780c82217350950ddd5c28649db8b422fa7c4676ad07213827a2c92e8b7f253b8ddbf874999ccbb",
    sections: [
      { title: "Cuerpo", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_cuerpo" },
      { title: "Orejas", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_orejas" },
      { title: "Cara", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_cara" },
    ],
    pdfFile: "henry-001.pdf",
  },
  {
    slug: "pateo-002",
    // contraseña de demo: pateo2024
    passwordHash:
      "323e29e5439b256c3c8ac6e830e032cf:81a553eef77256c4a238564c122e065abd8af57fcb5eb9571db901f0cf4368878ae9be607112053546e56ce443e681dc85fcb090150d983d28d5c4c8e0c58108",
    sections: [
      { title: "Cuerpo", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_cuerpo" },
      { title: "Alas", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_alas" },
      { title: "Pico", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_pico" },
    ],
    pdfFile: "pateo-002.pdf",
  },
  {
    slug: "boo-003",
    // contraseña de demo: boo2024
    passwordHash:
      "3819101a9c323680dfdaabd2b5e99de1:f5ab08f9c6f78ce384f6a323ae5e4d745f9b6691a66bfcc732ab6284384bec928aba77b6006d4a57947c0b1ddd5f63cf1dae32ccec071cd33e5327861d834e2f",
    sections: [
      { title: "Cuerpo", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_boo_cuerpo" },
      { title: "Ojos", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_boo_ojos" },
      { title: "Boca", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_boo_boca" },
    ],
    pdfFile: "boo-003.pdf",
  },
];

export function getAnimalSecureBySlug(slug: string): AnimalSecure | undefined {
  return animalsSecure.find((animal) => animal.slug === slug);
}
