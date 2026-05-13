'use client';

interface Props {
  zipBase64: string;
  filename: string;
  files: string[];
  onReset: () => void;
}

const FILE_ICONS: Record<string, string> = {
  '.pptx': '📊',
  '.docx': '📄',
};

function fileIcon(name: string): string {
  const ext = name.slice(name.lastIndexOf('.'));
  return FILE_ICONS[ext] ?? '📁';
}

function friendlyName(name: string): string {
  // Take everything after the last underscore-separated slug segment
  // e.g. "les_pesten_havo_3_handout_leerlingen.docx" → "Handout leerlingen"
  const withoutExt = name.replace(/\.(pptx|docx)$/i, '');
  const knownTypes = [
    'presentatie',
    'handout_leerlingen',
    'antwoordblad_docent',
    'oefendocument',
    'lesplanformulier',
  ];
  for (const t of knownTypes) {
    if (withoutExt.endsWith(t)) {
      return t.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    }
  }
  return withoutExt.replace(/^les_/, '').replace(/_/g, ' ');
}

export default function DownloadScreen({ zipBase64, filename, files, onReset }: Props) {
  function download() {
    const bytes = Uint8Array.from(atob(zipBase64), (c) => c.charCodeAt(0));
    const blob = new Blob([bytes], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      {/* Success icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
        ✅
      </div>

      <div>
        <h2 className="text-xl font-bold text-[#1B2A6B]">Lespakket klaar!</h2>
        <p className="mt-1 text-sm text-gray-500">
          Download de zip en open de bestanden in Word en PowerPoint.
        </p>
      </div>

      {/* File list */}
      <div className="w-full rounded-xl border border-[#CADCFC] bg-[#F0F4FA] p-4 text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#1B2A6B]">
          Inhoud van de zip
        </p>
        <ul className="space-y-2">
          {files.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-base">{fileIcon(f)}</span>
              <span className="capitalize">{friendlyName(f)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Download button */}
      <button
        onClick={download}
        className="w-full rounded-xl bg-[#1B2A6B] px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#14205a] focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:ring-offset-2"
      >
        Download lespakket (.zip)
      </button>

      {/* Reset */}
      <button
        onClick={onReset}
        className="text-sm font-medium text-[#1B2A6B] underline underline-offset-2 hover:text-[#14205a] transition"
      >
        Nieuwe les genereren
      </button>
    </div>
  );
}
