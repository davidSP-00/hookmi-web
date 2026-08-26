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
    // código de demo: HNRY-0001
    passwordHash:
      "f11fa233982557b6ae139eb510af92e2:02143b5f39b256b12fdba803ff13057225c1e4f7d54a3378ea910805f3f0fb0b6624d880c8d15f7786bd50ed05c8e479abea2b924ea703613678fafbecdaa6a9",
    sections: [
      { title: "Cuerpo", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_cuerpo" },
      { title: "Orejas", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_orejas" },
      { title: "Cara", videoUrl: "https://www.youtube.com/embed/REEMPLAZAR_henry_cara" },
    ],
    pdfFile: "henry-001.pdf",
  },
  {
    slug: "pateo-002",
    // código de demo: PATO-0002
    passwordHash:
      "ab7506ed665fca8bf996f2538bcb8bbd:3336f9854cedf67178884c04e99d63a348c6bf88c50af24dc2a87f62c12f8260c8ea17b78b066cc1d8bc5f034c0045a062d973eff984712d78f8659d3e834f71",
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
