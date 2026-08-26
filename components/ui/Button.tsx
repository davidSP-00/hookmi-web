import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-2xl border-2 px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50";

const VARIANTS = {
  primary: "border-hookmi-ink bg-hookmi-yellow text-hookmi-ink hover:bg-hookmi-yellow-dark",
  outline: "border-hookmi-ink bg-transparent text-hookmi-ink hover:bg-hookmi-cream",
  whatsapp: "border-hookmi-whatsapp bg-hookmi-whatsapp text-white hover:brightness-95",
} as const;

type Variant = keyof typeof VARIANTS;

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <a className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
