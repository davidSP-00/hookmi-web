import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-hookmi-coral">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl font-bold text-hookmi-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-hookmi-ink/70">{description}</p>}
    </div>
  );
}
