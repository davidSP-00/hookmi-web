// Tutoriales gratuitos de técnicas básicas, visibles para cualquier visitante
// (no están atados a la compra de ningún kit ni requieren código).
//
// `videoUrl` es el link directo de CloudFront: el navegador descarga el
// video sin pasar por Vercel, así no pagamos ese ancho de banda dos veces.
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
    videoUrl: "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/COMO%20AGARRAR%20LA%20LANA.mp4",
    description:
      "El primer paso para aprender a tejer crochet desde cero: cómo sostener el crochet como un lápiz y cómo pasar la lana entre los dedos para controlar la tensión. Con un buen agarre tus puntos salen parejos y tus manos no se cansan.",
  },
  {
    id: "cadeneta",
    title: "Cómo hacer una cadeneta",
    videoUrl: "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/CADENETA.mp4",
    description:
      "La cadeneta es el punto base del crochet: una fila de lazadas enganchadas una tras otra. Aprenderás a hacer el nudo inicial y a tejer cadenetas del mismo tamaño, la base de casi cualquier proyecto de tejido.",
  },
  {
    id: "anillo-magico",
    title: "Cómo hacer un anillo mágico",
    videoUrl: "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/ANILLO%20MAGICO.mp4",
    description:
      "El anillo mágico es la forma de empezar un amigurumi: un círculo ajustable donde tejes los primeros puntos bajos y luego lo cierras jalando la hebra, sin dejar agujero en el centro.",
  },
  {
    id: "aumento",
    title: "Cómo hacer un aumento",
    videoUrl: "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/AUMENTO.mp4",
    description:
      "Un aumento son dos puntos bajos tejidos en el mismo punto. Así la pieza crece vuelta a vuelta y toma forma redonda: es lo que da volumen al cuerpo y la cabeza de tu amigurumi.",
  },
  {
    id: "practicando-aumentos",
    title: "Practicando aumentos",
    videoUrl: "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/PRACTICA_AUMENTO.mp4",
    description:
      "Practica varias vueltas seguidas con aumentos para agarrar ritmo, contar tus puntos con el separador (marcador) y ver cómo tu tejido se convierte en un círculo plano y parejo.",
  },
  {
    id: "disminucion",
    title: "Cómo hacer una disminución",
    videoUrl: "https://d38qkanw9z3wft.cloudfront.net/TUTORIAL-BASICO/DISMINUCION.mp4",
    description:
      "La disminución une dos puntos en uno para cerrar la pieza. Es la técnica que usarás para terminar las partes de tu amigurumi, rellenarlas y dejarlas bien cerradas.",
  },
];
