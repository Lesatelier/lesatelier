import { NextRequest, NextResponse } from 'next/server';
import { buildZip } from '@/lib/buildZip';
import type { BuildDocumentsRequest } from '@/types/lesson';

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const body: BuildDocumentsRequest = await req.json();

    if (!body.lessonData || !body.formData) {
      return NextResponse.json({ error: 'Lesgegevens ontbreken.' }, { status: 400 });
    }

    const { buffer, filename, files } = await buildZip(body.lessonData, body.formData);
    const zipBase64 = buffer.toString('base64');

    return NextResponse.json({ zipBase64, filename, files });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Onbekende fout';
    console.error('[build-documents]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
