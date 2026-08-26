import type { Metadata } from "next";
import { Heart, PackageCheck, Video } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Nosotros — HOOKMI",
  description: "Conoce la historia de HOOKMI y por qué creamos kits de crochet para principiantes.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Hecho para principiantes",
    description: "Diseñamos cada kit pensando en quienes nunca han tejido antes: sin frustración, con resultados desde el primer intento.",
  },
  {
    icon: Video,
    title: "Tutoriales claros",
    description: "Videos paso a paso divididos por partes de tu HOOKMI, para que avances a tu propio ritmo cuantas veces lo necesites.",
  },
  {
    icon: PackageCheck,
    title: "Todo incluido",
    description: "Lana, aguja, relleno y ojos de seguridad en un solo kit. Solo necesitas tus manos y ganas de aprender.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <SectionHeading
        eyebrow="Nuestra historia"
        title="Tejer debería ser fácil de empezar"
        description="HOOKMI nació para acercar el crochet a cualquier persona, sin experiencia previa, con kits pensados para que tejer tu primer amigurumi sea una experiencia entretenida y sin frustraciones."
      />

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-3xl border border-black/5 bg-hookmi-cream p-6">
            <Icon className="text-hookmi-coral" size={28} />
            <h3 className="mt-4 font-heading text-lg font-bold text-hookmi-ink">{title}</h3>
            <p className="mt-2 text-sm text-hookmi-ink/70">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
