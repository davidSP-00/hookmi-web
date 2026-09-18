import { BookOpen, FileDown } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export function GuidePdfButton({ slug }: { slug: string }) {
  return (
    <LinkButton
      href={`/api/guide-pdf/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      variant="outline"
      className="self-start"
    >
      <BookOpen size={18} />
      Ver guía: cómo leer el crochet
    </LinkButton>
  );
}

export function PdfDownloadButton({ slug }: { slug: string }) {
  return (
    <LinkButton href={`/api/pdf/${slug}`} variant="outline" className="self-start">
      <FileDown size={18} />
      Descargar el patrón completo
    </LinkButton>
  );
}
