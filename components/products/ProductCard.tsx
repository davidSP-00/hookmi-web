import Image from "next/image";
import Link from "next/link";
import { Images, Sparkles } from "lucide-react";
import type { Product } from "@/content/products";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { DifficultyMeter } from "@/components/ui/DifficultyMeter";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-hookmi-cream">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-hookmi-ink px-3 py-1 text-xs font-bold text-white">
          {product.collectionNumber}
        </span>
        {!product.inStock && (
          <span className="absolute right-3 top-3 z-10">
            <Badge variant="ink">Agotado</Badge>
          </span>
        )}
        {product.images.length > 1 && (
          <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-bold text-white">
            <Images size={12} /> {product.images.length}
          </span>
        )}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyMeter difficulty={product.difficulty} />
          {product.tags?.map((tag) => (
            <Badge key={tag} variant="coral">
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="font-heading text-lg font-bold text-hookmi-ink">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-hookmi-ink/70">{product.shortDescription}</p>

        <p className="inline-flex items-center gap-1 text-xs font-semibold text-hookmi-coral">
          <Sparkles size={12} /> Incluye pin + stickers coleccionables
        </p>

        <p className="mt-auto pt-2 font-heading text-xl font-bold text-hookmi-ink">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
