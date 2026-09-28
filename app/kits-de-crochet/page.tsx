import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { BASE_KIT_ITEMS, products } from "@/content/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kits de crochet y tejido para principiantes en Perú",
  description:
    "Kits de crochet y tejido amigurumi para principiantes en Perú: lana, crochet, relleno, ojos de seguridad y tutoriales en video. Aprende a tejer desde cero con todo incluido.",
  path: "/kits-de-crochet",
});

const REASONS = [
  {
    title: "Todo en una sola caja",
    description:
      "No tienes que ir a la mercería ni adivinar qué lana o qué número de crochet comprar. El kit trae exactamente lo que necesitas para tu amigurumi.",
  },
  {
    title: "Pensado para aprender desde cero",
    description:
      "Si nunca has tejido, empiezas con nuestros tutoriales gratis de puntos básicos y luego sigues el video de tu pieza, parte por parte.",
  },
  {
    title: "Un amigurumi terminado de verdad",
    description:
      "Los kits de tejido genéricos suelen dejarte a medias. Los nuestros están diseñados para que termines tu primera pieza y te den ganas de tejer la siguiente.",
  },
  {
    title: "Coleccionables",
    description:
      "Cada HOOKMI es una pieza numerada de la colección, con su propio pin, stickers y carta coleccionable.",
  },
];

const FAQS = [
  {
    question: "¿Cuál es el mejor kit de crochet para principiantes?",
    answer:
      "Uno que incluya todos los materiales (lana, crochet, relleno, ojos de seguridad y aguja lanera) y, sobre todo, instrucciones en video. Aprender solo con un patrón escrito es difícil si nunca has tejido; con videos paso a paso puedes pausar y repetir cada punto.",
  },
  {
    question: "¿Qué diferencia hay entre un kit de tejido y un kit de crochet?",
    answer:
      "\"Tejido\" es la palabra general: se puede tejer con palillos (dos agujas) o con crochet (una aguja con gancho). Nuestros kits de tejido son de crochet porque es la técnica más fácil para empezar y la que se usa para tejer amigurumis.",
  },
  {
    question: "¿Cuánto tiempo toma terminar un amigurumi del kit?",
    answer:
      "Depende de tu ritmo. La mayoría de personas que empiezan desde cero lo terminan en algunos días tejiendo un rato cada día. Como los videos están divididos por partes, puedes avanzar poco a poco.",
  },
  {
    question: "¿Dónde comprar un kit de crochet en Perú?",
    answer:
      "Puedes comprar tu kit de crochet HOOKMI directamente por WhatsApp. Coordinamos contigo el pago y el envío dentro del Perú.",
  },
];

export default function KitsDeCrochetPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Kits de crochet", path: "/kits-de-crochet" },
        ])}
      />

      <SectionHeading
        as="h1"
        eyebrow="Kits de tejido para principiantes"
        title="Kits de crochet para aprender a tejer en Perú"
        description="Un kit de crochet HOOKMI trae todo lo que necesitas para tejer tu primer amigurumi desde cero: materiales de calidad, herramientas y tutoriales en video paso a paso."
      />

      <div className="mt-12">
        <ProductGrid products={products} />
      </div>

      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink sm:text-3xl">
          ¿Qué trae un kit de crochet HOOKMI?
        </h2>
        <p className="mt-3 text-hookmi-ink/70">
          Cada kit de amigurumi incluye los mismos materiales base, más los coleccionables
          exclusivos de su personaje:
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {BASE_KIT_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-hookmi-ink/80">
              <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-hookmi-coral" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="text-center font-heading text-2xl font-bold text-hookmi-ink sm:text-3xl">
          Por qué elegir un kit de crochet HOOKMI
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <div key={reason.title} className="rounded-3xl border border-black/5 bg-hookmi-cream p-6">
              <h3 className="font-heading text-lg font-bold text-hookmi-ink">{reason.title}</h3>
              <p className="mt-2 text-sm text-hookmi-ink/70">{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink sm:text-3xl">
          Preguntas frecuentes sobre kits de crochet
        </h2>
        <div className="mt-6 flex flex-col gap-6">
          {FAQS.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-bold text-hookmi-ink">{faq.question}</h3>
              <p className="mt-1 text-sm text-hookmi-ink/70">{faq.answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-hookmi-ink/70">
          ¿Aún no sabes nada de crochet? Empieza por nuestra{" "}
          <Link href="/aprende-a-tejer-crochet" className="font-bold text-hookmi-ink underline">
            guía para aprender a tejer desde cero
          </Link>{" "}
          o mira los{" "}
          <Link href="/tutoriales" className="font-bold text-hookmi-ink underline">
            tutoriales gratis de puntos básicos
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-3xl text-center">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink sm:text-3xl">
          ¿No sabes qué kit elegir?
        </h2>
        <p className="mt-3 text-hookmi-ink/70">
          Escríbenos por WhatsApp y te ayudamos a elegir tu primer kit de crochet.
        </p>
        <div className="mt-6">
          <LinkButton href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" variant="whatsapp">
            <MessageCircle size={18} /> Escríbenos por WhatsApp
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
