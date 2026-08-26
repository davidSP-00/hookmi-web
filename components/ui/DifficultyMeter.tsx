import { difficultyLabel, type Difficulty } from "@/lib/difficulty";

export function DifficultyMeter({ difficulty }: { difficulty: Difficulty }) {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            className={`h-2.5 w-2.5 rounded-full ${
              step <= difficulty ? "bg-hookmi-coral" : "bg-black/10"
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-bold uppercase tracking-wide text-hookmi-ink/70">
        {difficultyLabel(difficulty)}
      </span>
    </div>
  );
}
