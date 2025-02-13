export interface Question {
  id: number;
  title: string;
  answers: { label: string; value: string }[];
}

const minBudget = 895000;
const maxBudget = 15749900;

const budgetSteps = 5; // Number of budget options
const budgetIncrement = (maxBudget - minBudget) / budgetSteps;

export const questions: Question[] = [
  {
    id: 1001,
    title: "Cual es tu presupuesto?",
    answers: Array.from({ length: budgetSteps }, (_, i) => {
      const min = Math.round(minBudget + i * budgetIncrement);
      const max = Math.round(minBudget + (i + 1) * budgetIncrement);
      return {
        label: `Entre ${min.toLocaleString()} y ${max.toLocaleString()}`,
        value: `${min}-${max}`,
      };
    }),
  },

  // Add more questions as needed
];
