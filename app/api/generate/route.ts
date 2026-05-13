import { NextRequest, NextResponse } from 'next/server';
import { generateLesson } from '@/lib/claude';
import type { GenerateRequest } from '@/types/lesson';

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();

    if (!body.formData) {
      return NextResponse.json({ error: 'Formuliergegevens ontbreken.' }, { status: 400 });
    }

    const { vak, klas, thema } = body.formData;
    if (!vak?.trim() || !klas?.trim() || !thema?.trim()) {
      return NextResponse.json({ error: 'Vul alle verplichte velden in.' }, { status: 400 });
    }

    const lessonData = await generateLesson(body.formData);
    return NextResponse.json({ lessonData });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Onbekende fout';
    console.error('[generate]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
