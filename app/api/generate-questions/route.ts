import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function GET(req: Request) {
  // Generate 5 questions in JSON.
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `Genera 5 preguntas creativas para una encuesta principal en formato JSON.
Cada pregunta debe tener:
- "id": número,
- "question": cadena de texto,
- "options": arreglo de cadenas.
Ejemplo de salida:
[
  { "id": 1, "question": "¿Cómo calificarías nuestro servicio?", "options": ["Excelente", "Bueno", "Regular", "Malo"] },
  ...
]`
  });

  let questions;
  try {
    questions = JSON.parse(text);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al parsear las preguntas." }), { status: 500 });
  }

  return new Response(JSON.stringify(questions), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
