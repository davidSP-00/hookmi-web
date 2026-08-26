import { DEFAULT_WHATSAPP_MESSAGE, WHATSAPP_PHONE_NUMBER } from "@/lib/constants";

export function buildWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  const phone = WHATSAPP_PHONE_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// Formatea el número para mostrarlo en texto, ej. "+51 921 766 751"
export function formatWhatsAppDisplay(): string {
  const digits = WHATSAPP_PHONE_NUMBER.replace(/\D/g, "");
  if (digits.length === 11) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }
  return `+${digits}`;
}
