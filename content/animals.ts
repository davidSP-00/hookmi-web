import type { Difficulty } from "@/lib/difficulty";

export type AnimalSectionMeta = {
  title: string;
};

export type Animal = {
  id: string;
  slug: string; // usado como ruta raíz, ej /henry-001
  name: string;
  code: string; // código numerado de la pieza, ej "001"
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
    code: "001",
    description:
      "Un ratoncito gordito y goloso que vive obsesionado con el queso y las siestas después de comer. Se pasa el día olfateando la cocina en busca de una migaja, guarda bocaditos en las mejillas 'por si acaso' y jamás dice que no a un pedacito más, aunque ya no le quepa en la pancita.",
    coverImage: "/images/products/henry.jpg",
    difficulty: 1,
    sectionsMeta: [
      { title: "Cuerpo" },
      { title: "Orejas" },
      { title: "Nariz" },
      { title: "Patas delanteras" },
      { title: "Patas traseras" },
      { title: "Barriga" },
      { title: "Cola" },
      { title: "Cosiendo las partes" },
      { title: "Llavero (opcional)" },
    ],
    productSlug: "henry",
  },
  {
    id: "pateo-002",
    slug: "pateo-002",
    name: "Pateo",
    code: "002",
    description:
      "Un patito relajado y sociable que nunca ha conocido a un extraño, solo amigos que todavía no ha saludado. Se sienta en la orilla con su cañita, sin ningún apuro por que pique algo, y aprovecha para charlar con quien se le acerque.",
    coverImage: "/images/products/pateo.jpg",
    difficulty: 1,
    sectionsMeta: [
      { title: "Cuerpo" },
      { title: "Alas" },
      { title: "Pico" },
      { title: "Patas" },
      { title: "Plumas" },
      { title: "Barriga" },
      { title: "Cosiendo las partes" },
      { title: "Llavero (opcional)" },
    ],
    productSlug: "pateo",
  },
];

export function getAnimalBySlug(slug: string): Animal | undefined {
  return animals.find((animal) => animal.slug === slug);
}
