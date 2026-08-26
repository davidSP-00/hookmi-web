"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CODE_LENGTH = 8; // 4 + 4, sin contar el guion
const CODE_PATTERN = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;

function formatCode(raw: string): string {
  const upper = raw.toUpperCase();
  const clean = upper.replace(/[^A-Z0-9]/g, "").slice(0, CODE_LENGTH);

  if (clean.length <= 4) {
    // Respeta el guion si el usuario lo escribió a mano (modo manual);
    // si no lo escribió, se inserta solo al llegar al 5º carácter (modo automático).
    const typedTrailingDash = clean.length > 0 && upper.trimEnd().endsWith("-");
    return typedTrailingDash ? `${clean}-` : clean;
  }

  return `${clean.slice(0, 4)}-${clean.slice(4)}`;
}

export function PasswordGateForm({ slug }: { slug: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isComplete = CODE_PATTERN.test(code);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCode(formatCode(event.target.value));
    if (error) setError(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isComplete) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, password: code }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Código incorrecto.");
        setLoading(false);
        return;
      }

      // Vuelve a ejecutar el Server Component: al leer la cookie recién
      // seteada, renderizará el contenido desbloqueado con las URLs reales.
      router.refresh();
    } catch {
      setError("Ocurrió un error. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex max-w-sm flex-col gap-3 rounded-3xl border border-black/10 bg-hookmi-cream p-6"
    >
      <label htmlFor="unlock-code" className="flex items-center gap-2 text-sm font-bold text-hookmi-ink">
        <KeyRound size={16} /> Código del kit
      </label>

      <input
        id="unlock-code"
        type="text"
        inputMode="text"
        value={code}
        onChange={handleChange}
        placeholder="XXXX-XXXX"
        maxLength={9}
        autoCapitalize="characters"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-center font-mono text-lg uppercase tracking-[0.25em] outline-none focus:border-hookmi-yellow-dark"
        required
      />

      <p className="text-xs text-hookmi-ink/60">
        Está en la tarjeta que viene dentro de la caja de tu kit, formato XXXX-XXXX.
      </p>

      {error && <p className="text-sm font-semibold text-hookmi-coral">{error}</p>}

      <Button type="submit" disabled={loading || !isComplete}>
        {loading ? "Verificando..." : "Desbloquear tutoriales"}
      </Button>
    </form>
  );
}
