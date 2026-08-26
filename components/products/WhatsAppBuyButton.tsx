import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/Button";

export function WhatsAppBuyButton({ message }: { message: string }) {
  return (
    <LinkButton
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      variant="whatsapp"
    >
      <MessageCircle size={18} />
      Comprar por WhatsApp
    </LinkButton>
  );
}
