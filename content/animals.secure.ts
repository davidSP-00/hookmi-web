import "server-only";

// Archivo SOLO servidor: nunca lo importes desde un componente de cliente
// ni desde `content/animals.ts`. Solo lo deben leer las Route Handlers
// en app/api/unlock, app/api/pdf/[slug] y
// app/api/animal-video/[slug]/[sectionId].
//
// `videoUrl` es la URL real de CloudFront: nunca se pasa tal cual a un
// Client Component. La página arma para el cliente una versión con
// `/api/animal-video/<slug>/<id>` (ver app/[animalSlug]/page.tsx), así el
// link real del bucket nunca llega al HTML/RSC payload que ve el navegador.
//
// Para generar el hash de un código nuevo:
//   node scripts/hash-password.mjs "XXXX-XXXX"
//
// El código que ingresa el cliente sigue el patrón XXXX-XXXX (letras/números
// en mayúscula, ver components/animals/PasswordGateForm.tsx). El hash debe
// generarse a partir del código completo, incluyendo el guion.

export type AnimalSecureSection = {
  id: string; // usado en la URL del proxy: /api/animal-video/<slug>/<id>
  title: string; // debe calzar 1:1 en orden y cantidad con `sectionsMeta` en content/animals.ts
  videoUrl: string; // URL real de CloudFront (o embed de YouTube/Vimeo mientras no haya video propio)
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
    // código: K9X7-P2M4
    passwordHash:
      "6f9b9c47f41829cff9bfb7eddecd1559:a57166e688fcf716fd8e3fd7deb329ddaabd32d5ca553cad4cdea46ecece8006dc0f539652a3b9295b250f1fcb916ad1cc1436799b99105fab73ffe0fb1e4d62",
    sections: [
      { id: "cuerpo", title: "Cuerpo", videoUrl: "https://d38qkanw9z3wft.cloudfront.net/001-HENRY/CUERPO.mp4" },
      { id: "orejas", title: "Orejas", videoUrl: "https://d38qkanw9z3wft.cloudfront.net/001-HENRY/OREJAS.mp4" },
      { id: "nariz", title: "Nariz", videoUrl: "https://d38qkanw9z3wft.cloudfront.net/001-HENRY/NARIZ.mp4" },
      {
        id: "patas-delanteras",
        title: "Patas delanteras",
        videoUrl: "https://d38qkanw9z3wft.cloudfront.net/001-HENRY/PATAS%20DELANTERAS.mp4",
      },
      {
        id: "patas-traseras",
        title: "Patas traseras",
        videoUrl: "https://d38qkanw9z3wft.cloudfront.net/001-HENRY/PATAS%20TRASERAS.mp4",
      },
      { id: "barriga", title: "Barriga", videoUrl: "https://d38qkanw9z3wft.cloudfront.net/001-HENRY/BARRIGA.mp4" },
      { id: "cola", title: "Cola", videoUrl: "https://d38qkanw9z3wft.cloudfront.net/001-HENRY/COLA.mp4" },
      {
        id: "cosido",
        title: "Cosiendo las partes",
        videoUrl: "https://d38qkanw9z3wft.cloudfront.net/001-HENRY/COSIDO.mp4",
      },
      {
        id: "llavero",
        title: "Llavero (opcional)",
        videoUrl: "https://d38qkanw9z3wft.cloudfront.net/001-HENRY/LLAVERO.mp4",
      },
    ],
    pdfFile: "henry-001.pdf",
  },
  {
    slug: "pateo-002",
    // código: U78Q-L3A2
    passwordHash:
      "0a2058dc4862a6d8c4799f7018388875:7041d17b51860c9a8d19d4682129b526192618b490672fe4926f127de951277b542b32ef82ead76668d5838b696ef34878c7ce6f97fe99f44dc8e7b10aa69191",
    sections: [
      { id: "cuerpo", title: "Cuerpo", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_cuerpo" },
      { id: "alas", title: "Alas", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_alas" },
      { id: "pico", title: "Pico", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_pico" },
      { id: "patas", title: "Patas", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_patas" },
      { id: "plumas", title: "Plumas", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_plumas" },
      { id: "barriga", title: "Barriga", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_barriga" },
      {
        id: "cosido",
        title: "Cosiendo las partes",
        videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_cosiendo_las_partes",
      },
      { id: "llavero", title: "Llavero (opcional)", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_llavero" },
    ],
    pdfFile: "pateo-002.pdf",
  },
];

export function getAnimalSecureBySlug(slug: string): AnimalSecure | undefined {
  return animalsSecure.find((animal) => animal.slug === slug);
}

export function getAnimalSectionVideoUrl(slug: string, sectionId: string): string | undefined {
  return getAnimalSecureBySlug(slug)?.sections.find((section) => section.id === sectionId)?.videoUrl;
}

const PROXIED_VIDEO_HOST = "https://d38qkanw9z3wft.cloudfront.net/";

export type AnimalClientSection = { title: string; videoUrl: string };

// Versión segura de `sections` para pasarle a un Client Component: los
// videos propios (CloudFront) se cambian por la ruta del proxy
// (/api/animal-video/<slug>/<id>), nunca por la URL real del bucket. Los
// que todavía son un placeholder de YouTube se dejan tal cual, igual que
// antes, porque YouTube ya sirve esos links pensados para incrustarse.
export function getAnimalClientSections(slug: string): AnimalClientSection[] {
  const secure = getAnimalSecureBySlug(slug);
  if (!secure) return [];

  return secure.sections.map((section) => ({
    title: section.title,
    videoUrl: section.videoUrl.startsWith(PROXIED_VIDEO_HOST)
      ? `/api/animal-video/${slug}/${section.id}`
      : section.videoUrl,
  }));
}
