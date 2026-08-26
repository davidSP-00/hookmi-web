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
  "Crochet (aguja de tejer)",
  "Aguja lanera para armar",
  "Ojos de seguridad",
  "Separador de puntos",
  "Relleno de fibra siliconada",
];

export const products: Product[] = [
  {
    id: "prod-henry-001",
    slug: "henry",
    name: "Henry el Ratón",
    collectionNumber: "N.º 001",
    price: 60,
    currency: "PEN",
    shortDescription:
      "La pieza N.º 001 de la colección HOOKMI: un ratoncito de orejas redondas y bigotes traviesos.",
    description:
      "Conoce a Henry, la primera pieza de la colección HOOKMI. Este kit coleccionable trae todo lo que necesitas para tejer tu propio ratoncito de crochet desde cero, sin experiencia previa: lana antialérgica, herramientas y tutoriales en video para cada parte de su cuerpo. Al terminarlo no solo tendrás un amigurumi hecho por ti, sino también tu pin y stickers exclusivos de Henry para lucir en tu mochila, agenda o donde quieras.",
    images: [
      "/images/products/henry.svg",
      "/images/products/henry-2.svg",
      "/images/products/henry-3.svg",
    ],
    difficulty: 1,
    kitIncludes: [
      ...BASE_KIT_ITEMS,
      "Stickers exclusivos de Henry",
      "Pin coleccionable de Henry",
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
    price: 65,
    currency: "PEN",
    shortDescription:
      "La pieza N.º 002 de la colección HOOKMI: un patito con un pico enorme de personalidad.",
    description:
      "Pateo es la segunda pieza de la colección HOOKMI: un pato tierno con un pico grande y unas alas curiosas que le dan todo su carácter. El kit trae absolutamente todo lo necesario para tejerlo —lana antialérgica, herramientas y tutoriales paso a paso— más sus stickers exclusivos y el pin coleccionable de Pateo, pensados para que cada kit se sienta como una pieza única que quieras coleccionar.",
    images: [
      "/images/products/pateo.svg",
      "/images/products/pateo-2.svg",
      "/images/products/pateo-3.svg",
    ],
    difficulty: 1,
    kitIncludes: [
      ...BASE_KIT_ITEMS,
      "Stickers exclusivos de Pateo",
      "Pin coleccionable de Pateo",
    ],
    whatsappMessage: "¡Hola! Quiero comprar el kit coleccionable de Pateo el Pato (N.º 002) 🦆",
    animalSlug: "pateo-002",
    inStock: true,
    tags: ["favorito"],
  },
  {
    id: "prod-boo-003",
    slug: "boo",
    name: "Boo el Fantasma",
    collectionNumber: "N.º 003",
    price: 70,
    currency: "PEN",
    shortDescription:
      "La pieza N.º 003 de la colección HOOKMI: un fantasmita adorable, más dulce que espeluznante.",
    description:
      "Boo es la tercera pieza de la colección HOOKMI: un fantasma de forma redondeada y mirada tierna, ideal para coleccionar todo el año. El kit incluye todas las herramientas y materiales para armarlo de principio a fin, tutoriales completos en video, y por supuesto, sus stickers exclusivos y pin coleccionable de Boo para sumar a tu colección.",
    images: [
      "/images/products/boo.svg",
      "/images/products/boo-2.svg",
      "/images/products/boo-3.svg",
    ],
    difficulty: 1,
    kitIncludes: [
      ...BASE_KIT_ITEMS,
      "Stickers exclusivos de Boo",
      "Pin coleccionable de Boo",
    ],
    whatsappMessage: "¡Hola! Quiero comprar el kit coleccionable de Boo el Fantasma (N.º 003) 👻",
    animalSlug: "boo-003",
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
