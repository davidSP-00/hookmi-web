import type { Metadata } from "next";
import { products } from "@/content/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Comprar kits de crochet y amigurumi en Perú",
  description:
    "Compra tu kit de crochet HOOKMI en Perú: amigurumis coleccionables con lana, crochet, relleno, ojos de seguridad y tutoriales en video para tejer desde cero.",
  path: "/productos",
});

const productListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kits de crochet HOOKMI",
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: absoluteUrl(`/productos/${product.slug}`),
    name: product.name,
  })),
};

export default function ProductosPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <JsonLd data={productListJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Productos", path: "/productos" },
        ])}
      />
      <SectionHeading
        as="h1"
        eyebrow="Kits de crochet HOOKMI"
        title="Elige tu kit de amigurumi"
        description="Cada kit de crochet es una pieza numerada de la colección: trae todos los materiales y herramientas para tejerla, tutoriales paso a paso, y sus stickers + pin coleccionables exclusivos."
      />

      <div className="mt-12">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
