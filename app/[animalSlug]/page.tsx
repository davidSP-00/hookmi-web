import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { GraduationCap, Lock, Sparkles, Video } from "lucide-react";
import { animals, getAnimalBySlug } from "@/content/animals";
import { getAnimalSecureBySlug } from "@/content/animals.secure";
import { basicTutorials } from "@/content/basics";
import { verifyUnlockToken } from "@/lib/unlockToken";
import { RESERVED_SLUGS, UNLOCK_COOKIE_PREFIX } from "@/lib/constants";
import { DifficultyMeter } from "@/components/ui/DifficultyMeter";
import { PasswordGateForm } from "@/components/animals/PasswordGateForm";
import { VideoSectionAccordion } from "@/components/animals/VideoSectionAccordion";
import { PdfDownloadButton } from "@/components/animals/PdfDownloadButton";
import { UnlockedCelebration } from "@/components/animals/UnlockedCelebration";

type Props = { params: Promise<{ animalSlug: string }> };

export function generateStaticParams() {
  return animals.map((animal) => ({ animalSlug: animal.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { animalSlug } = await params;
  const animal = getAnimalBySlug(animalSlug);
  if (!animal) return {};

  return {
    title: `${animal.name} — Tutorial HOOKMI`,
    description: animal.description,
  };
}

export default async function AnimalPage({ params }: Props) {
  const { animalSlug } = await params;

  // Refuerzo en runtime: las rutas estáticas (/productos, /tutoriales, etc.)
  // ya tienen prioridad sobre esta dinámica, pero por si algún slug de
  // contenido llegara a coincidir, se trata como no encontrado.
  if ((RESERVED_SLUGS as readonly string[]).includes(animalSlug)) {
    notFound();
  }

  const animal = getAnimalBySlug(animalSlug);
  if (!animal) notFound();

  const cookieStore = await cookies();
  const token = cookieStore.get(`${UNLOCK_COOKIE_PREFIX}${animal.slug}`)?.value;
  const unlocked = token ? await verifyUnlockToken(token, animal.slug) : false;
  const secure = unlocked ? getAnimalSecureBySlug(animal.slug) : undefined;

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-hookmi-yellow px-6 py-10 sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/40" />
        <div className="pointer-events-none absolute -bottom-20 -left-14 h-52 w-52 rounded-full bg-hookmi-coral/20" />
        <Sparkles
          className="pointer-events-none absolute right-10 bottom-8 text-hookmi-ink/20"
          size={40}
        />

        <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:items-center">
          <div className="relative aspect-square w-full max-w-[240px] flex-shrink-0">
            <div className="absolute inset-0 -rotate-3 rounded-[2rem] bg-white/70" />
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border-4 border-white shadow-xl">
              <Image src={animal.coverImage} alt={animal.name} fill className="object-cover" priority />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <span className="inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-hookmi-ink/70">
              HOOKMI N.º {animal.code}
            </span>
            <h1 className="mt-2 font-heading text-4xl font-bold text-hookmi-ink sm:text-5xl">
              {animal.name}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-hookmi-ink/80 sm:mx-0">{animal.description}</p>

            <div className="mt-4 flex justify-center sm:justify-start">
              <DifficultyMeter difficulty={animal.difficulty} />
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12 rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm sm:p-10">
        <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-hookmi-ink">
          <Lock className="text-hookmi-coral" size={24} /> Tutoriales
        </h2>

        {unlocked && secure ? (
          <div className="mt-6 flex flex-col gap-10">
            <div>
              <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-hookmi-ink">
                <GraduationCap className="text-hookmi-coral" size={20} /> Antes de iniciar
              </h3>
              <p className="mt-1 text-sm text-hookmi-ink/70">
                Cómo agarrar el crochet, la cadeneta, el punto bajo y más.
              </p>
              <div className="mt-4">
                <VideoSectionAccordion sections={basicTutorials} />
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-hookmi-ink">
                <Video className="text-hookmi-coral" size={20} /> Tutorial de {animal.name}
              </h3>
              <div className="mt-4 flex flex-col gap-6">
                <VideoSectionAccordion sections={secure.sections} />
                <PdfDownloadButton slug={animal.slug} />
                <UnlockedCelebration animalName={animal.name} />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-hookmi-ink/70">
              Ingresa el código incluido en tu kit para desbloquear los videos de técnicas
              básicas, el tutorial de {animal.name} y el PDF de instrucciones:
            </p>
            <ol className="mt-3 grid list-inside list-decimal grid-cols-1 gap-1 text-sm text-hookmi-ink/80 sm:grid-cols-2">
              {animal.sectionsMeta.map((section) => (
                <li key={section.title}>{section.title}</li>
              ))}
            </ol>
            <PasswordGateForm slug={animal.slug} />
          </div>
        )}
      </section>
    </div>
  );
}
