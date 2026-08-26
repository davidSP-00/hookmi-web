import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-hookmi-whatsapp text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
    </a>
  );
}
