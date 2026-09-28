// Datos estructurados para Google. Se escapa "<" para evitar inyección de HTML
// (recomendación de la guía de JSON-LD de Next).
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
