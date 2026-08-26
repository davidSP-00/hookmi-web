import type { ReactNode } from "react";

const VARIANTS = {
  yellow: "bg-hookmi-yellow text-hookmi-ink",
  coral: "bg-hookmi-coral text-white",
  mint: "bg-hookmi-mint text-hookmi-ink",
  ink: "bg-hookmi-ink text-white",
} as const;

export function Badge({
  children,
  variant = "yellow",
}: {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}
