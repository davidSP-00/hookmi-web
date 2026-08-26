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
      { title: "Cara", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_cara" },
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
    ],
    pdfFile: "pateo-002.pdf",
  },
  {
    slug: "boo-003",
    // código de demo: BOOO-0003
    passwordHash:
      "10d006629ea9ee0f2cbaada83231d734:d6a9ae771442859b5842c7fae2116fa235f00dafd7403be029ac9f9e67b2841195dccd51aef24e81023c6293ee789cf4738e79a0ebb049f91deaa4bc932f9e75",
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
