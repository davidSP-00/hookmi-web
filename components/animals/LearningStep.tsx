import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type LearningStepProps = {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
};

export function LearningStep({ number, icon: Icon, title, description, children }: LearningStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-shrink-0 h-9 w-9 items-center justify-center rounded-full bg-hookmi-coral font-heading text-lg font-bold text-white">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-hookmi-ink">
          <Icon className="text-hookmi-coral" size={20} /> {title}
        </h3>
        <p className="mt-1 text-sm text-hookmi-ink/70">{description}</p>
        <div className="mt-4 flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}
