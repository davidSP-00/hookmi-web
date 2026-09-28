import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  // Usar "h1" cuando es el título principal de la página (una sola vez por página, clave para SEO).
  as?: "h1" | "h2";
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-hookmi-coral">
          {eyebrow}
        </p>
      )}
      <Heading className="font-heading text-3xl font-bold text-hookmi-ink sm:text-4xl">{title}</Heading>
      {description && <p className="mt-3 text-hookmi-ink/70">{description}</p>}
    </div>
  );
}
