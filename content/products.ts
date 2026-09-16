import type { Difficulty } from "@/lib/difficulty";

export type Product = {
  id: string;
  slug: string;
  name: string;
  collectionNumber: string; // ej "N.º 001", refuerza el look de colección
  price: number;
  currency: "PEN" | "USD";
  shortDescription: string;
  description: string;
  images: string[]; // la primera es la imagen principal; el resto forma la galería
  difficulty: Difficulty; // 0 (más fácil) a 5 (más difícil)
  kitIncludes: string[];
  whatsappMessage: string;
  animalSlug?: string;
  inStock: boolean;
  tags?: string[];
};

const BASE_KIT_ITEMS = [
  "Lana antialérgica premium",
  "Crochet ergonómico de 4mm",
  "Aguja lanera para armar",
  "Ojos de seguridad",
  "Separador de puntos (marcador)",
  "Relleno de fibra siliconada",
  "Videos tutoriales paso a paso",
  "Patrón de instrucciones en PDF descargable",
  "Ayuda por WhatsApp o email cuando la necesites",
];

export const products: Product[] = [
  {
    id: "prod-henry-001",
    slug: "henry",
    name: "Henry el Ratón",
    collectionNumber: "N.º 001",
    price: 69,
    currency: "PEN",
    shortDescription:
      "La pieza N.º 001 de la colección HOOKMI: un ratoncito gordito que vive enamorado del queso.",
    description:
      "Henry es el ratoncito más goloso de la colección HOOKMI: vive obsesionado con el queso y las siestas después de comer. Este kit coleccionable trae todo lo que necesitas para tejerlo desde cero, sin experiencia previa, más tu pin y stickers exclusivos de Henry.",
    images: [
      "/images/products/henry.jpg",
      "/images/products/henry-2.jpg",
      "/images/products/henry-3.svg",
    ],
    difficulty: 1,
    kitIncludes: [
      ...BASE_KIT_ITEMS,
      "Stickers exclusivos de Henry",
      "Pin coleccionable de Henry",
      "Carta coleccionable de Henry",
    ],
    whatsappMessage: "¡Hola! Quiero comprar el kit coleccionable de Henry el Ratón (N.º 001) 🐭",
    animalSlug: "henry-001",
    inStock: true,
    tags: ["nuevo", "más vendido"],
  },
  {
    id: "prod-pateo-002",
    slug: "pateo",
    name: "Pateo el Pato",
    collectionNumber: "N.º 002",
    price: 69,
    currency: "PEN",
    shortDescription:
      "La pieza N.º 002 de la colección HOOKMI: un patito relajado que hace amigos por donde pasa.",
    description:
      "Pateo es el pato más sociable de la colección HOOKMI: le encanta pescar sin apuro y hacer amigos con quien se le acerque. Este kit coleccionable trae todo lo que necesitas para tejerlo desde cero, sin experiencia previa, más tu pin y stickers exclusivos de Pateo.",
    images: [
      "/images/products/pateo.jpg",
      "/images/products/pateo-kit.jpg",
      "/images/products/pateo-3.svg",
    ],
    difficulty: 1,
    kitIncludes: [
      ...BASE_KIT_ITEMS,
      "Stickers exclusivos de Pateo",
      "Pin coleccionable de Pateo",
      "Carta coleccionable de Pateo",
    ],
    whatsappMessage: "¡Hola! Quiero comprar el kit coleccionable de Pateo el Pato (N.º 002) 🦆",
    animalSlug: "pateo-002",
    inStock: true,
    tags: ["favorito"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
