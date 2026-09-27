import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type LearningStepProps = {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
};

// En móvil el contenido (videos, botones) ocupa todo el ancho; a partir de
// "sm" queda sangrado a la derecha del número, como en una línea de tiempo.
export function LearningStep({ number, icon: Icon, title, description, children }: LearningStepProps) {
  return (
    <div className="grid grid-cols-[2.25rem_1fr] gap-x-3 sm:gap-x-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-hookmi-coral font-heading text-lg font-bold text-white">
        {number}
      </div>
      <div className="self-center">
        <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-hookmi-ink">
          <Icon className="flex-shrink-0 text-hookmi-coral" size={20} /> {title}
        </h3>
      </div>
      <div className="col-span-2 sm:col-span-1 sm:col-start-2">
        <p className="mt-2 text-sm text-hookmi-ink/70 sm:mt-1">{description}</p>
        <div className="mt-4 flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}
