// ── Form input ────────────────────────────────────────────────────────────────

export type KlasNiveau =
  | 'VMBO-KGT 1' | 'VMBO-KGT 2' | 'VMBO-KGT 3' | 'VMBO-KGT 4'
  | 'HAVO 1' | 'HAVO 2' | 'HAVO 3' | 'HAVO 4' | 'HAVO 5'
  | 'VWO 1' | 'VWO 2' | 'VWO 3' | 'VWO 4' | 'VWO 5' | 'VWO 6'
  | 'MBO niveau 1' | 'MBO niveau 2' | 'MBO niveau 3' | 'MBO niveau 4';

export type Lesduur = '45 minuten' | '60 minuten' | '80 minuten' | '90 minuten' | '100 minuten';

export type Werkvorm =
  | 'Voelen–Vatten–Verwerken'
  | 'Directe instructie'
  | 'Coöperatief leren'
  | 'Projectonderwijs'
  | 'Socratisch gesprek';

export type Autonomie = 'Vaste opdracht' | 'Deels vrij' | 'Vrije onderwerpkeuze';

export interface LesFormData {
  vak: string;
  klas: KlasNiveau;
  thema: string;
  lesduur: Lesduur;
  werkvorm: Werkvorm;
  autonomie: Autonomie;
  aiAnalyse: boolean;
  bijzonderheden: string;
}

// ── Claude JSON response ───────────────────────────────────────────────────────

export type SlideType =
  | 'title'              // openingsslide met grote foto en overlay-titel
  | 'transparency'       // "Een eerlijke mededeling"
  | 'goals'              // lesdoelen, opsomming
  | 'programma'          // programma-overzicht (genummerde lijst, foto rechts)
  | 'big-title'          // sectiescheider met alleen een grote titel in het midden
  | 'discussion'         // bespreek-vraag (groot, korte tekst)
  | 'content'            // standaard content-slide met tekst en evt. foto
  | 'assignment'         // opdracht met timer-widget
  | 'table'              // tabel-content (bijv. nakijken)
  | 'closing'            // afsluiting
  | 'exit-ticket';

export interface PowerPointSlide {
  slideNumber: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  bullets?: string[];
  /** Korte Engelse zoekterm voor stockfoto, bijv. "students smartphone news" */
  imageQuery?: string;
  /** Optionele extra benadrukking onder de bullets (in rood). */
  emphasizedBullets?: string[];
  phase?: string;
  /** "5:00" of "2:30" — toont een timer-widget rechtsboven */
  timer?: string;
  /** "deel 4" — toont een gestileerde verwijzing onderaan */
  handoutRef?: string;
  table?: { headers: string[]; rows: string[][] };
}

export interface HandoutSection {
  id: string;
  title: string;
  instruction: string;
  time: string;
  grouping: string;
  questions: string[];
  bonusopdracht: string;
  support?: string[];
}

export interface LesdoelItem {
  nummer: string;
  bloom: string;
  doel: string;
}

export interface AntwoordItem {
  opdracht: string;
  modelantwoorden: string[];
}

export interface TijdplanItem {
  tijd: string;
  fase: string;
  activiteit: string;
  lesdoel: string;
}

export interface LessonJSON {
  powerpoint: {
    slides: PowerPointSlide[];
  };
  handout: {
    title: string;
    subtitle: string;
    lesdoelen: string[];
    sections: HandoutSection[];
    exitTicket: string[];
  };
  antwoordblad: {
    title: string;
    lesdoelenOverzicht: LesdoelItem[];
    antwoordenPerOpdracht: AntwoordItem[];
    differentiatieTips: Record<string, string>;
    beoordelingsRubric?: string[][];
    aiAnalyseObservaties?: string[];
  };
  oefendocument: {
    title: string;
    intro: string;
    oefeningen: Array<{
      nummer: number;
      opdracht: string;
      ruimte: 'klein' | 'middel' | 'groot';
    }>;
  };
  lesplanformulier: {
    basisgegevens: {
      vak: string;
      klas: string;
      thema: string;
      lesduur: string;
    };
    lesdoelen: string[];
    materialen: string[];
    tijdplanning: TijdplanItem[];
    didactischeAanpak: string[];
    differentiatie: {
      ondersteuning: string;
      verrijking: string;
    };
    evaluatie: string[];
  };
}

// ── API request/response shapes ────────────────────────────────────────────────

export interface GenerateRequest {
  formData: LesFormData;
}

export interface GenerateResponse {
  lessonData: LessonJSON;
}

export interface BuildDocumentsRequest {
  lessonData: LessonJSON;
  formData: LesFormData;
}

export interface BuildDocumentsResponse {
  zipBase64: string;
  filename: string;
  files: string[];
}
