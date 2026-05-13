'use client';

import { useState } from 'react';
import type {
  LesFormData, KlasNiveau, Lesduur, Werkvorm, Autonomie,
} from '@/types/lesson';

const KLASSEN: KlasNiveau[] = [
  'VMBO-KGT 1', 'VMBO-KGT 2', 'VMBO-KGT 3', 'VMBO-KGT 4',
  'HAVO 1', 'HAVO 2', 'HAVO 3', 'HAVO 4', 'HAVO 5',
  'VWO 1', 'VWO 2', 'VWO 3', 'VWO 4', 'VWO 5', 'VWO 6',
  'MBO niveau 1', 'MBO niveau 2', 'MBO niveau 3', 'MBO niveau 4',
];

const LESDUUR: Lesduur[] = ['45 minuten', '60 minuten', '80 minuten', '90 minuten', '100 minuten'];

const WERKVORMEN: Werkvorm[] = [
  'Voelen–Vatten–Verwerken',
  'Directe instructie',
  'Coöperatief leren',
  'Projectonderwijs',
  'Socratisch gesprek',
];

const AUTONOMIE: Autonomie[] = ['Vaste opdracht', 'Deels vrij', 'Vrije onderwerpkeuze'];

const DEFAULT_FORM: LesFormData = {
  vak: '',
  klas: 'HAVO 3',
  thema: '',
  lesduur: '60 minuten',
  werkvorm: 'Voelen–Vatten–Verwerken',
  autonomie: 'Vaste opdracht',
  aiAnalyse: false,
  bijzonderheden: '',
};

interface Props {
  onSubmit: (data: LesFormData) => void;
  loading: boolean;
}

export default function LesForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<LesFormData>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof LesFormData, string>>>({});

  function validate(): boolean {
    const e: Partial<Record<keyof LesFormData, string>> = {};
    if (!form.vak.trim()) e.vak = 'Vul het vak in.';
    if (!form.thema.trim()) e.thema = 'Vul het onderwerp/thema in.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) onSubmit(form);
  }

  function set<K extends keyof LesFormData>(key: K, value: LesFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* Vak */}
      <div>
        <label className="block text-sm font-semibold text-[#1B2A6B] mb-1">
          Vak <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={form.vak}
          onChange={(e) => set('vak', e.target.value)}
          placeholder="bijv. Nederlands, Geschiedenis, Engels"
          className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] ${
            errors.vak ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.vak && <p className="mt-1 text-xs text-red-600">{errors.vak}</p>}
      </div>

      {/* Klas */}
      <div>
        <label className="block text-sm font-semibold text-[#1B2A6B] mb-1">
          Klas / Niveau <span className="text-red-600">*</span>
        </label>
        <select
          value={form.klas}
          onChange={(e) => set('klas', e.target.value as KlasNiveau)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]"
        >
          {KLASSEN.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>

      {/* Thema */}
      <div>
        <label className="block text-sm font-semibold text-[#1B2A6B] mb-1">
          Onderwerp / Thema <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          value={form.thema}
          onChange={(e) => set('thema', e.target.value)}
          placeholder="bijv. Pesten en online gedrag"
          className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] ${
            errors.thema ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.thema && <p className="mt-1 text-xs text-red-600">{errors.thema}</p>}
      </div>

      {/* Lesduur */}
      <div>
        <label className="block text-sm font-semibold text-[#1B2A6B] mb-1">
          Lesduur <span className="text-red-600">*</span>
        </label>
        <select
          value={form.lesduur}
          onChange={(e) => set('lesduur', e.target.value as Lesduur)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]"
        >
          {LESDUUR.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Werkvorm */}
      <div>
        <label className="block text-sm font-semibold text-[#1B2A6B] mb-1">
          Werkvorm <span className="text-red-600">*</span>
        </label>
        <select
          value={form.werkvorm}
          onChange={(e) => set('werkvorm', e.target.value as Werkvorm)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]"
        >
          {WERKVORMEN.map((w) => <option key={w} value={w}>{w}</option>)}
        </select>
      </div>

      {/* Autonomie */}
      <div>
        <label className="block text-sm font-semibold text-[#1B2A6B] mb-1">
          Leerlingautonomie <span className="text-red-600">*</span>
        </label>
        <select
          value={form.autonomie}
          onChange={(e) => set('autonomie', e.target.value as Autonomie)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]"
        >
          {AUTONOMIE.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {/* AI Analyse toggle */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-[#F0F4FA] px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#1B2A6B]">AI-analyseonderdeel</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Leerlingen beoordelen AI-gegenereerde teksten kritisch
          </p>
        </div>
        <button
          type="button"
          onClick={() => set('aiAnalyse', !form.aiAnalyse)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:ring-offset-2 ${
            form.aiAnalyse ? 'bg-[#1B2A6B]' : 'bg-gray-300'
          }`}
          aria-checked={form.aiAnalyse}
          role="switch"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              form.aiAnalyse ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Bijzonderheden */}
      <div>
        <label className="block text-sm font-semibold text-[#1B2A6B] mb-1">
          Bijzonderheden{' '}
          <span className="font-normal text-gray-400">(optioneel)</span>
        </label>
        <textarea
          value={form.bijzonderheden}
          onChange={(e) => set('bijzonderheden', e.target.value)}
          rows={3}
          placeholder="bijv. vervolg op vorige les over X, specifieke differentiatie nodig, eigen voorbeelden"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#1B2A6B] px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#14205a] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:ring-offset-2"
      >
        {loading ? 'Bezig…' : 'Genereer lespakket'}
      </button>
    </form>
  );
}
