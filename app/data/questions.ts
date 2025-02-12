export interface Question {
  id: number;
  title: string;
  answers: { label: string; value: string }[];
}

export const questions: Question[] = [
  {
    id: 1,
    title: "¿Cuál es tu nivel de experiencia?",
    answers: [
      { label: "Principiante", value: "1" },
      { label: "Intermedio", value: "2" },
      { label: "Avanzado", value: "3" },
      { label: "Experto", value: "4" },
      { label: "Profesional", value: "5" },
    ],
  },
  {
    id: 2,
    title: "¿Para qué usarás principalmente el portátil?",
    answers: [
      { label: "Trabajo de oficina", value: "office" },
      { label: "Diseño gráfico", value: "design" },
      { label: "Programación", value: "dev" },
      { label: "Gaming", value: "gaming" },
      { label: "Uso general", value: "general" },
    ],
  },
  // Add more questions as needed
];
