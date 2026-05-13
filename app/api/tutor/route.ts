import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export const maxDuration = 60;

export interface TutorMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface TutorRequest {
  messages: TutorMessage[];
  studentName: string;
  subject: string;
  level: string;
}

function buildSystemPrompt(studentName: string, subject: string, level: string): string {
  return `Je bent een Nederlandse onderwijstutor die les geeft in ${subject} aan een ${level}-leerling. De leerling heet ${studentName}.

Detecteer op basis van antwoorden op welk Bloom-niveau (1=onthouden t/m 6=creëren) de leerling zit en pas je aan:
- Bloom 1-2: korte zinnen, veel structuur, concrete voorbeelden
- Bloom 3-4: open vragen, laat de leerling redeneren
- Bloom 5-6: kritische vragen, minimale hulp, vraag om onderbouwing

Geef na elk antwoord precies één vervolgvraag. Wees motiverend. Spreek de leerling aan bij naam. Houd antwoorden beknopt — maximaal 150 woorden.`;
}

export async function POST(req: NextRequest) {
  try {
    const body: TutorRequest = await req.json();
    const { messages, studentName, subject, level } = body;

    if (!studentName?.trim() || !subject?.trim() || !level?.trim()) {
      return NextResponse.json({ error: 'studentName, subject en level zijn verplicht.' }, { status: 400 });
    }
    if (!messages?.length) {
      return NextResponse.json({ error: 'messages mag niet leeg zijn.' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY is niet ingesteld in .env.local' }, { status: 500 });
    }

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 512,
      system: buildSystemPrompt(studentName, subject, level),
      messages,
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      return NextResponse.json({ error: 'Onverwacht antwoordtype van Claude API' }, { status: 500 });
    }

    return NextResponse.json({ reply: content.text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Onbekende fout';
    console.error('[tutor]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
