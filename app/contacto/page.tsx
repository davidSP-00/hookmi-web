import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto — HOOKMI",
  description: "Escríbenos por WhatsApp para consultas sobre productos, envíos o tus tutoriales.",
};

const FAQS = [
  {
    question: "¿Cómo compro un kit?",
    answer: "Elige tu kit favorito en la sección de productos y presiona \"Comprar por WhatsApp\". Te ayudamos a coordinar el pago y el envío por ese medio.",
  },
  {
    question: "¿Dónde encuentro el código de mis videos?",
    answer: "Está en la tarjeta que viene dentro de la caja de tu kit, con el formato XXXX-XXXX. Ingrésalo en la página de tu HOOKMI para desbloquear todos los tutoriales y el PDF.",
  },
  {
    question: "¿Cuánto demora el envío?",
    answer: "Los tiempos varían según tu ubicación. Escríbenos por WhatsApp y te confirmamos el plazo estimado para tu compra.",
  },
];

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeading
        eyebrow="Contacto"
        title="Hablemos por WhatsApp"
        description="Es el canal más rápido para resolver dudas sobre productos, envíos o tus tutoriales."
      />

      <div className="mt-8 flex justify-center">
        <LinkButton href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" variant="whatsapp">
          <MessageCircle size={18} /> Escríbenos por WhatsApp
        </LinkButton>
      </div>

      <div className="mt-16">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink">Preguntas frecuentes</h2>
        <div className="mt-6 flex flex-col gap-6">
          {FAQS.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-bold text-hookmi-ink">{faq.question}</h3>
              <p className="mt-1 text-sm text-hookmi-ink/70">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
