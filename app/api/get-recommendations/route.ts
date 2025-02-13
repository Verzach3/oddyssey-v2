import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/get-supabase';
import { parseBudgetRange } from '../../../lib/utils';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();
    
    // Get budget from the first question (ID: 1001)
    const budgetAnswer = answers[1001];
    const { max: maxBudget } = parseBudgetRange(budgetAnswer);

    // Get laptops within budget (up to max)
    const { data: laptops, error } = await supabase
      .from('laptops')
      .select('*')
      .lte('price', maxBudget)
      .limit(35);
    

    if (error) throw error;
    if (!laptops?.length) {
      return NextResponse.json({ 
        recommendations: [] 
      }, { status: 200 });
    }

    // Generate AI ranking
    const prompt = `Based on the following user preferences:
${Object.entries(answers).map(([id, answer]) => `- ${answer}`).join('\n')}

Please analyze these computers and rank them from best to worst match, considering the user's needs, you shoul skip the ranking of a PC if it is duplicated or too similiar to another you ranked already <--- this is super important do not let duplicates slip throu.
Return ONLY a comma-separated list of IDs in order of best to worst match, do not include any other text or say why you ranked them, if there are only one computer in the list, return only that computer's ID

like this: 1, 2, 3, 4, 5

Available computers:
${laptops.map(l => `ID ${l.id}: ${l.name} - ${l.os} - ${l.brand} - ${l.processor} - ${l.ram} - ${l.screen_size} - ${l.graphics}`).join('\n')}`;

    const { text: rankingResponse } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt,
      temperature: 0.3,
      maxTokens: 100_000,
    });

    console.log('Ranking response:', rankingResponse);  
    

    // Parse ranked IDs
    const rankedIds = rankingResponse
      .replace(/\s/g, '')
      .split(',')
      .map(id => Number.parseInt(id))
      .filter(id => !Number.isNaN(id));

    // Get top 5 recommended laptops in ranked order
    const recommendations = rankedIds
      .slice(0, 5)
      .map(id => laptops.find(l => Number.parseInt(l.id) === id))
      .filter(Boolean);

    return NextResponse.json({ recommendations }, { status: 200 });
  } catch (error) {
    console.error('Recommendation error:', error);
    return NextResponse.json({ 
      error: "Error al obtener recomendaciones." 
    }, { status: 500 });
  }
}
