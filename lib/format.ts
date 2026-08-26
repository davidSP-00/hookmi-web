export function formatPrice(price: number, currency: "PEN" | "USD"): string {
  const locale = currency === "PEN" ? "es-PE" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
