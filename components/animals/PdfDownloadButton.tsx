import { FileDown } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export function PdfDownloadButton({ slug }: { slug: string }) {
  return (
    <LinkButton href={`/api/pdf/${slug}`} variant="outline" className="self-start">
      <FileDown size={18} />
      Descargar PDF de instrucciones
    </LinkButton>
  );
}
