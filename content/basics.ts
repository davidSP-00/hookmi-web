// Tutoriales gratuitos de técnicas básicas, visibles para cualquier visitante
// (no están atados a la compra de ningún kit ni requieren código).
//
// `videoUrl` apunta siempre a nuestra propia Route Handler
// (/api/tutorial-video/<id>), nunca al link directo de CloudFront: así el
// link real del bucket nunca llega al HTML/RSC payload que ve el navegador.
// Las URLs reales viven en `content/basics.secure.ts` (solo servidor).

export type BasicTutorial = {
  id: string;
  title: string;
  videoUrl: string;
};

export const basicTutorials: BasicTutorial[] = [
  { id: "agarre", title: "Cómo agarrar la lana y el crochet", videoUrl: "/api/tutorial-video/agarre" },
  { id: "cadeneta", title: "Cómo hacer una cadeneta", videoUrl: "/api/tutorial-video/cadeneta" },
  { id: "anillo-magico", title: "Cómo hacer un anillo mágico", videoUrl: "/api/tutorial-video/anillo-magico" },
  { id: "aumento", title: "Cómo hacer un aumento", videoUrl: "/api/tutorial-video/aumento" },
  { id: "practicando-aumentos", title: "Practicando aumentos", videoUrl: "/api/tutorial-video/practicando-aumentos" },
  { id: "disminucion", title: "Cómo hacer una disminución", videoUrl: "/api/tutorial-video/disminucion" },
];
