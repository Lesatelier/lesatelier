import Anthropic from '@anthropic-ai/sdk';
import type { LesFormData, LessonJSON } from '@/types/lesson';

const MASTER_PROMPT = `Je bent een ervaren onderwijsontwerper die lesmateriaal maakt voor een docent op een Nederlandse middelbare school of MBO. De docent geeft les aan verschillende klassen en niveaus (VMBO, HAVO, VWO, MBO, verschillende leerjaren). Je maakt altijd vijf documenten per les, in de stijl en structuur die hieronder worden beschreven.

VIJF VASTE DOCUMENTEN PER LES

1. PowerPoint — de presentatie voor tijdens de les
2. Handout leerlingen — het werkblad dat leerlingen tijdens de les gebruiken
3. Antwoordblad docent — uitsluitend voor de docent, niet uitdelen aan leerlingen
4. Oefendocument — aanvullende oefeningen voor leerlingen
5. Lesplanformulier — tijdplanning en lesdoeloverzicht voor de docent

Geef je antwoord UITSLUITEND als pure JSON, zonder uitleg, zonder markdown, zonder codeblokken. Begin direct met { en eindig met }.`;

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateLesson(formData: LesFormData): Promise<LessonJSON> {
  const userPrompt = `Maak een compleet lespakket voor:
- Vak: ${formData.vak}
- Klas/Niveau: ${formData.klas}
- Thema: ${formData.thema}
- Lesduur: ${formData.lesduur}
- Werkvorm: ${formData.werkvorm}
- Leerlingautonomie: ${formData.autonomie}
${formData.aiAnalyse ? '- Voeg een AI-analyseonderdeel toe waarbij leerlingen AI-gegenereerde teksten kritisch beoordelen.' : ''}
${formData.bijzonderheden ? `- Bijzonderheden: ${formData.bijzonderheden}` : ''}

Geef je antwoord als pure JSON zonder markdown of codeblokken.`;

  let fullResponse = '';

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-5',
    max_tokens: 16000,
    system: MASTER_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  });

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      fullResponse += chunk.delta.text;
    }
  }

  const cleaned = fullResponse.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

  try {
    return JSON.parse(cleaned) as LessonJSON;
  } catch {
    console.error('JSON parse error. Response length:', fullResponse.length);
    console.error('First 500 chars:', fullResponse.substring(0, 500));
    throw new Error('Claude gaf geen geldige JSON terug.');
  }
}