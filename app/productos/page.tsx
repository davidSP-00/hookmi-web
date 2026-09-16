import type { Metadata } from "next";
import { products } from "@/content/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Productos — HOOKMI",
  description: "Explora la colección completa de kits de crochet coleccionables de HOOKMI.",
};

export default function ProductosPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="Colección HOOKMI"
        title="Elige tu HOOKMI"
        description="Cada kit es una pieza numerada de la colección: trae todos los materiales y herramientas para tejerla, tutoriales paso a paso, y sus stickers + pin coleccionables exclusivos."
      />

      <div className="mt-12">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
