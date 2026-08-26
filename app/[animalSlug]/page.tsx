import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { animals, getAnimalBySlug } from "@/content/animals";
import { getAnimalSecureBySlug } from "@/content/animals.secure";
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
    <div className="mx-auto max-w-4xl px-5 py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="relative aspect-square w-full max-w-xs flex-shrink-0 overflow-hidden rounded-3xl bg-hookmi-cream sm:w-56">
          <Image src={animal.coverImage} alt={animal.name} fill className="object-cover" priority />
        </div>

        <div>
          <DifficultyMeter difficulty={animal.difficulty} />
          <h1 className="mt-3 font-heading text-4xl font-bold text-hookmi-ink">{animal.name}</h1>
          <p className="mt-3 text-hookmi-ink/80">{animal.description}</p>
        </div>
      </div>

      <p className="mt-6 text-sm text-hookmi-ink/70">
        ¿Recién empiezas?{" "}
        <Link href="/tutoriales" className="font-semibold text-hookmi-coral underline underline-offset-4">
          Mira las técnicas básicas gratis
        </Link>
        .
      </p>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold text-hookmi-ink">Tutoriales completos</h2>

        {unlocked && secure ? (
          <div className="mt-4 flex flex-col gap-6">
            <VideoSectionAccordion sections={secure.sections} />
            <PdfDownloadButton slug={animal.slug} />
            <UnlockedCelebration animalName={animal.name} />
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-hookmi-ink/70">
              Ingresa el código incluido en tu kit para desbloquear los videos de{" "}
              {animal.sectionsMeta.map((section) => section.title).join(", ")} y el PDF de
              instrucciones.
            </p>
            <PasswordGateForm slug={animal.slug} />
          </div>
        )}
      </section>
    </div>
  );
}
