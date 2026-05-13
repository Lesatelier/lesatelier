'use client';

import { useState } from 'react';
import LesForm from '@/components/LesForm';
import LoadingScreen from '@/components/LoadingScreen';
import DownloadScreen from '@/components/DownloadScreen';
import type { LesFormData, LessonJSON } from '@/types/lesson';

type Screen = 'form' | 'loading' | 'download';

interface DownloadState {
  zipBase64: string;
  filename: string;
  files: string[];
}

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>('form');
  const [error, setError] = useState<string | null>(null);
  const [download, setDownload] = useState<DownloadState | null>(null);

  async function handleGenerate(formData: LesFormData) {
    setError(null);
    setScreen('loading');

    try {
      // Step 1 — call Claude
      const genRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      });

      if (!genRes.ok) {
        const data = await genRes.json();
        throw new Error(data.error ?? 'Genereren mislukt.');
      }

      const { lessonData }: { lessonData: LessonJSON } = await genRes.json();

      // Step 2 — build documents
      const buildRes = await fetch('/api/build-documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonData, formData }),
      });

      if (!buildRes.ok) {
        const data = await buildRes.json();
        throw new Error(data.error ?? 'Documenten bouwen mislukt.');
      }

      const result = await buildRes.json();
      setDownload(result);
      setScreen('download');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Er is een onbekende fout opgetreden.';
      setError(msg);
      setScreen('form');
    }
  }

  function handleReset() {
    setDownload(null);
    setError(null);
    setScreen('form');
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-lg">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#1B2A6B] text-white text-xl mb-3">
            📚
          </div>
          <h1 className="text-2xl font-bold text-[#1B2A6B]">Lessengenerator</h1>
          <p className="mt-1 text-sm text-gray-500">
            Vul het formulier in en ontvang een compleet lespakket.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white shadow-md border border-gray-100 p-6 sm:p-8">
          {screen === 'form' && (
            <>
              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <strong>Fout:</strong> {error}
                </div>
              )}
              <LesForm onSubmit={handleGenerate} loading={false} />
            </>
          )}

          {screen === 'loading' && <LoadingScreen />}

          {screen === 'download' && download && (
            <DownloadScreen
              zipBase64={download.zipBase64}
              filename={download.filename}
              files={download.files}
              onReset={handleReset}
            />
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Powered by Claude API — Fase 1
        </p>
      </div>
    </main>
  );
}
