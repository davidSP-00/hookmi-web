import type { Metadata } from "next";
import Link from "next/link";
import { basicTutorials } from "@/content/basics";
import { LinkButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  DEFAULT_OG_IMAGE,
  SITE_URL,
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
} from "@/lib/seo";

const TITLE = "Cómo aprender a tejer crochet desde cero: guía para principiantes";
const DESCRIPTION =
  "Guía para aprender a tejer crochet desde cero: qué materiales necesitas, los puntos básicos paso a paso, cómo tejer tu primer amigurumi y los errores más comunes al empezar.";
const PUBLISHED = "2026-09-28";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/aprende-a-tejer-crochet",
});

const MATERIALS = [
  {
    name: "Lana o hilo",
    description:
      "Para empezar, elige una lana lisa y de color claro: así ves bien cada punto. Evita las lanas peludas o muy delgadas en tu primer proyecto.",
  },
  {
    name: "Crochet (ganchillo)",
    description:
      "Es la aguja con gancho en la punta. Uno de 4 mm con mango ergonómico es ideal para aprender, porque es cómodo y funciona con lanas de grosor medio.",
  },
  {
    name: "Aguja lanera",
    description: "Una aguja de punta roma y ojo grande para coser las partes de tu amigurumi y esconder las hebras.",
  },
  {
    name: "Marcador de puntos",
    description:
      "Un separador que pones en el primer punto de cada vuelta para no perder la cuenta. Es la herramienta que más ayuda a un principiante.",
  },
  {
    name: "Relleno y ojos de seguridad",
    description: "Solo si vas a tejer amigurumis: fibra siliconada para darles volumen y ojos con traba para que queden firmes.",
  },
];

const MISTAKES = [
  {
    title: "Tejer demasiado apretado",
    description:
      "Es el error número uno al empezar. Si te cuesta meter el crochet en el punto, suelta un poco la lana que pasa entre tus dedos.",
  },
  {
    title: "Perder la cuenta de los puntos",
    description:
      "En amigurumi cada vuelta tiene un número exacto de puntos. Usa el marcador al inicio de cada vuelta y cuenta al terminarla.",
  },
  {
    title: "Empezar con un proyecto muy difícil",
    description:
      "Un amigurumi pequeño y redondito es el mejor primer proyecto: usa pocos puntos y ves el resultado rápido.",
  },
  {
    title: "Aprender solo con patrones escritos",
    description:
      "Las abreviaturas de los patrones confunden al principio. Ver un video y pausarlo en cada paso hace que aprender sea mucho más fácil.",
  },
];

const FAQS = [
  {
    question: "¿Es difícil aprender a tejer crochet?",
    answer:
      "No. Con solo tres o cuatro puntos básicos (cadeneta, punto bajo, aumento y disminución) ya puedes tejer un amigurumi completo. Lo más importante es practicar la tensión de la lana al inicio.",
  },
  {
    question: "¿Cuánto tiempo toma aprender a tejer crochet desde cero?",
    answer:
      "En una o dos tardes de práctica puedes dominar los puntos básicos. Tu primer amigurumi puede estar listo en pocos días si tejes un rato cada día.",
  },
  {
    question: "¿Qué es más fácil para empezar, crochet o palillos?",
    answer:
      "Para la mayoría de principiantes el crochet es más fácil: se usa una sola aguja, solo tienes un punto activo a la vez y es más difícil que el tejido se desarme.",
  },
  {
    question: "¿Qué puedo tejer primero?",
    answer:
      "Un amigurumi pequeño es ideal: practicas el anillo mágico, los aumentos y las disminuciones en un proyecto corto y terminas con una pieza que puedes regalar o coleccionar.",
  },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  image: absoluteUrl(DEFAULT_OG_IMAGE.url),
  inLanguage: "es-PE",
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: absoluteUrl("/aprende-a-tejer-crochet"),
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function AprendeATejerPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Aprende a tejer crochet", path: "/aprende-a-tejer-crochet" },
        ])}
      />

      <header className="text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-widest text-hookmi-coral">
          Guía para principiantes
        </p>
        <h1 className="font-heading text-3xl font-bold text-hookmi-ink sm:text-5xl">
          Cómo aprender a tejer crochet desde cero
        </h1>
        <p className="mt-4 text-lg text-hookmi-ink/80">
          Si nunca has tomado un crochet, esta guía es para ti. Te explicamos qué materiales
          necesitas, los puntos básicos que debes aprender primero y cómo tejer tu primer
          amigurumi, paso a paso y sin frustrarte.
        </p>
      </header>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink sm:text-3xl">
          ¿Qué es el crochet?
        </h2>
        <p className="mt-3 text-hookmi-ink/80">
          El crochet (también llamado ganchillo) es una forma de tejido que usa una sola aguja con
          un gancho en la punta. Con ese gancho vas enlazando la lana para formar puntos que, uno
          tras otro, crean una tela. Es distinto del tejido a palillos, que usa dos agujas. Con
          crochet se tejen mantas, bolsos, ropa y, sobre todo, <strong>amigurumis</strong>: los
          muñequitos tejidos de origen japonés, redondos y rellenos.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink sm:text-3xl">
          Materiales para aprender a tejer crochet
        </h2>
        <dl className="mt-6 flex flex-col gap-5">
          {MATERIALS.map((material) => (
            <div key={material.name}>
              <dt className="font-bold text-hookmi-ink">{material.name}</dt>
              <dd className="mt-1 text-sm text-hookmi-ink/70">{material.description}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-hookmi-ink/70">
          Si no quieres comprar todo por separado, un{" "}
          <Link href="/kits-de-crochet" className="font-bold text-hookmi-ink underline">
            kit de crochet para principiantes
          </Link>{" "}
          trae todos estos materiales juntos y en las cantidades justas.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink sm:text-3xl">
          Los puntos básicos de crochet, en orden
        </h2>
        <p className="mt-3 text-hookmi-ink/80">
          Aprende estas técnicas en este orden. Cada una tiene su video gratis en nuestra página de{" "}
          <Link href="/tutoriales" className="font-bold text-hookmi-ink underline">
            tutoriales de crochet
          </Link>
          .
        </p>
        <ol className="mt-6 flex flex-col gap-6">
          {basicTutorials.map((tutorial, index) => (
            <li key={tutorial.id}>
              <h3 className="font-bold text-hookmi-ink">
                Paso {index + 1}: {tutorial.title}
              </h3>
              <p className="mt-1 text-sm text-hookmi-ink/70">{tutorial.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink sm:text-3xl">
          Tu primer proyecto: un amigurumi
        </h2>
        <p className="mt-3 text-hookmi-ink/80">
          Cuando ya sabes hacer el anillo mágico, aumentos y disminuciones, estás lista o listo para
          tu primer amigurumi. Casi todos se tejen igual: cada parte (cuerpo, orejas, patitas) empieza
          con un anillo mágico, crece con aumentos, se rellena y se cierra con disminuciones. Al final
          coses las partes con la aguja lanera y colocas los ojos de seguridad.
        </p>
        <p className="mt-3 text-hookmi-ink/80">
          En los kits HOOKMI cada amigurumi tiene su propio tutorial en video dividido por partes, así
          que solo tienes que seguirlo a tu ritmo.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink sm:text-3xl">
          Errores comunes al aprender a tejer (y cómo evitarlos)
        </h2>
        <div className="mt-6 flex flex-col gap-5">
          {MISTAKES.map((mistake) => (
            <div key={mistake.title}>
              <h3 className="font-bold text-hookmi-ink">{mistake.title}</h3>
              <p className="mt-1 text-sm text-hookmi-ink/70">{mistake.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink sm:text-3xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-6 flex flex-col gap-5">
          {FAQS.map((faq) => (
            <div key={faq.question}>
              <h3 className="font-bold text-hookmi-ink">{faq.question}</h3>
              <p className="mt-1 text-sm text-hookmi-ink/70">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-hookmi-cream p-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink">
          Empieza hoy a tejer tu primer amigurumi
        </h2>
        <p className="mt-3 text-hookmi-ink/70">
          Mira los tutoriales gratis o elige un kit con todo incluido.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <LinkButton href="/tutoriales" variant="outline">
            Ver tutoriales gratis
          </LinkButton>
          <LinkButton href="/kits-de-crochet" variant="primary">
            Ver kits de crochet
          </LinkButton>
        </div>
      </section>
    </article>
  );
}
