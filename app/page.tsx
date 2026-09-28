import type { Metadata } from "next";
import { LifeBuoy, MessageCircle, Package, Sparkles, Video } from "lucide-react";
import { products } from "@/content/products";
import { animals } from "@/content/animals";
import { ProductGrid } from "@/components/products/ProductGrid";
import { AnimalGrid } from "@/components/animals/AnimalGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "HOOKMI | Kits de crochet y amigurumi para principiantes en Perú",
  absoluteTitle: true,
  description:
    "Kits de crochet y amigurumi para principiantes en Perú: lana, crochet, relleno y tutoriales en video para aprender a tejer desde cero. Pin y stickers coleccionables en cada kit.",
  path: "/",
});

const HOME_FAQS = [
  {
    question: "¿Qué es un kit de crochet?",
    answer:
      "Es una caja con todo lo necesario para tejer una pieza a crochet: lana, crochet (ganchillo), aguja lanera, ojos de seguridad, relleno y las instrucciones. En HOOKMI cada kit incluye además tutoriales en video paso a paso y un patrón en PDF, para que tejas tu amigurumi sin comprar nada aparte.",
  },
  {
    question: "¿Puedo aprender a tejer crochet desde cero con un kit HOOKMI?",
    answer:
      "Sí. Nuestros kits están pensados para personas que nunca han tejido. Primero aprendes los puntos básicos con nuestros tutoriales gratis (cadeneta, anillo mágico, aumentos y disminuciones) y luego sigues el video de tu amigurumi parte por parte.",
  },
  {
    question: "¿Qué es un amigurumi?",
    answer:
      "Amigurumi es la técnica japonesa de tejer muñequitos y animalitos a crochet, rellenos y con forma redonda. Es uno de los proyectos más populares para empezar a tejer porque usa pocos puntos y el resultado es muy satisfactorio.",
  },
  {
    question: "¿Hacen envíos en Perú?",
    answer:
      "Sí, vendemos nuestros kits de crochet en Perú. Compras por WhatsApp y coordinamos contigo el pago y el envío a tu ciudad.",
  },
];

export default function HomePage() {
  return (
    <div>
      <JsonLd data={faqJsonLd(HOME_FAQS)} />
      <section className="bg-hookmi-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-hookmi-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-hookmi-ink">
            <Sparkles size={14} /> Perfecto para principiantes
          </span>

          <h1 className="max-w-2xl font-heading text-4xl font-bold text-hookmi-ink sm:text-6xl">
            Kits de crochet para tejer tu propio amigurumi desde cero
          </h1>

          <p className="max-w-xl text-lg text-hookmi-ink/80">
            No es solo un amigurumi: es tu próxima pieza de colección. Cada kit trae
            todo lo que necesitas para tejerlo desde cero —lana, herramientas y
            tutoriales en video. Sin experiencia previa, a tu ritmo,
            hoy mismo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <LinkButton href="/productos" variant="primary">
              Ver la colección completa
            </LinkButton>
            <LinkButton href="/tutoriales" variant="outline">
              <Video size={18} /> Ver tutoriales gratis
            </LinkButton>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2 text-center">
              <Package className="text-hookmi-coral" size={22} />
              <p className="text-sm font-bold text-hookmi-ink">Kit 100% completo</p>
              <p className="text-xs text-hookmi-ink/70">
                Lana antialérgica, crochet, aguja, ojos de seguridad, separador de puntos y relleno.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Video className="text-hookmi-coral" size={22} />
              <p className="text-sm font-bold text-hookmi-ink">Tutoriales en video bien explicados</p>
              <p className="text-xs text-hookmi-ink/70">
                Un video paso a paso para cada parte de tu amigurumi, fácil de seguir aunque sea tu primera vez.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <LifeBuoy className="text-hookmi-coral" size={22} />
              <p className="text-sm font-bold text-hookmi-ink">Ayuda cuando la necesites</p>
              <p className="text-xs text-hookmi-ink/70">
                ¿Te atoras en un paso? Escríbenos por WhatsApp o email y te acompañamos hasta terminar tu pieza.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Colección completa"
          title="Elige tu HOOKMI"
          description="Cada kit incluye materiales premium, herramientas, tutoriales y tus stickers + pin coleccionables exclusivos."
        />
        <div className="mt-12">
          <ProductGrid products={products.slice(0, 3)} />
        </div>
        <div className="mt-10 text-center">
          <LinkButton href="/productos" variant="outline">
            Ver todos los productos
          </LinkButton>
        </div>
      </section>

      <section className="bg-hookmi-cream">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading
            eyebrow="Tutoriales"
            title="Mira cómo se teje cada HOOKMI"
            description="Aprende las técnicas básicas gratis y luego desbloquea el tutorial completo con el código de tu kit."
          />
          <div className="mt-12">
            <AnimalGrid animals={animals.slice(0, 3)} />
          </div>
          <div className="mt-10 text-center">
            <LinkButton href="/tutoriales" variant="outline">
              Ver todos los tutoriales
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <SectionHeading eyebrow="Preguntas frecuentes" title="Aprende a tejer crochet con tu primer kit" />
        <div className="mt-10 flex flex-col gap-6">
          {HOME_FAQS.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-bold text-hookmi-ink">{faq.question}</h3>
              <p className="mt-1 text-sm text-hookmi-ink/70">{faq.answer}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LinkButton href="/aprende-a-tejer-crochet" variant="outline">
            Guía: aprende a tejer desde cero
          </LinkButton>
          <LinkButton href="/kits-de-crochet" variant="outline">
            ¿Qué trae un kit de crochet?
          </LinkButton>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20 text-center">
        <h2 className="font-heading text-3xl font-bold text-hookmi-ink">
          ¿Tienes dudas antes de comprar?
        </h2>
        <p className="mt-3 text-hookmi-ink/70">
          Escríbenos por WhatsApp y te ayudamos a elegir el kit ideal para empezar.
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
