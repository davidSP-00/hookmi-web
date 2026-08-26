import { LifeBuoy, Mail, PartyPopper } from "lucide-react";
import { SUPPORT_EMAIL } from "@/lib/constants";
import { buildWhatsAppLink, formatWhatsAppDisplay } from "@/lib/whatsapp";

export function UnlockedCelebration({ animalName }: { animalName: string }) {
  const helpMessage = `¡Hola! Necesito ayuda con el tutorial de ${animalName} 🧶`;

  return (
    <div className="mt-10 flex flex-col gap-6">
      <div className="rounded-3xl border border-black/5 bg-white p-6 text-center">
        <p className="flex items-center justify-center gap-2 font-heading text-lg font-bold text-hookmi-ink">
          <LifeBuoy size={20} className="text-hookmi-coral" /> ¿Necesitas ayuda?
        </p>
        <p className="mt-2 text-sm text-hookmi-ink/70">
          Escríbenos a{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-1 font-semibold text-hookmi-coral underline underline-offset-4"
          >
            <Mail size={14} /> {SUPPORT_EMAIL}
          </a>{" "}
          o por WhatsApp al{" "}
          <a
            href={buildWhatsAppLink(helpMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-hookmi-coral underline underline-offset-4"
          >
            {formatWhatsAppDisplay()}
          </a>
          .
        </p>
      </div>

      <div className="rounded-3xl bg-hookmi-yellow p-8 text-center">
        <PartyPopper className="mx-auto text-hookmi-ink" size={36} />
        <p className="mt-3 font-heading text-2xl font-bold text-hookmi-ink">
          ¡Felicidades, lo conseguiste!
        </p>
        <p className="mx-auto mt-2 max-w-md text-hookmi-ink/80">
          Tejiste a {animalName} con tus propias manos, puntada a puntada. Desde hoy ya no es
          solo un amigurumi: es una pieza de tu colección HOOKMI y, un poquito, parte de tu
          familia. 💛
        </p>
      </div>
    </div>
  );
}
