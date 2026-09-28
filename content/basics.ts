// Tutoriales gratuitos de técnicas básicas, visibles para cualquier visitante
// (no están atados a la compra de ningún kit ni requieren código).
//
// `videoUrl` apunta siempre a nuestra propia Route Handler
// (/api/tutorial-video/<id>), nunca al link directo de CloudFront: así el
// link real del bucket nunca llega al HTML/RSC payload que ve el navegador.
// Las URLs reales viven en `content/basics.secure.ts` (solo servidor).
//
// `description` es texto visible en la página: Google no "ve" los videos,
// así que este texto es lo que posiciona búsquedas como "cómo hacer una cadeneta".

export type BasicTutorial = {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
};

export const basicTutorials: BasicTutorial[] = [
  {
    id: "agarre",
    title: "Cómo agarrar la lana y el crochet",
    videoUrl: "/api/tutorial-video/agarre",
    description:
      "El primer paso para aprender a tejer crochet desde cero: cómo sostener el crochet como un lápiz y cómo pasar la lana entre los dedos para controlar la tensión. Con un buen agarre tus puntos salen parejos y tus manos no se cansan.",
  },
  {
    id: "cadeneta",
    title: "Cómo hacer una cadeneta",
    videoUrl: "/api/tutorial-video/cadeneta",
    description:
      "La cadeneta es el punto base del crochet: una fila de lazadas enganchadas una tras otra. Aprenderás a hacer el nudo inicial y a tejer cadenetas del mismo tamaño, la base de casi cualquier proyecto de tejido.",
  },
  {
    id: "anillo-magico",
    title: "Cómo hacer un anillo mágico",
    videoUrl: "/api/tutorial-video/anillo-magico",
    description:
      "El anillo mágico es la forma de empezar un amigurumi: un círculo ajustable donde tejes los primeros puntos bajos y luego lo cierras jalando la hebra, sin dejar agujero en el centro.",
  },
  {
    id: "aumento",
    title: "Cómo hacer un aumento",
    videoUrl: "/api/tutorial-video/aumento",
    description:
      "Un aumento son dos puntos bajos tejidos en el mismo punto. Así la pieza crece vuelta a vuelta y toma forma redonda: es lo que da volumen al cuerpo y la cabeza de tu amigurumi.",
  },
  {
    id: "practicando-aumentos",
    title: "Practicando aumentos",
    videoUrl: "/api/tutorial-video/practicando-aumentos",
    description:
      "Practica varias vueltas seguidas con aumentos para agarrar ritmo, contar tus puntos con el separador (marcador) y ver cómo tu tejido se convierte en un círculo plano y parejo.",
  },
  {
    id: "disminucion",
    title: "Cómo hacer una disminución",
    videoUrl: "/api/tutorial-video/disminucion",
    description:
      "La disminución une dos puntos en uno para cerrar la pieza. Es la técnica que usarás para terminar las partes de tu amigurumi, rellenarlas y dejarlas bien cerradas.",
  },
];
