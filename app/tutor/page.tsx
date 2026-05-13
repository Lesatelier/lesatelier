'use client';

import { useState, useEffect, useRef } from 'react';
import type { TutorMessage } from '@/app/api/tutor/route';

/* ── Constants ─────────────────────────────────────────────── */
const TRIAL_DAYS      = 7;
const TRIAL_MESSAGES  = 30;
const WARN_AT         = 25;
const LS_START_DATE   = 'tutor_start_date';
const LS_MSG_COUNT    = 'tutor_message_count';

const SUBJECTS = ['Nederlands', 'Voeding & Gezondheid'];
const LEVELS   = ['VMBO', 'HAVO', 'VWO', 'MBO'];

/* ── Helpers ────────────────────────────────────────────────── */
function getTrialState() {
  const startRaw = localStorage.getItem(LS_START_DATE);
  const count    = parseInt(localStorage.getItem(LS_MSG_COUNT) ?? '0', 10);
  const start    = startRaw ? parseInt(startRaw, 10) : null;
  const days     = start ? Math.floor((Date.now() - start) / 86_400_000) : 0;
  return { count, days, start };
}

function initStartDate() {
  if (!localStorage.getItem(LS_START_DATE)) {
    localStorage.setItem(LS_START_DATE, String(Date.now()));
  }
}

function incrementCount(): number {
  const next = (parseInt(localStorage.getItem(LS_MSG_COUNT) ?? '0', 10)) + 1;
  localStorage.setItem(LS_MSG_COUNT, String(next));
  return next;
}

/* ── Types ──────────────────────────────────────────────────── */
interface SessionConfig {
  studentName: string;
  subject: string;
  level: string;
}

/* ── Component ──────────────────────────────────────────────── */
export default function TutorPage() {
  /* setup form */
  const [config, setConfig]       = useState<SessionConfig>({ studentName: '', subject: SUBJECTS[0], level: LEVELS[0] });
  const [formError, setFormError] = useState('');

  /* session */
  const [sessionActive, setSessionActive] = useState(false);
  const [messages, setMessages]           = useState<TutorMessage[]>([]);
  const [input, setInput]                 = useState('');
  const [loading, setLoading]             = useState(false);
  const [apiError, setApiError]           = useState('');

  /* trial */
  const [trialDays, setTrialDays]       = useState(0);
  const [trialCount, setTrialCount]     = useState(0);
  const [trialBlocked, setTrialBlocked] = useState(false);
  const [showWarning, setShowWarning]   = useState(false);

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLTextAreaElement>(null);

  /* scroll to bottom on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  /* focus input when session starts */
  useEffect(() => {
    if (sessionActive) inputRef.current?.focus();
  }, [sessionActive]);

  /* ── Start session ── */
  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    if (!config.studentName.trim()) {
      setFormError('Vul je naam in.');
      return;
    }
    setFormError('');

    // Check trial state before starting
    const { count, days } = getTrialState();
    setTrialCount(count);
    setTrialDays(days);
    setTrialBlocked(days >= TRIAL_DAYS || count >= TRIAL_MESSAGES);
    setShowWarning(count >= WARN_AT && count < TRIAL_MESSAGES);

    // Opening message from tutor
    setMessages([
      {
        role: 'assistant',
        content: `Hoi ${config.studentName.trim()}! Ik ben je tutor voor ${config.subject}. Waar wil je vandaag mee aan de slag?`,
      },
    ]);
    setSessionActive(true);
  }

  /* ── Send message ── */
  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading || trialBlocked) return;

    setInput('');
    setApiError('');

    // Trial logic
    initStartDate();
    const newCount = incrementCount();
    const { days } = getTrialState();
    setTrialCount(newCount);
    setTrialDays(days);

    if (newCount >= WARN_AT && newCount < TRIAL_MESSAGES) setShowWarning(true);
    if (days >= TRIAL_DAYS || newCount >= TRIAL_MESSAGES) {
      setTrialBlocked(true);
      return;
    }

    const userMsg: TutorMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          studentName: config.studentName.trim(),
          subject: config.subject,
          level: config.level,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Onbekende fout');

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Er is een fout opgetreden.';
      setApiError(msg);
      // Remove the optimistically added user message on failure
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  /* ── Render: Setup screen ── */
  if (!sessionActive) {
    return (
      <div className="flex min-h-[calc(100vh-57px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1B2A6B] text-xl text-white">
              🤖
            </div>
            <h1 className="text-2xl font-bold text-[#1B2A6B]">AI-Tutor</h1>
            <p className="mt-1 text-sm text-gray-500">
              Persoonlijke begeleiding op jouw niveau — powered by Claude
            </p>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-md sm:p-8">
            <form onSubmit={handleStart} className="space-y-5" noValidate>

              {/* Naam */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1B2A6B]">
                  Jouw naam <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={config.studentName}
                  onChange={(e) => { setConfig((c) => ({ ...c, studentName: e.target.value })); setFormError(''); }}
                  placeholder="bijv. Emma"
                  className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] ${formError ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formError && <p className="mt-1 text-xs text-red-600">{formError}</p>}
              </div>

              {/* Vak */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1B2A6B]">
                  Vak <span className="text-red-600">*</span>
                </label>
                <select
                  value={config.subject}
                  onChange={(e) => setConfig((c) => ({ ...c, subject: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]"
                >
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Niveau */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1B2A6B]">
                  Niveau <span className="text-red-600">*</span>
                </label>
                <select
                  value={config.level}
                  onChange={(e) => setConfig((c) => ({ ...c, level: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B2A6B]"
                >
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Trial info */}
              <div className="rounded-lg border border-[#F0F4FA] bg-[#F0F4FA] px-4 py-3 text-xs text-gray-500">
                <span className="font-semibold text-[#1B2A6B]">Gratis proefperiode:</span>{' '}
                7 dagen · 30 gesprekken
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#1B2A6B] px-6 py-3.5 text-base font-bold text-white shadow-md transition hover:bg-[#14205a] focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:ring-offset-2"
              >
                Start sessie →
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ── Render: Chat screen ── */
  const daysLeft     = Math.max(0, TRIAL_DAYS - trialDays);
  const messagesLeft = Math.max(0, TRIAL_MESSAGES - trialCount);

  return (
    <div className="flex h-[calc(100vh-57px)] flex-col">

      {/* Status bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 text-xs text-gray-500">
        <span>
          <span className="font-semibold text-[#1B2A6B]">
            Dag {Math.min(trialDays + 1, TRIAL_DAYS)} van {TRIAL_DAYS}
          </span>
          {' '}— nog{' '}
          <span className={messagesLeft <= 5 ? 'font-semibold text-red-600' : 'font-semibold text-[#1B2A6B]'}>
            {messagesLeft} gesprekken
          </span>
          {' '}over (van {TRIAL_MESSAGES})
        </span>
        <span className="text-gray-400">
          {config.subject} · {config.level} · {config.studentName}
        </span>
      </div>

      {/* Warning banner */}
      {showWarning && !trialBlocked && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-800">
          ⚠️ Nog <strong>5 gesprekken</strong> over in je proefperiode.{' '}
          <a href="/abonnement" className="font-semibold underline hover:text-amber-900">Upgrade voor onbeperkt gebruik →</a>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="mr-2 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1B2A6B] text-xs text-white">
                  🤖
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-br-sm bg-[#1B2A6B] text-white'
                    : 'rounded-bl-sm bg-gray-100 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="mr-2 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1B2A6B] text-xs text-white">
                🤖
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
              </div>
            </div>
          )}

          {/* API error */}
          {apiError && (
            <div className="mx-auto rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-center text-xs text-red-700">
              {apiError}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Blocked overlay */}
      {trialBlocked && (
        <div className="border-t border-gray-200 bg-[#F0F4FA] px-4 py-5 text-center">
          <p className="mb-1 font-semibold text-[#1B2A6B]">Je proefperiode is afgelopen</p>
          <p className="mb-3 text-sm text-gray-500">
            Je hebt {trialCount} van de {TRIAL_MESSAGES} gratis gesprekken gebruikt{' '}
            {trialDays >= TRIAL_DAYS ? `(${TRIAL_DAYS} dagen verstreken)` : ''}.
          </p>
          <a
            href="/abonnement"
            className="inline-block rounded-xl bg-[#1B2A6B] px-6 py-2.5 text-sm font-bold text-white shadow transition hover:bg-[#14205a]"
          >
            Bekijk abonnementen →
          </a>
        </div>
      )}

      {/* Input bar */}
      {!trialBlocked && (
        <form
          onSubmit={handleSend}
          className="border-t border-gray-200 bg-white px-4 py-3"
        >
          <div className="mx-auto flex max-w-2xl items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Stel een vraag of geef een antwoord…"
              disabled={loading}
              className="flex-1 resize-none rounded-xl border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm focus:border-[#1B2A6B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] disabled:opacity-50"
              style={{ maxHeight: '120px', overflowY: 'auto' }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = Math.min(el.scrollHeight, 120) + 'px';
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#1B2A6B] text-white shadow transition hover:bg-[#14205a] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#1B2A6B] focus:ring-offset-2"
              aria-label="Versturen"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
