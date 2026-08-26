import "server-only";

import { animals } from "@/content/animals";
import { animalsSecure } from "@/content/animals.secure";
import { products } from "@/content/products";
import { RESERVED_SLUGS } from "@/lib/constants";

// Corre estas validaciones en build (import este módulo desde un route
// segment, o ejecútalas manualmente) para detectar contenido mal cargado
// antes de que llegue a producción.
export function validateContent(): void {
  const errors: string[] = [];

  const animalSlugs = new Set<string>();
  for (const animal of animals) {
    if (animalSlugs.has(animal.slug)) {
      errors.push(`Slug de animal duplicado: "${animal.slug}"`);
    }
    animalSlugs.add(animal.slug);

    if ((RESERVED_SLUGS as readonly string[]).includes(animal.slug)) {
      errors.push(
        `El slug de animal "${animal.slug}" choca con una ruta reservada (${RESERVED_SLUGS.join(", ")}).`
      );
    }

    const secure = animalsSecure.find((s) => s.slug === animal.slug);
    if (!secure) {
      errors.push(`Falta contraparte en animals.secure.ts para el slug "${animal.slug}".`);
      continue;
    }

    if (secure.sections.length !== animal.sectionsMeta.length) {
      errors.push(
        `"${animal.slug}": sectionsMeta (${animal.sectionsMeta.length}) y sections seguras (${secure.sections.length}) no calzan en cantidad.`
      );
      continue;
    }

    animal.sectionsMeta.forEach((meta, index) => {
      if (meta.title !== secure.sections[index]?.title) {
        errors.push(
          `"${animal.slug}": sección #${index} no calza en orden/título ("${meta.title}" vs "${secure.sections[index]?.title}").`
        );
      }
    });
  }

  const productSlugs = new Set<string>();
  for (const product of products) {
    if (productSlugs.has(product.slug)) {
      errors.push(`Slug de producto duplicado: "${product.slug}"`);
    }
    productSlugs.add(product.slug);

    if (product.animalSlug && !animalSlugs.has(product.animalSlug)) {
      errors.push(
        `Producto "${product.slug}" referencia animalSlug "${product.animalSlug}" que no existe.`
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(`Errores de contenido:\n- ${errors.join("\n- ")}`);
  }
}
