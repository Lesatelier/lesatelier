/* =====================================================
   LesHub Chatbot — Lisa van LesHub
   Anthropic API (browser fetch)
   ===================================================== */

(function () {
  'use strict';

  /* ── CONFIG ── */
  const MODEL    = 'claude-sonnet-4-20250514';
  const SYSTEM   = `Je bent Lisa, een vriendelijke assistent van LesHub.nl. Je helpt docenten Nederlands in het voortgezet onderwijs en MBO bij het vinden van het juiste lespakket. Je bent warm, professioneel en to-the-point. Je weet alles over de lespakketten, prijzen en workshops van LesHub. Prijzen: los pakket €9,99, maandabonnement €14,99, jaarabonnement €129,99. Voor workshops verwijs je naar info@leshub.nl. Je antwoordt altijd in het Nederlands.

Beschikbare lespakketten:
1. Nieuwsbegrip & Mediawijsheid (HAVO/VWO jaar 3-4, Media & Maatschappij) — €9,99
2. Solliciteren & Professioneel schrijven (MBO niveau 3-4, Taal in de praktijk) — €9,99
3. Klimaat & Argumenteren (VWO jaar 5-6, Natuur & Duurzaamheid) — €9,99
4. Poëzie & Beeldtaal (HAVO/VWO jaar 4-5, Literatuur & Cultuur) — €9,99
5. Vergaderen & Presenteren (MBO niveau 2-3, Taal in de praktijk) — €9,99
6. Digitale communicatie (VMBO jaar 3-4, Media & Maatschappij) — €9,99

Elk pakket bevat 3 complete lessen (lezen, schrijven, luisteren), PDF + Word-versie, docentenhandleiding en levenslange toegang.

Workshops:
- AI-geletterdheid voor docenten (introductie, halve dag)
- AI voor gevorderden (verdieping, hele dag)
Voor workshop-informatie: info@leshub.nl`;

  /* ── STYLES ── */
  const CSS = `
  #lh-chat-btn {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #C2410C;
    color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(194,65,12,.45);
    z-index: 9998;
    transition: transform .2s, box-shadow .2s;
    font-size: 1.6rem;
  }
  #lh-chat-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 22px rgba(194,65,12,.55);
  }
  #lh-chat-btn .lh-badge {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 18px;
    height: 18px;
    background: #16a34a;
    border-radius: 50%;
    border: 2px solid #fff;
    display: none;
  }
  #lh-chat-btn.has-unread .lh-badge {
    display: block;
  }

  #lh-chat-window {
    position: fixed;
    bottom: 5.5rem;
    right: 1.5rem;
    width: 360px;
    max-width: calc(100vw - 2rem);
    height: 520px;
    max-height: calc(100vh - 7rem);
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 40px rgba(0,0,0,.18);
    display: flex;
    flex-direction: column;
    z-index: 9999;
    overflow: hidden;
    transform-origin: bottom right;
    transition: opacity .2s, transform .2s;
    font-family: inherit;
  }
  #lh-chat-window.lh-hidden {
    opacity: 0;
    transform: scale(.9) translateY(8px);
    pointer-events: none;
  }

  #lh-chat-header {
    background: #C2410C;
    color: #fff;
    padding: .85rem 1rem;
    display: flex;
    align-items: center;
    gap: .75rem;
    flex-shrink: 0;
  }
  #lh-chat-header .lh-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(255,255,255,.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    flex-shrink: 0;
  }
  #lh-chat-header .lh-hinfo {
    flex: 1;
    min-width: 0;
  }
  #lh-chat-header .lh-hname {
    font-weight: 700;
    font-size: .95rem;
    line-height: 1.2;
  }
  #lh-chat-header .lh-hstatus {
    font-size: .75rem;
    opacity: .85;
    display: flex;
    align-items: center;
    gap: .3rem;
  }
  #lh-chat-header .lh-hstatus::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #86efac;
    display: inline-block;
  }
  #lh-chat-close {
    background: none;
    border: none;
    color: rgba(255,255,255,.8);
    cursor: pointer;
    font-size: 1.3rem;
    line-height: 1;
    padding: .2rem;
    border-radius: 4px;
    transition: color .15s;
    flex-shrink: 0;
  }
  #lh-chat-close:hover { color: #fff; }

  #lh-chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: .65rem;
    background: #fafaf9;
    scroll-behavior: smooth;
  }
  #lh-chat-messages::-webkit-scrollbar { width: 4px; }
  #lh-chat-messages::-webkit-scrollbar-track { background: transparent; }
  #lh-chat-messages::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 4px; }

  .lh-msg {
    max-width: 85%;
    padding: .6rem .85rem;
    border-radius: 14px;
    font-size: .875rem;
    line-height: 1.55;
    word-break: break-word;
  }
  .lh-msg-assistant {
    background: #fff;
    border: 1px solid #e7e5e4;
    border-bottom-left-radius: 4px;
    align-self: flex-start;
    color: #1c1917;
  }
  .lh-msg-user {
    background: #C2410C;
    color: #fff;
    border-bottom-right-radius: 4px;
    align-self: flex-end;
  }
  .lh-msg-typing {
    background: #fff;
    border: 1px solid #e7e5e4;
    border-bottom-left-radius: 4px;
    align-self: flex-start;
    padding: .65rem .85rem;
  }
  .lh-typing-dots {
    display: flex;
    gap: 4px;
    align-items: center;
    height: 16px;
  }
  .lh-typing-dots span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #a8a29e;
    animation: lh-bounce .9s infinite ease-in-out;
  }
  .lh-typing-dots span:nth-child(2) { animation-delay: .15s; }
  .lh-typing-dots span:nth-child(3) { animation-delay: .3s; }
  @keyframes lh-bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }

  #lh-chat-suggestions {
    padding: .5rem 1rem 0;
    display: flex;
    gap: .4rem;
    flex-wrap: wrap;
    background: #fafaf9;
    flex-shrink: 0;
  }
  .lh-suggestion {
    background: #fff;
    border: 1px solid #e7e5e4;
    border-radius: 20px;
    padding: .3rem .75rem;
    font-size: .78rem;
    cursor: pointer;
    color: #57534e;
    transition: border-color .15s, color .15s;
    white-space: nowrap;
  }
  .lh-suggestion:hover {
    border-color: #C2410C;
    color: #C2410C;
  }

  #lh-chat-form {
    display: flex;
    gap: .5rem;
    padding: .75rem 1rem;
    border-top: 1px solid #e7e5e4;
    background: #fff;
    flex-shrink: 0;
  }
  #lh-chat-input {
    flex: 1;
    border: 1px solid #e7e5e4;
    border-radius: 10px;
    padding: .55rem .75rem;
    font-size: .875rem;
    outline: none;
    resize: none;
    font-family: inherit;
    line-height: 1.4;
    color: #1c1917;
    background: #fafaf9;
    transition: border-color .15s;
    max-height: 100px;
    overflow-y: auto;
  }
  #lh-chat-input:focus {
    border-color: #C2410C;
    background: #fff;
  }
  #lh-chat-input::placeholder { color: #a8a29e; }
  #lh-chat-send {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: #C2410C;
    border: none;
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background .15s, opacity .15s;
    align-self: flex-end;
  }
  #lh-chat-send:hover { background: #9a3412; }
  #lh-chat-send:disabled { opacity: .45; cursor: default; }
  #lh-chat-send svg { width: 18px; height: 18px; }

  #lh-chat-error {
    padding: .4rem 1rem;
    font-size: .78rem;
    color: #b91c1c;
    background: #fef2f2;
    border-top: 1px solid #fecaca;
    display: none;
    flex-shrink: 0;
    text-align: center;
  }

  @media (max-width: 420px) {
    #lh-chat-window {
      right: 0;
      left: 0;
      bottom: 4.5rem;
      width: 100%;
      max-width: 100%;
      border-radius: 16px 16px 0 0;
      height: 70vh;
    }
    #lh-chat-btn {
      bottom: 1rem;
      right: 1rem;
    }
  }
  `;

  /* ── INITIAL SUGGESTIONS ── */
  const SUGGESTIONS = [
    'Welk pakket past bij HAVO jaar 3?',
    'Wat kost een abonnement?',
    'Hoe werken de pakketten?',
  ];

  /* ── STATE ── */
  let history   = [];   // [{role, content}]
  let isLoading = false;
  let isOpen    = false;
  let hasGreeted = false;

  /* ── BUILD DOM ── */
  function buildUI() {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Floating button
    const btn = document.createElement('button');
    btn.id = 'lh-chat-btn';
    btn.setAttribute('aria-label', 'Chat met Lisa van LesHub');
    btn.innerHTML = '💬<span class="lh-badge"></span>';
    document.body.appendChild(btn);

    // Chat window
    const win = document.createElement('div');
    win.id = 'lh-chat-window';
    win.classList.add('lh-hidden');
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Chat met Lisa van LesHub');
    win.innerHTML = `
      <div id="lh-chat-header">
        <div class="lh-avatar">🤖</div>
        <div class="lh-hinfo">
          <div class="lh-hname">Lisa van LesHub</div>
          <div class="lh-hstatus">Online — stel gerust een vraag</div>
        </div>
        <button id="lh-chat-close" aria-label="Chat sluiten">✕</button>
      </div>
      <div id="lh-chat-messages" role="log" aria-live="polite"></div>
      <div id="lh-chat-suggestions"></div>
      <div id="lh-chat-error"></div>
      <form id="lh-chat-form" autocomplete="off">
        <textarea
          id="lh-chat-input"
          rows="1"
          placeholder="Stel een vraag aan Lisa…"
          aria-label="Berichtinvoer"
          maxlength="1000"
        ></textarea>
        <button type="submit" id="lh-chat-send" aria-label="Versturen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </form>
    `;
    document.body.appendChild(win);

    // Wire events
    btn.addEventListener('click', toggleChat);
    document.getElementById('lh-chat-close').addEventListener('click', closeChat);
    document.getElementById('lh-chat-form').addEventListener('submit', handleSubmit);

    const input = document.getElementById('lh-chat-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        document.getElementById('lh-chat-form').dispatchEvent(new Event('submit'));
      }
    });
    input.addEventListener('input', autoResize);

    renderSuggestions();
  }

  /* ── SUGGESTIONS ── */
  function renderSuggestions() {
    const el = document.getElementById('lh-chat-suggestions');
    el.innerHTML = SUGGESTIONS.map(s =>
      `<button class="lh-suggestion" type="button">${s}</button>`
    ).join('');
    el.querySelectorAll('.lh-suggestion').forEach(btn => {
      btn.addEventListener('click', () => {
        el.innerHTML = '';
        sendMessage(btn.textContent);
      });
    });
  }

  /* ── OPEN / CLOSE ── */
  function toggleChat() {
    isOpen ? closeChat() : openChat();
  }

  function openChat() {
    isOpen = true;
    const win = document.getElementById('lh-chat-window');
    win.classList.remove('lh-hidden');
    document.getElementById('lh-chat-btn').classList.remove('has-unread');
    document.getElementById('lh-chat-input').focus();

    if (!hasGreeted) {
      hasGreeted = true;
      setTimeout(() => appendMessage('assistant',
        'Hoi! Ik ben Lisa van LesHub 👋 Waarmee kan ik je helpen? Je kunt me vragen over onze lespakketten, prijzen of workshops.'
      ), 300);
    }
  }

  function closeChat() {
    isOpen = false;
    document.getElementById('lh-chat-window').classList.add('lh-hidden');
  }

  /* ── MESSAGES ── */
  function appendMessage(role, text) {
    const log = document.getElementById('lh-chat-messages');
    const div = document.createElement('div');
    div.className = `lh-msg lh-msg-${role}`;
    div.textContent = text;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  function showTyping() {
    const log = document.getElementById('lh-chat-messages');
    const div = document.createElement('div');
    div.className = 'lh-msg lh-msg-typing';
    div.id = 'lh-typing-indicator';
    div.innerHTML = '<div class="lh-typing-dots"><span></span><span></span><span></span></div>';
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('lh-typing-indicator');
    if (el) el.remove();
  }

  function showError(msg) {
    const el = document.getElementById('lh-chat-error');
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 5000);
  }

  /* ── TEXTAREA AUTO-RESIZE ── */
  function autoResize() {
    const el = document.getElementById('lh-chat-input');
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 100) + 'px';
  }

  /* ── SUBMIT ── */
  function handleSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('lh-chat-input');
    const text  = input.value.trim();
    if (!text || isLoading) return;
    input.value = '';
    input.style.height = 'auto';
    // Hide suggestions after first real message
    document.getElementById('lh-chat-suggestions').innerHTML = '';
    sendMessage(text);
  }

  async function sendMessage(text) {
    appendMessage('user', text);
    history.push({ role: 'user', content: text });

    setLoading(true);
    showTyping();

    const apiKey = window.ANTHROPIC_API_KEY;
    if (!apiKey) {
      removeTyping();
      setLoading(false);
      showError('API-sleutel ontbreekt. Stel window.ANTHROPIC_API_KEY in.');
      return;
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-allow-browser': 'true',
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 1024,
          system: SYSTEM,
          messages: history,
        }),
      });

      if (!response.ok) {
        let errMsg = `Fout ${response.status}`;
        try {
          const errBody = await response.json();
          if (errBody?.error?.message) errMsg = errBody.error.message;
        } catch (_) {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      const reply = data?.content?.[0]?.text ?? '(geen antwoord ontvangen)';

      history.push({ role: 'assistant', content: reply });
      removeTyping();
      appendMessage('assistant', reply);

      // Unread badge when window is closed
      if (!isOpen) {
        document.getElementById('lh-chat-btn').classList.add('has-unread');
      }
    } catch (err) {
      removeTyping();
      showError('Er ging iets mis: ' + err.message);
      // Remove failed user message from history so conversation stays consistent
      history.pop();
    } finally {
      setLoading(false);
    }
  }

  /* ── LOADING STATE ── */
  function setLoading(val) {
    isLoading = val;
    const sendBtn = document.getElementById('lh-chat-send');
    const input   = document.getElementById('lh-chat-input');
    if (sendBtn) sendBtn.disabled = val;
    if (input)   input.disabled   = val;
  }

  /* ── INIT ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildUI);
  } else {
    buildUI();
  }

})();
