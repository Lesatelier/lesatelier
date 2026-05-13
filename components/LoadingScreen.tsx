'use client';

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
      {/* Spinner */}
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#CADCFC]" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#1B2A6B]" />
      </div>

      <div className="space-y-2">
        <p className="text-lg font-bold text-[#1B2A6B]">Je lespakket wordt gemaakt…</p>
        <p className="text-sm text-gray-500">Dit duurt ongeveer 30–60 seconden.</p>
      </div>

      {/* Progress steps */}
      <div className="mt-4 space-y-2 text-left text-sm text-gray-500 w-64">
        {[
          'Lesdoelen opstellen',
          'Didactische opbouw bepalen',
          'Opdrachten en uitleg uitwerken',
          'Differentiatie en bonusopdrachten toevoegen',
          'Documenten genereren',
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="h-1.5 w-1.5 rounded-full bg-[#CADCFC] animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
