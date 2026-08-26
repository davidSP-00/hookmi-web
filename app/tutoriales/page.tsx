import type { Metadata } from "next";
import { animals } from "@/content/animals";
import { basicTutorials } from "@/content/basics";
import { AnimalGrid } from "@/components/animals/AnimalGrid";
import { VideoSectionAccordion } from "@/components/animals/VideoSectionAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Tutoriales — HOOKMI",
  description:
    "Aprende las técnicas básicas de crochet gratis y desbloquea el tutorial completo de tu animal con la contraseña de tu kit.",
};

export default function TutorialesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="Gratis para todos"
        title="Aprende las técnicas básicas"
        description="Estos videos son gratuitos y no requieren ningún kit: cómo agarrar el crochet, la cadeneta, el punto bajo y más."
      />

      <div className="mx-auto mt-10 max-w-2xl">
        <VideoSectionAccordion sections={basicTutorials} />
      </div>

      <div className="mt-24">
        <SectionHeading
          eyebrow="Tutoriales por kit"
          title="Elige tu animal"
          description="Cada animal tiene sus tutoriales completos protegidos por la contraseña incluida en su kit."
        />

        <div className="mt-12">
          <AnimalGrid animals={animals} />
        </div>
      </div>
    </div>
  );
}
