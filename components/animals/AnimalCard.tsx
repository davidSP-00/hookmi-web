import Image from "next/image";
import Link from "next/link";
import type { Animal } from "@/content/animals";
import { DifficultyMeter } from "@/components/ui/DifficultyMeter";

export function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <Link
      href={`/${animal.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-hookmi-cream">
        <Image
          src={animal.coverImage}
          alt={animal.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <DifficultyMeter difficulty={animal.difficulty} />

        <h3 className="font-heading text-lg font-bold text-hookmi-ink">{animal.name}</h3>
        <p className="line-clamp-2 text-sm text-hookmi-ink/70">{animal.description}</p>
      </div>
    </Link>
  );
}
