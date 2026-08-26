export type Difficulty = 0 | 1 | 2 | 3 | 4 | 5;

export function difficultyLabel(level: Difficulty): "Principiante" | "Intermedio" | "Avanzado" {
  if (level <= 1) return "Principiante";
  if (level <= 3) return "Intermedio";
  return "Avanzado";
}
