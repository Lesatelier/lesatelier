import JSZip from 'jszip';
import type { LessonJSON, LesFormData } from '@/types/lesson';
import { buildHandout, buildAntwoordblad, buildOefendocument, buildLesplanformulier } from './buildDocx';
import { buildPptx } from './buildPptx';

function safeFilename(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .slice(0, 40);
}

/** Ensure all arrays Claude might have omitted are at least empty arrays. */
function normalizeLesson(raw: LessonJSON): LessonJSON {
  return {
    powerpoint: {
      slides: (raw.powerpoint?.slides ?? []).map((s) => ({
        ...s,
        bullets: s.bullets ?? [],
        emphasizedBullets: s.emphasizedBullets ?? [],
      })),
    },
    handout: {
      title: raw.handout?.title ?? '',
      subtitle: raw.handout?.subtitle ?? '',
      lesdoelen: raw.handout?.lesdoelen ?? [],
      sections: (raw.handout?.sections ?? []).map((s) => ({
        ...s,
        questions: s.questions ?? [],
        support: s.support ?? [],
        bonusopdracht: s.bonusopdracht ?? '',
      })),
      exitTicket: raw.handout?.exitTicket ?? [],
    },
    antwoordblad: {
      title: raw.antwoordblad?.title ?? '',
      lesdoelenOverzicht: raw.antwoordblad?.lesdoelenOverzicht ?? [],
      antwoordenPerOpdracht: (raw.antwoordblad?.antwoordenPerOpdracht ?? []).map((a) => ({
        ...a,
        modelantwoorden: a.modelantwoorden ?? [],
      })),
      differentiatieTips: raw.antwoordblad?.differentiatieTips ?? {},
      aiAnalyseObservaties: raw.antwoordblad?.aiAnalyseObservaties ?? [],
    },
    oefendocument: {
      title: raw.oefendocument?.title ?? '',
      intro: raw.oefendocument?.intro ?? '',
      oefeningen: raw.oefendocument?.oefeningen ?? [],
    },
    lesplanformulier: {
      basisgegevens: raw.lesplanformulier?.basisgegevens ?? { vak: '', klas: '', thema: '', lesduur: '' },
      lesdoelen: raw.lesplanformulier?.lesdoelen ?? [],
      materialen: raw.lesplanformulier?.materialen ?? [],
      tijdplanning: raw.lesplanformulier?.tijdplanning ?? [],
      didactischeAanpak: raw.lesplanformulier?.didactischeAanpak ?? [],
      differentiatie: raw.lesplanformulier?.differentiatie ?? { ondersteuning: '', verrijking: '' },
      evaluatie: raw.lesplanformulier?.evaluatie ?? [],
    },
  };
}

export interface ZipResult {
  buffer: Buffer;
  filename: string;
  files: string[];
}

export async function buildZip(rawLesson: LessonJSON, form: LesFormData): Promise<ZipResult> {
  const lesson = normalizeLesson(rawLesson);
  const slug = safeFilename(`${form.thema}_${form.klas}`);
  const prefix = `les_${slug}`;

  const fileNames = {
    pptx: `${prefix}_presentatie.pptx`,
    handout: `${prefix}_handout_leerlingen.docx`,
    antwoord: `${prefix}_antwoordblad_docent.docx`,
    oefening: `${prefix}_oefendocument.docx`,
    lesplan: `${prefix}_lesplanformulier.docx`,
  };

  // Build all documents in parallel
  const [pptxBuf, handoutBuf, antwoordBuf, oefenBuf, lesplanBuf] = await Promise.all([
    buildPptx(lesson),
    buildHandout(lesson, form),
    buildAntwoordblad(lesson, form),
    buildOefendocument(lesson, form),
    buildLesplanformulier(lesson, form),
  ]);

  const zip = new JSZip();
  zip.file(fileNames.pptx, pptxBuf);
  zip.file(fileNames.handout, handoutBuf);
  zip.file(fileNames.antwoord, antwoordBuf);
  zip.file(fileNames.oefening, oefenBuf);
  zip.file(fileNames.lesplan, lesplanBuf);

  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  return {
    buffer: zipBuffer,
    filename: `${prefix}.zip`,
    files: Object.values(fileNames),
  };
}
