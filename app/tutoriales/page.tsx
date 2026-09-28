import type { Metadata } from "next";
import Link from "next/link";
import { animals } from "@/content/animals";
import { basicTutorials } from "@/content/basics";
import { AnimalGrid } from "@/components/animals/AnimalGrid";
import { VideoSectionAccordion } from "@/components/animals/VideoSectionAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tutoriales de crochet gratis para aprender a tejer desde cero",
  description:
    "Aprende a tejer crochet desde cero con tutoriales en video gratis: cómo agarrar la lana, cadeneta, anillo mágico, aumentos y disminuciones para tu primer amigurumi.",
  path: "/tutoriales",
});

const tutorialsListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tutoriales básicos de crochet para principiantes",
  itemListElement: basicTutorials.map((tutorial, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tutorial.title,
    description: tutorial.description,
    url: absoluteUrl(`/tutoriales#${tutorial.id}`),
  })),
};

export default function TutorialesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <JsonLd data={tutorialsListJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Tutoriales", path: "/tutoriales" },
        ])}
      />

      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-hookmi-coral">
          Gratis para todos
        </p>
        <h1 className="font-heading text-3xl font-bold text-hookmi-ink sm:text-4xl">
          ¿Nunca has tejido crochet? Aprende desde cero
        </h1>
        <p className="mt-3 text-hookmi-ink/70">
          Aquí vas a aprender a tejer desde cero y sin apuro: cómo agarrar la lana, hacer una
          cadeneta, el anillo mágico, aumentos y disminuciones. Mira cada video las veces que
          necesites, a tu ritmo.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <VideoSectionAccordion sections={basicTutorials} />
      </div>

      <section className="mx-auto mt-16 max-w-2xl">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink">
          Qué aprenderás en cada tutorial de crochet
        </h2>
        <ol className="mt-6 flex flex-col gap-6">
          {basicTutorials.map((tutorial, index) => (
            <li key={tutorial.id} id={tutorial.id}>
              <h3 className="font-bold text-hookmi-ink">
                {index + 1}. {tutorial.title}
              </h3>
              <p className="mt-1 text-sm text-hookmi-ink/70">{tutorial.description}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-hookmi-ink/70">
          ¿Quieres entender el camino completo antes de empezar? Lee nuestra{" "}
          <Link href="/aprende-a-tejer-crochet" className="font-bold text-hookmi-ink underline">
            guía para aprender a tejer crochet desde cero
          </Link>
          .
        </p>
      </section>

      <div className="mt-24">
        <SectionHeading
          eyebrow="Tutoriales por kit"
          title="Elige tu HOOKMI"
          description="Cada pieza trae su propio tutorial completo, guardadito y protegido con el código que viene dentro de tu kit."
        />

        <div className="mt-12">
          <AnimalGrid animals={animals} />
        </div>
      </div>
    </div>
  );
}
