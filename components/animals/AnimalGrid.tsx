import type { Animal } from "@/content/animals";
import { AnimalCard } from "@/components/animals/AnimalCard";

export function AnimalGrid({ animals }: { animals: Animal[] }) {
  if (animals.length === 0) {
    return <p className="text-center text-hookmi-ink/60">Pronto habrá nuevos tutoriales.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}
