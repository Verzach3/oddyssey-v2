import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { parseBudgetRange } from '../../../lib/utils';

const budgetMaxValues = [2000000, 4000000, 6000000, 10000000, 15000000];

export async function GET(req: Request) {
  // Generate 5 questions in JSON.
  const { text } = await generateText({
    seed: Number(`0x${crypto.randomUUID().replace(/-/g, '')}`),
    model: google("gemini-2.0-flash-lite-preview-02-05"),
    maxRetries: 3,
    prompt: `Genera 5 preguntas técnicas y específicas para recomendar un portátil en formato JSON, tienen que ser preguntas totalmente cerradas, el usuario no va a responder nada manualmente, solo las opciones que le das, incluye siempre una opcion neutra.
Las preguntas deben cubrir:
- Uso principal (gaming, trabajo, diseño)
- Preferencia de tamaño de pantalla
- Necesidad de portabilidad
- Requisitos de rendimiento
- Software específico que usará

Formato requerido:
[
  {
    "id": number,
    "question": string,
    "options": string[]
  }
]

Responde únicamente con el JSON, sin texto adicional ni formato markdown.`,
    temperature: 0.7,
    topP: 0.9,
    stopSequences: ["}]"],
  }).catch(error => {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate questions");
  });

  let questions: { id: number; question: string; options: string[] }[];
  console.log(text);
  try {
    const temp = (JSON.parse(text.replaceAll("```", "").replace("json", "")) as { id: number; question: string; options: string[] }[])
    temp.unshift({
      id: 1001,
      question: "¿Cuál es tu presupuesto máximo?",
      options: budgetMaxValues.map(max => 
        `Hasta ${max.toLocaleString()}`
      ),
    })
    questions = temp
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al parsear las preguntas." }), { status: 500 });
  }

  return new Response(JSON.stringify(questions), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
