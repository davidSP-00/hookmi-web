import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Sparkles } from "lucide-react";
import { getProductBySlug, products } from "@/content/products";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { DifficultyMeter } from "@/components/ui/DifficultyMeter";
import { WhatsAppBuyButton } from "@/components/products/WhatsAppBuyButton";
import { ProductGallery } from "@/components/products/ProductGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_NAME } from "@/lib/constants";
import { SITE_URL, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return pageMetadata({
    title: `${product.name}: kit de crochet amigurumi para principiantes`,
    description: `${product.shortDescription} Kit de crochet con todos los materiales y tutoriales en video para tejer desde cero. Envíos en Perú.`,
    path: `/productos/${product.slug}`,
    image: { url: product.images[0], width: 1400, height: 1400, alt: `Kit de crochet amigurumi ${product.name}` },
  });
}

export default async function ProductoDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const productUrl = absoluteUrl(`/productos/${product.slug}`);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: `${product.name} – Kit de crochet amigurumi`,
    description: product.description,
    sku: product.id,
    image: product.images.filter((src) => !src.endsWith(".svg")).map(absoluteUrl),
    brand: { "@type": "Brand", name: SITE_NAME },
    category: "Kits de crochet y amigurumi",
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: product.price.toFixed(2),
      priceCurrency: product.currency,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      areaServed: { "@type": "Country", name: "Perú" },
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <JsonLd data={productJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Productos", path: "/productos" },
          { name: product.name, path: `/productos/${product.slug}` },
        ])}
      />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProductGallery
          images={product.images}
          alt={`Kit de crochet amigurumi ${product.name}`}
          overlay={
            <span className="absolute left-4 top-4 z-10 rounded-full bg-hookmi-ink px-3 py-1 text-xs font-bold text-white">
              {product.collectionNumber}
            </span>
          }
        />

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyMeter difficulty={product.difficulty} />
            {product.tags?.map((tag) => (
              <Badge key={tag} variant="coral">
                {tag}
              </Badge>
            ))}
            {!product.inStock && <Badge variant="ink">Agotado</Badge>}
          </div>

          <h1 className="font-heading text-4xl font-bold text-hookmi-ink">
            {product.name}
            <span className="mt-1 block text-lg font-semibold text-hookmi-ink/70">
              Kit de crochet amigurumi para principiantes
            </span>
          </h1>
          <p className="font-heading text-2xl font-bold text-hookmi-ink">
            {formatPrice(product.price, product.currency)}
          </p>

          <p className="text-hookmi-ink/80">{product.description}</p>

          <div className="mt-2">
            <WhatsAppBuyButton message={product.whatsappMessage} />
          </div>

          {product.animalSlug && (
            <Link
              href={`/${product.animalSlug}`}
              className="mt-2 text-sm font-semibold text-hookmi-coral underline underline-offset-4"
            >
              Ver tutoriales de {product.name} →
            </Link>
          )}

          <div className="mt-4 rounded-3xl border border-black/5 bg-hookmi-cream p-6">
            <p className="flex items-center gap-2 font-heading text-lg font-bold text-hookmi-ink">
              <Sparkles size={18} className="text-hookmi-coral" /> Tu kit incluye
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.kitIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-hookmi-ink/80">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-hookmi-coral" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
