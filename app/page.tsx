import { Award, Gauge, MessageCircle, Package, Sparkles, Video } from "lucide-react";
import { products } from "@/content/products";
import { animals } from "@/content/animals";
import { ProductGrid } from "@/components/products/ProductGrid";
import { AnimalGrid } from "@/components/animals/AnimalGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function HomePage() {
  return (
    <div>
      <section className="bg-hookmi-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 py-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-hookmi-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-hookmi-ink">
            <Sparkles size={14} /> Perfecto para principiantes
          </span>

          <h1 className="max-w-2xl font-heading text-4xl font-bold text-hookmi-ink sm:text-6xl">
            Teje, crea y colecciona tu propio amigurumi
          </h1>

          <p className="max-w-xl text-lg text-hookmi-ink/80">
            Cada kit HOOKMI es una pieza de colección numerada: trae todo lo que
            necesitas para tejerla desde cero, más stickers exclusivos y un pin
            coleccionable único. Sin experiencia previa, a tu ritmo.
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
              <Gauge className="text-hookmi-coral" size={22} />
              <p className="text-sm font-bold text-hookmi-ink">Dificultad a la vista</p>
              <p className="text-xs text-hookmi-ink/70">
                Cada pieza indica su nivel: principiante, intermedio o avanzado.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Award className="text-hookmi-coral" size={22} />
              <p className="text-sm font-bold text-hookmi-ink">Pieza de colección</p>
              <p className="text-xs text-hookmi-ink/70">
                Stickers exclusivos y pin coleccionable único en cada kit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Colección completa"
          title="Elige tu próxima pieza"
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
            title="Mira cómo se teje cada animal"
            description="Aprende las técnicas básicas gratis y luego desbloquea el tutorial completo de tu animal con la contraseña de tu kit."
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

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
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
