import type { Metadata } from "next";
import { animals } from "@/content/animals";
import { basicTutorials } from "@/content/basics";
import { AnimalGrid } from "@/components/animals/AnimalGrid";
import { VideoSectionAccordion } from "@/components/animals/VideoSectionAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Tutoriales — HOOKMI",
  description:
    "¿Nunca has tejido crochet? No te preocupes: aprende las técnicas básicas gratis y luego desbloquea el tutorial completo con el código de tu kit.",
};

export default function TutorialesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="Gratis para todos"
        title="¿Nunca has tejido crochet? No te preocupes"
        description="Aquí vas a aprender desde cero y sin apuro: cómo agarrar la lana, hacer una cadeneta, el punto bajo y más. Mira cada video las veces que necesites, a tu ritmo."
      />

      <div className="mx-auto mt-10 max-w-2xl">
        <VideoSectionAccordion sections={basicTutorials} />
      </div>

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
