import "server-only";

// Archivo SOLO servidor: nunca lo importes desde un componente de cliente
// ni desde `content/animals.ts`. Solo lo deben leer las Route Handlers
// en app/api/unlock y app/api/pdf/[slug].
//
// Para generar el hash de un código nuevo:
//   node scripts/hash-password.mjs "XXXX-XXXX"
//
// El código que ingresa el cliente sigue el patrón XXXX-XXXX (letras/números
// en mayúscula, ver components/animals/PasswordGateForm.tsx). El hash debe
// generarse a partir del código completo, incluyendo el guion.

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
    // código: K9X7-P2M4
    passwordHash:
      "6f9b9c47f41829cff9bfb7eddecd1559:a57166e688fcf716fd8e3fd7deb329ddaabd32d5ca553cad4cdea46ecece8006dc0f539652a3b9295b250f1fcb916ad1cc1436799b99105fab73ffe0fb1e4d62",
    sections: [
      { title: "Cuerpo", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_cuerpo" },
      { title: "Orejas", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_orejas" },
      { title: "Patas delanteras", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_patas_delanteras" },
      { title: "Patas traseras", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_patas_traseras" },
      { title: "Barriga", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_barriga" },
      { title: "Nariz", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_nariz" },
      { title: "Cola", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_cola" },
      { title: "Cosiendo las partes", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_cosiendo_las_partes" },
      { title: "Llavero (opcional)", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_llavero" },
    ],
    pdfFile: "henry-001.pdf",
  },
  {
    slug: "pateo-002",
    // código: U78Q-L3A2
    passwordHash:
      "0a2058dc4862a6d8c4799f7018388875:7041d17b51860c9a8d19d4682129b526192618b490672fe4926f127de951277b542b32ef82ead76668d5838b696ef34878c7ce6f97fe99f44dc8e7b10aa69191",
    sections: [
      { title: "Cuerpo", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_cuerpo" },
      { title: "Alas", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_alas" },
      { title: "Pico", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_pico" },
      { title: "Patas", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_patas" },
      { title: "Plumas", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_plumas" },
      { title: "Barriga", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_barriga" },
      { title: "Cosiendo las partes", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_cosiendo_las_partes" },
      { title: "Llavero (opcional)", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_pateo_llavero" },
    ],
    pdfFile: "pateo-002.pdf",
  },
];

export function getAnimalSecureBySlug(slug: string): AnimalSecure | undefined {
  return animalsSecure.find((animal) => animal.slug === slug);
}
