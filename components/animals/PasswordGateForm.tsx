"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PasswordGateForm({ slug }: { slug: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Contraseña incorrecta.");
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
      <label htmlFor="password" className="flex items-center gap-2 text-sm font-bold text-hookmi-ink">
        <Lock size={16} /> Contraseña del kit
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Contraseña incluida en tu caja"
        className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm outline-none focus:border-hookmi-yellow-dark"
        required
      />
      {error && <p className="text-sm font-semibold text-hookmi-coral">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Verificando..." : "Desbloquear tutoriales"}
      </Button>
    </form>
  );
}
