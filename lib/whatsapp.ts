import { DEFAULT_WHATSAPP_MESSAGE, WHATSAPP_PHONE_NUMBER } from "@/lib/constants";

export function buildWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const phone = WHATSAPP_PHONE_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
