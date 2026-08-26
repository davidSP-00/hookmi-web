import type { Difficulty } from "@/lib/difficulty";

export type AnimalSectionMeta = {
  title: string;
};

export type Animal = {
  id: string;
  slug: string; // usado como ruta raíz, ej /henry-001
  name: string;
  description: string;
  coverImage: string;
  difficulty: Difficulty; // 0 (más fácil) a 5 (más difícil)
  // El orden y la cantidad deben calzar 1:1 con `sections` en content/animals.secure.ts
  sectionsMeta: AnimalSectionMeta[];
  productSlug?: string;
};

export const animals: Animal[] = [
  {
    id: "henry-001",
    slug: "henry-001",
    name: "Henry",
    description:
      "Un ratoncito curioso de orejas redondas y bigotes traviesos, el amigurumi ideal para aprender las bases del crochet: punto bajo, aumentos y disminuciones.",
    coverImage: "/images/animals/henry.svg",
    difficulty: 1,
    sectionsMeta: [
      { title: "Cuerpo" },
      { title: "Orejas" },
      { title: "Cara" },
    ],
    productSlug: "henry",
  },
  {
    id: "pateo-002",
    slug: "pateo-002",
    name: "Pateo",
    description:
      "Un patito con un pico enorme de personalidad, listo para nadar a tu lado. Perfecto para practicar el pico y los detalles de la cara.",
    coverImage: "/images/animals/pateo.svg",
    difficulty: 1,
    sectionsMeta: [
      { title: "Cuerpo" },
      { title: "Alas" },
      { title: "Pico" },
    ],
    productSlug: "pateo",
  },
  {
    id: "boo-003",
    slug: "boo-003",
    name: "Boo",
    description:
      "Un fantasmita adorable, más dulce que espeluznante: perfecto para coleccionar todo el año. Su forma redondeada lo hace muy fácil de tejer.",
    coverImage: "/images/animals/boo.svg",
    difficulty: 1,
    sectionsMeta: [
      { title: "Cuerpo" },
      { title: "Ojos" },
      { title: "Boca" },
    ],
    productSlug: "boo",
  },
];

export function getAnimalBySlug(slug: string): Animal | undefined {
  return animals.find((animal) => animal.slug === slug);
}
