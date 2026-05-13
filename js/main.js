/* =============================================
   LesHub.nl — Hoofd JavaScript
   ============================================= */

// ── Data ──────────────────────────────────────
const PAKKETTEN = [
  {
    id: 'nepnieuws-vwo1',
    titel: 'Nepnieuws en desinformatie',
    beschrijving: 'Leerlingen analyseren bronnen, herkennen manipulatietechnieken en schrijven een weerlegging.',
    niveau: 'VWO',
    leerjaar: 1,
    thema: 'Media & Maatschappij',
    lessen: [
      { type: 'lezen',     titel: 'Feiten of fabels?',           beschrijving: 'Analyseer krantenartikelen en herken drogredenen.' },
      { type: 'schrijven', titel: 'Schrijf een factcheck',       beschrijving: 'Schrijf een onderbouwde weerlegging van een viraal bericht.' },
      { type: 'luisteren', titel: 'De podcast over desinformatie', beschrijving: 'Luister en beantwoord gerichte vragen over toon en argument.' },
    ],
    prijs: 9.99,
    previewUrl: null,
    inclusieven: [
      '3 volledige lessen (lezen, schrijven, luisteren)',
      'Docentenhandleiding (PDF)',
      'Differentiatiemogelijkheden',
      'Bronnenlijst & woordenlijst',
      'Digitale en printbare versie',
    ],
    nieuw: true,
  },
  {
    id: 'plasticsoep-havo1',
    titel: 'Plasticsoep',
    beschrijving: 'Van informatieve teksten tot een betoogparagraaf: leerlingen verdiepen zich in duurzaamheid en argumentatie.',
    niveau: 'HAVO',
    leerjaar: 1,
    thema: 'Natuur & Duurzaamheid',
    lessen: [
      { type: 'lezen',     titel: 'De oceaan als stortplaats',    beschrijving: 'Lees een reportage en beantwoord begripsvragen.' },
      { type: 'schrijven', titel: 'Schrijf een betoogparagraaf', beschrijving: 'Gebruik schrijfschema\'s voor een overtuigende alinea.' },
      { type: 'luisteren', titel: 'Interview met een activist',   beschrijving: 'Luister naar een interview en maak aantekeningen.' },
    ],
    prijs: 9.99,
    previewUrl: null,
    inclusieven: [
      '3 volledige lessen (lezen, schrijven, luisteren)',
      'Docentenhandleiding (PDF)',
      'Differentiatiemogelijkheden',
      'Schrijfschema\'s en modelzinnen',
      'Digitale en printbare versie',
    ],
    nieuw: false,
  },
  {
    id: 'romantiek-havo4',
    titel: 'De Romantiek',
    beschrijving: 'Literatuurgeschiedenis verlevendigd: van Romantic poetry tot de eigen creatieve brief in romantische stijl.',
    niveau: 'HAVO',
    leerjaar: 4,
    thema: 'Literatuur & Cultuur',
    lessen: [
      { type: 'lezen',     titel: 'Het gevoel als leidraad',        beschrijving: 'Analyseer gedichten van Bilderdijk en Da Costa.' },
      { type: 'schrijven', titel: 'Een brief in romantische stijl', beschrijving: 'Schrijf een persoonlijke brief met kenmerkende stijlelementen.' },
      { type: 'luisteren', titel: 'Romantiek in de muziek',         beschrijving: 'Verbind tekstfragmenten aan muziekfragmenten.' },
    ],
    prijs: 9.99,
    previewUrl: null,
    inclusieven: [
      '3 volledige lessen (lezen, schrijven, luisteren)',
      'Docentenhandleiding (PDF)',
      'Literaire tijdlijn (poster, PDF)',
      'Woordenschatlijst',
      'Digitale en printbare versie',
    ],
    nieuw: false,
  },
  {
    id: 'sociale-media-vmbo3',
    titel: 'Sociale media & identiteit',
    beschrijving: 'Herkenbare thema\'s voor VMBO: van Instagram-taal tot het schrijven van een column over online zelfpresentatie.',
    niveau: 'VMBO',
    leerjaar: 3,
    thema: 'Media & Maatschappij',
    lessen: [
      { type: 'lezen',     titel: 'Wie ben jij online?',          beschrijving: 'Lees columns en herken stijlmiddelen.' },
      { type: 'schrijven', titel: 'Schrijf je eigen column',      beschrijving: 'Gebruik humor en een duidelijke mening.' },
      { type: 'luisteren', titel: 'Vloggers over authenticiteit', beschrijving: 'Luister en beantwoord vragen over standpunten.' },
    ],
    prijs: 9.99,
    previewUrl: null,
    inclusieven: [
      '3 volledige lessen (lezen, schrijven, luisteren)',
      'Docentenhandleiding (PDF)',
      'Columnsjabloon',
      'Digitale en printbare versie',
    ],
    nieuw: true,
  },
  {
    id: 'oorlog-vwo5',
    titel: 'Oorlog en herinnering',
    beschrijving: 'Diepgravende literatuur- en taalanalyse: van Anne Frank tot hedendaagse oorlogspoëzie.',
    niveau: 'VWO',
    leerjaar: 5,
    thema: 'Literatuur & Cultuur',
    lessen: [
      { type: 'lezen',     titel: 'Getuigenissen',                 beschrijving: 'Vergelijkende tekstanalyse van dagboekfragmenten.' },
      { type: 'schrijven', titel: 'Schrijf een herdenkingstekst', beschrijving: 'Werken aan register, toon en intertekstualiteit.' },
      { type: 'luisteren', titel: 'Documentaire-fragment',        beschrijving: 'Aantekeningen maken bij een mondelinge bron.' },
    ],
    prijs: 9.99,
    previewUrl: null,
    inclusieven: [
      '3 volledige lessen (lezen, schrijven, luisteren)',
      'Docentenhandleiding (PDF)',
      'Differentiatie voor sterke leerlingen',
      'Digitale en printbare versie',
    ],
    nieuw: false,
  },
  {
    id: 'reclame-mbo2',
    titel: 'Reclame en overtuiging',
    beschrijving: 'Praktijkgericht voor MBO: reclameboodschappen analyseren en zelf een overtuigende tekst schrijven.',
    niveau: 'MBO',
    leerjaar: 2,
    thema: 'Taal in de praktijk',
    lessen: [
      { type: 'lezen',     titel: 'Wat zegt de advertentie?',    beschrijving: 'Analyseer reclameboodschappen op techniek en doel.' },
      { type: 'schrijven', titel: 'Schrijf een sloganreeks',     beschrijving: 'Oefen met bondigheid en overtuigingskracht.' },
      { type: 'luisteren', titel: 'Radiospot',                   beschrijving: 'Herken retorische middelen in een radioreclame.' },
    ],
    prijs: 9.99,
    previewUrl: null,
    inclusieven: [
      '3 volledige lessen (lezen, schrijven, luisteren)',
      'Docentenhandleiding (PDF)',
      'Opdrachtenblad (print + digitaal)',
    ],
    nieuw: false,
  },
];

const REVIEWS = [
  {
    initialen: 'MvdB',
    naam: 'Miriam van den Berg',
    functie: 'Docent Nederlands',
    tekst: 'Eindelijk materiaal dat ik niet meer zelf hoef samen te stellen. De lespakketten zijn helder opgebouwd en sluiten perfect aan bij het niveau van mijn leerlingen. Ik bespaar minstens twee uur voorbereiding per week.',
    sterren: 5,
  },
  {
    initialen: 'TH',
    naam: 'Thomas Hoekstra',
    functie: 'Docent Nederlands',
    tekst: 'De kwaliteit van de materialen is echt hoog — alles is doorgedacht, van de teksten tot de opdrachten. Ik download een pakket en kan het dezelfde dag nog gebruiken. Dat scheelt enorm.',
    sterren: 5,
  },
  {
    initialen: 'LK',
    naam: 'Laura Koopman',
    functie: 'Docent Nederlands',
    tekst: 'Wat ik zo fijn vind is hoe overzichtelijk alles is. De drie lessen per pakket — lezen, schrijven, luisteren — vormen een logisch geheel. Mijn voorbereidingstijd is gehalveerd.',
    sterren: 5,
  },
  {
    initialen: 'RJ',
    naam: 'Roos Jansen',
    functie: 'Docent Nederlands',
    tekst: 'Goede materialen, goed niveau, goede opbouw. Het platform is makkelijk te gebruiken en een pakket vinden kost me nog geen minuut. Precies wat ik zocht.',
    sterren: 4,
  },
];

// ── Helpers ───────────────────────────────────
function lesIcon(type) {
  const icons = { lezen: '📖', schrijven: '✏️', luisteren: '🎧' };
  return icons[type] || '📄';
}

function sterren(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function formatPrijs(p) {
  return '€' + p.toFixed(2).replace('.', ',');
}

// ── Navbar ────────────────────────────────────
function initNavbar() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn   = document.querySelector('.mobile-menu-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }

  // Highlight active link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu-links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
}

// ── Homepage pakketten render ─────────────────
function renderHomePakketten() {
  const grid = document.getElementById('home-pakketten-grid');
  if (!grid) return;

  // Show first 3
  const toShow = PAKKETTEN.slice(0, 3);
  grid.innerHTML = toShow.map(p => pakketCardHTML(p)).join('');
}

function pakketCardHTML(p) {
  return `
  <article class="pakket-card" data-id="${p.id}">
    <div class="pakket-card-header">
      <div class="pakket-meta">
        <span class="tag tag-niveau">${p.niveau}</span>
        <span class="tag tag-jaar">Jaar ${p.leerjaar}</span>
        ${p.nieuw ? '<span class="tag" style="background:#DCFCE7;color:#166534">Nieuw</span>' : ''}
      </div>
      <h3>${p.titel}</h3>
      <p>${p.beschrijving}</p>
    </div>
    <div class="pakket-card-body">
      <ul class="lessons-list">
        ${p.lessen.map(l => `
        <li class="lesson-item">
          <span class="lesson-icon ${l.type}">${lesIcon(l.type)}</span>
          <span><strong>${capitalize(l.type)}</strong> — ${l.titel}</span>
        </li>`).join('')}
      </ul>
    </div>
    <div class="pakket-card-footer">
      <div>
        <div class="pakket-price">${formatPrijs(p.prijs)} <span>/ les</span></div>
      </div>
      <a href="pakket-detail.html?id=${p.id}" class="btn btn-primary btn-sm">Bekijk pakket</a>
    </div>
  </article>`;
}

// ── Reviews render ────────────────────────────
function renderReviews() {
  const grid = document.getElementById('reviews-grid');
  if (!grid) return;

  grid.innerHTML = REVIEWS.map(r => `
  <div class="review-card">
    <div class="review-quote">"</div>
    <div class="review-stars">${sterren(r.sterren)}</div>
    <p class="review-text">${r.tekst}</p>
    <div class="reviewer">
      <div class="reviewer-avatar">${r.initialen}</div>
      <div>
        <div class="reviewer-name">${r.naam}</div>
        <div class="reviewer-school">${r.functie}</div>
      </div>
    </div>
  </div>`).join('');
}

// ── Pakketten page ────────────────────────────
function initPakkettenPage() {
  const grid = document.getElementById('pakketten-grid');
  if (!grid) return;

  const filterNiveau  = document.getElementById('filter-niveau');
  const filterJaar    = document.getElementById('filter-jaar');
  const filterThema   = document.getElementById('filter-thema');
  const filterReset   = document.getElementById('filter-reset');
  const countEl       = document.getElementById('results-count');
  const searchInput   = document.getElementById('search-input');

  function applyFilters() {
    const niveau = filterNiveau?.value || '';
    const jaar   = filterJaar?.value   || '';
    const thema  = filterThema?.value  || '';
    const query  = (searchInput?.value || '').toLowerCase().trim();

    const filtered = PAKKETTEN.filter(p => {
      if (niveau && p.niveau !== niveau) return false;
      if (jaar   && String(p.leerjaar) !== jaar) return false;
      if (thema  && p.thema !== thema) return false;
      if (query  && !p.titel.toLowerCase().includes(query) &&
          !p.beschrijving.toLowerCase().includes(query) &&
          !p.thema.toLowerCase().includes(query)) return false;
      return true;
    });

    if (countEl) countEl.textContent = `${filtered.length} pakket${filtered.length !== 1 ? 'ten' : ''} gevonden`;

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-results" style="grid-column:1/-1"><p>Geen pakketten gevonden voor deze filters.</p><p style="font-size:.85rem;margin-top:.5rem">Probeer een bredere zoekopdracht.</p></div>`;
    } else {
      grid.innerHTML = filtered.map(p => pakketCardHTML(p)).join('');
    }
  }

  [filterNiveau, filterJaar, filterThema].forEach(el => {
    el?.addEventListener('change', applyFilters);
  });
  searchInput?.addEventListener('input', applyFilters);
  filterReset?.addEventListener('click', () => {
    if (filterNiveau) filterNiveau.value = '';
    if (filterJaar)   filterJaar.value   = '';
    if (filterThema)  filterThema.value  = '';
    if (searchInput)  searchInput.value  = '';
    applyFilters();
  });

  applyFilters();
}

// ── Detail page ───────────────────────────────
function initDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const pakket = PAKKETTEN.find(p => p.id === id) || PAKKETTEN[0];

  // Fill in data
  const titleEl   = document.getElementById('detail-titel');
  const metaEl    = document.getElementById('detail-meta');
  const descEl    = document.getElementById('detail-beschrijving');
  const lessonsEl = document.getElementById('detail-lessen');
  const inclEl    = document.getElementById('detail-inclusieven');
  const prijsEl   = document.getElementById('detail-prijs');
  const breadEl   = document.getElementById('detail-breadcrumb-titel');

  if (titleEl)  titleEl.textContent  = pakket.titel;
  if (breadEl)  breadEl.textContent  = pakket.titel;
  if (descEl)   descEl.textContent   = pakket.beschrijving;
  if (prijsEl)  prijsEl.innerHTML    = `<sup>€</sup>${pakket.prijs.toFixed(2).replace('.',',')} <small style="font-size:.9rem;font-weight:400;color:#78716C">/ les</small>`;

  if (metaEl) {
    metaEl.innerHTML = `
      <span class="tag tag-niveau">${pakket.niveau}</span>
      <span class="tag tag-jaar">Jaar ${pakket.leerjaar}</span>
      <span class="tag tag-thema">${pakket.thema}</span>`;
  }

  if (lessonsEl) {
    lessonsEl.innerHTML = pakket.lessen.map(l => `
    <div class="detail-lesson-item">
      <div class="detail-lesson-icon ${l.type}">${lesIcon(l.type)}</div>
      <div class="detail-lesson-info">
        <h4>${l.titel}</h4>
        <p>${l.beschrijving}</p>
      </div>
      <span class="detail-lesson-lock">🔒</span>
    </div>`).join('');
  }

  if (inclEl) {
    inclEl.innerHTML = pakket.inclusieven.map(i => `
    <div class="included-item">${i}</div>`).join('');
  }

  // Buy buttons — placeholder (no real payment yet)
  document.querySelectorAll('.btn-koop').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Betalingsintegratie komt binnenkort beschikbaar!');
    });
  });
}

// ── Prijzen page ──────────────────────────────
function initPrijzenPage() {
  document.querySelectorAll('.btn-koop-prijs').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Betalingsintegratie komt binnenkort beschikbaar!');
    });
  });
}

// ── Workshop tabs ─────────────────────────────
function initWorkshopTabs() {
  const tabs    = document.querySelectorAll('.program-tab');
  const panels  = document.querySelectorAll('.program-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// ── Contact form ──────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Bedankt voor je bericht! We nemen zo snel mogelijk contact op.');
    form.reset();
  });
}

// ── Auth forms ────────────────────────────────
function initAuthForms() {
  const loginForm = document.getElementById('login-form');
  const regForm   = document.getElementById('register-form');

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Inloggen is nog niet gekoppeld aan een backend.');
  });

  regForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Registratie is nog niet gekoppeld aan een backend.');
  });
}

// ── Search hero form ──────────────────────────
function initHeroSearch() {
  const form = document.getElementById('hero-search-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const niveau  = form.querySelector('[name=niveau]')?.value || '';
    const leerjaar = form.querySelector('[name=leerjaar]')?.value || '';
    const query   = form.querySelector('[name=query]')?.value || '';
    const params  = new URLSearchParams();
    if (niveau)   params.set('niveau', niveau);
    if (leerjaar) params.set('leerjaar', leerjaar);
    if (query)    params.set('q', query);
    window.location.href = `pakketten.html?${params.toString()}`;
  });
}

// ── Toast notification ────────────────────────
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(80px);
      background:#292524;color:#fff;padding:.75rem 1.5rem;border-radius:999px;
      font-size:.88rem;font-family:inherit;z-index:9999;transition:transform .3s ease;
      box-shadow:0 8px 24px rgba(0,0,0,.2);white-space:nowrap;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
      toast.style.transform = 'translateX(-50%) translateY(80px)';
    }, 3200);
  });
}

// ── Utility ───────────────────────────────────
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderHomePakketten();
  renderReviews();
  initPakkettenPage();
  initDetailPage();
  initPrijzenPage();
  initWorkshopTabs();
  initContactForm();
  initAuthForms();
  initHeroSearch();

  // Pre-fill filters from URL params (pakketten page)
  const params = new URLSearchParams(window.location.search);
  if (params.get('niveau')) {
    const el = document.getElementById('filter-niveau');
    if (el) { el.value = params.get('niveau'); el.dispatchEvent(new Event('change')); }
  }
  if (params.get('leerjaar')) {
    const el = document.getElementById('filter-jaar');
    if (el) { el.value = params.get('leerjaar'); el.dispatchEvent(new Event('change')); }
  }
  if (params.get('q')) {
    const el = document.getElementById('search-input');
    if (el) { el.value = params.get('q'); el.dispatchEvent(new Event('input')); }
  }
});
