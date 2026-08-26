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

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — HOOKMI`,
    description: product.shortDescription,
  };
}

export default async function ProductoDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProductGallery
          images={product.images}
          alt={product.name}
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

          <h1 className="font-heading text-4xl font-bold text-hookmi-ink">{product.name}</h1>
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
