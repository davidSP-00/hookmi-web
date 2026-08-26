// Tutoriales gratuitos de técnicas básicas, visibles para cualquier visitante
// (no están atados a la compra de ningún kit ni requieren contraseña).

export type BasicTutorial = {
  id: string;
  title: string;
  videoUrl: string;
};

export const basicTutorials: BasicTutorial[] = [
  { id: "agarre", title: "Cómo agarrar el crochet y la lana", videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
  { id: "cadeneta", title: "Cadeneta: el punto base", videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
  { id: "punto-bajo", title: "Punto bajo", videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
  { id: "aumentos", title: "Aumentos y disminuciones", videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
  { id: "rematar", title: "Cómo cerrar y rematar tu tejido", videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
];
