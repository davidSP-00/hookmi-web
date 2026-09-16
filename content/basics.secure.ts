import "server-only";

// Archivo SOLO servidor: nunca lo importes desde un componente de cliente
// ni desde `content/basics.ts`. Solo lo debe leer la Route Handler en
// app/api/tutorial-video/[id]/route.ts.
//
// Aquí viven las URLs reales de CloudFront. Así el HTML/RSC payload que
// llega al navegador solo contiene la ruta interna `/api/tutorial-video/<id>`
// (ver content/basics.ts) y nunca el link directo al bucket/distribución.

export const basicTutorialVideoSources: Record<string, string> = {
  agarre: "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/COMO%20AGARRAR%20LA%20LANA.mp4",
  cadeneta: "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/CADENETA.mp4",
  "anillo-magico": "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/ANILLO%20MAGICO.mp4",
  "punto-bajo": "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/PUNTO%20BAJO.mp4",
  aumento: "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/AUMENTO.mp4",
  disminucion: "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/DISMINUCION.mp4",
};
