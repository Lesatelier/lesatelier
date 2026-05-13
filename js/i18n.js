/* =============================================
   LesHub.nl — Internationalisatie (i18n)
   Ondersteunde talen: NL, EN, ES, FR, DE
   ============================================= */

const TRANSLATIONS = {
  nl: {
    nav: {
      pakketten: 'Pakketten',
      prijzen: 'Prijzen',
      workshops: 'Workshops',
      overons: 'Over mij',
      inloggen: 'Inloggen',
      gratis_proberen: 'Gratis proberen',
    },
    hero: {
      tagline: 'Voor docenten Nederlands',
      title: 'Kant-en-klare lespakketten voor het',
      title_span: 'voortgezet onderwijs',
      subtitle: 'Professionele, themagebonden lespakketten voor lezen, schrijven en luisteren. Direct inzetbaar in de klas.',
      cta_primary: 'Bekijk pakketten',
      cta_secondary: 'Meer informatie',
      stat_pakketten: 'Pakketten',
      stat_docenten: 'Docenten',
      stat_niveaus: 'Niveaus',
    },
    search: {
      label_zoek: 'Zoek een pakket',
      placeholder_zoek: 'Bijv. nepnieuws, romantiek…',
      label_niveau: 'Niveau',
      label_leerjaar: 'Leerjaar',
      label_thema: 'Thema',
      btn_zoek: 'Zoeken',
      alle_niveaus: 'Alle niveaus',
      alle_leerjaren: 'Alle leerjaren',
      alle_themas: 'Alle thema\'s',
    },
    pakketten: {
      title: 'Themapakketten',
      subtitle: 'Zorgvuldig samengestelde pakketten per thema, niveau en leerjaar.',
      per_les: 'per les',
      bekijk: 'Bekijk pakket',
      lessen: 'lessen',
    },
    reviews: {
      title: 'Wat docenten zeggen',
      subtitle: 'Meer dan 500 docenten gingen je al voor.',
    },
    prijzen: {
      title: 'Transparante prijzen',
      subtitle: 'Kies wat bij jou past.',
      los: 'Los pakket',
      maand: 'Maandabonnement',
      jaar: 'Jaarabonnement',
      per_les: 'per les',
      per_maand: 'per maand',
      per_jaar: 'per jaar',
      populair: 'Meest gekozen',
      cta: 'Aan de slag',
    },
    workshops: {
      title: 'Workshops & trainingen',
      subtitle: 'Voor scholen, secties en bedrijven.',
    },
    overons: {
      title: 'Over mij',
      subtitle: 'De maker achter LesHub en de visie op onderwijs en AI.',
    },
    footer: {
      tagline: 'Kwalitatieve lesmaterialen voor docenten Nederlands.',
      platform: 'Platform',
      support: 'Ondersteuning',
      bedrijf: 'Bedrijf',
      privacy: 'Privacybeleid',
      voorwaarden: 'Algemene voorwaarden',
      cookies: 'Cookiebeleid',
      copyright: '© 2025 LesHub.nl — Alle rechten voorbehouden',
    },
  },
  en: {
    nav: {
      pakketten: 'Packages',
      prijzen: 'Pricing',
      workshops: 'Workshops',
      overons: 'About',
      inloggen: 'Log in',
      gratis_proberen: 'Try for free',
    },
    hero: {
      tagline: 'For Dutch teachers',
      title: 'Ready-to-use lesson packages for',
      title_span: 'secondary education',
      subtitle: 'Professional, theme-based lesson packages for reading, writing and listening. Ready to use in class.',
      cta_primary: 'Browse packages',
      cta_secondary: 'Learn more',
      stat_pakketten: 'Packages',
      stat_docenten: 'Teachers',
      stat_niveaus: 'Levels',
    },
    search: {
      label_zoek: 'Search a package',
      placeholder_zoek: 'E.g. fake news, romanticism…',
      label_niveau: 'Level',
      label_leerjaar: 'Year',
      label_thema: 'Theme',
      btn_zoek: 'Search',
      alle_niveaus: 'All levels',
      alle_leerjaren: 'All years',
      alle_themas: 'All themes',
    },
    pakketten: {
      title: 'Theme packages',
      subtitle: 'Carefully assembled packages per theme, level and year.',
      per_les: 'per lesson',
      bekijk: 'View package',
      lessen: 'lessons',
    },
    reviews: {
      title: 'What teachers say',
      subtitle: 'Over 500 teachers have already gone before you.',
    },
    prijzen: {
      title: 'Transparent pricing',
      subtitle: 'Choose what suits you.',
      los: 'Single package',
      maand: 'Monthly',
      jaar: 'Annual',
      per_les: 'per lesson',
      per_maand: 'per month',
      per_jaar: 'per year',
      populair: 'Most popular',
      cta: 'Get started',
    },
    workshops: {
      title: 'Workshops & training',
      subtitle: 'For schools, departments and companies.',
    },
    overons: {
      title: 'About',
      subtitle: 'The maker behind LesHub and the vision on education and AI.',
    },
    footer: {
      tagline: 'Quality lesson materials for Dutch teachers.',
      platform: 'Platform',
      support: 'Support',
      bedrijf: 'Company',
      privacy: 'Privacy policy',
      voorwaarden: 'Terms of service',
      cookies: 'Cookie policy',
      copyright: '© 2025 LesHub.nl — All rights reserved',
    },
  },
  de: {
    nav: {
      pakketten: 'Pakete',
      prijzen: 'Preise',
      workshops: 'Workshops',
      overons: 'Über uns',
      inloggen: 'Anmelden',
      gratis_proberen: 'Kostenlos testen',
    },
  },
  fr: {
    nav: {
      pakketten: 'Forfaits',
      prijzen: 'Tarifs',
      workshops: 'Ateliers',
      overons: 'À propos',
      inloggen: 'Connexion',
      gratis_proberen: 'Essai gratuit',
    },
  },
  es: {
    nav: {
      pakketten: 'Paquetes',
      prijzen: 'Precios',
      workshops: 'Talleres',
      overons: 'Nosotros',
      inloggen: 'Iniciar sesión',
      gratis_proberen: 'Prueba gratis',
    },
  },
};

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('leshub_lang') || 'nl';
    this.fallback = 'nl';
  }

  t(key) {
    const keys = key.split('.');
    let val = TRANSLATIONS[this.currentLang];
    for (const k of keys) {
      val = val?.[k];
    }
    if (val === undefined) {
      // fallback to NL
      let fb = TRANSLATIONS[this.fallback];
      for (const k of keys) fb = fb?.[k];
      return fb || key;
    }
    return val;
  }

  setLang(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('leshub_lang', lang);
    this.applyTranslations();
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translation = this.t(key);
      if (translation) el.textContent = translation;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const translation = this.t(key);
      if (translation) el.placeholder = translation;
    });
    // Update lang select
    const selects = document.querySelectorAll('.lang-select');
    selects.forEach(s => s.value = this.currentLang);
  }

  init() {
    document.querySelectorAll('.lang-select').forEach(select => {
      select.value = this.currentLang;
      select.addEventListener('change', (e) => this.setLang(e.target.value));
    });
    this.applyTranslations();
  }
}

const i18n = new I18n();
document.addEventListener('DOMContentLoaded', () => i18n.init());
