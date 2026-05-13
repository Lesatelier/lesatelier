import {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, AlignmentType, WidthType, ShadingType,
  BorderStyle, convertInchesToTwip,
} from 'docx';
import type { LessonJSON, LesFormData } from '@/types/lesson';

// ── Colour constants ──────────────────────────────────────────────────────────
const DARK_BLUE = '1B2A6B';
const LIGHT_BLUE = 'CADCFC';
const RED = 'CC0000';
const WHITE = 'FFFFFF';

// ── Helpers ───────────────────────────────────────────────────────────────────

function sectionHeader(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        color: WHITE,
        size: 24,
        font: 'Calibri',
      }),
    ],
    shading: { type: ShadingType.SOLID, color: DARK_BLUE, fill: DARK_BLUE },
    spacing: { before: 200, after: 100 },
    indent: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
  });
}

function bodyParagraph(text: string, opts: { bold?: boolean; color?: string; size?: number } = {}): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: opts.bold,
        color: opts.color,
        size: opts.size ?? 22,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 80 },
  });
}

function bulletParagraph(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 22, font: 'Calibri' })],
    bullet: { level: 0 },
    spacing: { after: 60 },
  });
}

function writingLines(count: number): Paragraph[] {
  return Array.from({ length: count }, () =>
    new Paragraph({
      children: [new TextRun({ text: '________________________________________', size: 22, font: 'Calibri' })],
      spacing: { after: 120 },
    })
  );
}

function headerRow(cells: string[]): TableRow {
  return new TableRow({
    children: cells.map((text) =>
      new TableCell({
        children: [new Paragraph({
          children: [new TextRun({ text, bold: true, color: WHITE, size: 20, font: 'Calibri' })],
        })],
        shading: { type: ShadingType.SOLID, color: DARK_BLUE, fill: DARK_BLUE },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
      })
    ),
  });
}

function dataRow(cells: string[], shade = false): TableRow {
  return new TableRow({
    children: cells.map((text) =>
      new TableCell({
        children: [new Paragraph({
          children: [new TextRun({ text, size: 20, font: 'Calibri' })],
        })],
        shading: shade ? { type: ShadingType.SOLID, color: LIGHT_BLUE, fill: LIGHT_BLUE } : undefined,
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
      })
    ),
  });
}

function simpleBorders() {
  const b = { style: BorderStyle.SINGLE, size: 1, color: '999999' };
  return { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b };
}

// ── Handout ───────────────────────────────────────────────────────────────────

export async function buildHandout(lesson: LessonJSON, form: LesFormData): Promise<Buffer> {
  const { handout } = lesson;
  const children: (Paragraph | Table)[] = [];

  // Title block
  children.push(
    new Paragraph({
      children: [new TextRun({ text: handout.title, bold: true, size: 36, color: DARK_BLUE, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [new TextRun({ text: handout.subtitle, size: 22, font: 'Calibri', color: '444444' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    sectionHeader('Lesdoelen'),
  );

  handout.lesdoelen.forEach((d, i) =>
    children.push(bulletParagraph(`LD${i + 1}: ${d}`))
  );

  children.push(new Paragraph({ spacing: { after: 200 } }));

  // Sections
  handout.sections.forEach((s) => {
    children.push(
      sectionHeader(`Opdracht ${s.id}: ${s.title}`),
      bodyParagraph(`Tijd: ${s.time}  |  Werkvorm: ${s.grouping}`, { color: '555555' }),
      bodyParagraph(s.instruction),
    );

    s.questions.forEach((q, i) => {
      children.push(bodyParagraph(`${i + 1}. ${q}`, { bold: true }));
      children.push(...writingLines(3));
    });

    // Support hint
    if (s.support && s.support.length) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: '💡 Hulp nodig? ', bold: true, size: 20, color: DARK_BLUE, font: 'Calibri' }),
            new TextRun({ text: s.support.join(' | '), size: 20, font: 'Calibri' })],
          spacing: { before: 60, after: 80 },
        })
      );
    }

    // Bonus
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: '⭐ Bonusopdracht: ', bold: true, size: 20, color: RED, font: 'Calibri' }),
          new TextRun({ text: s.bonusopdracht, size: 20, font: 'Calibri' }),
        ],
        spacing: { before: 60, after: 200 },
      })
    );
  });

  // Exit ticket
  children.push(sectionHeader('Exit-ticket'));
  handout.exitTicket.forEach((q, i) => {
    children.push(bodyParagraph(`${i + 1}. ${q}`, { bold: true }));
    children.push(...writingLines(2));
  });

  const doc = new Document({
    sections: [{ properties: {}, children }],
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 22 },
        },
      },
    },
  });

  return Buffer.from(await Packer.toBuffer(doc));
}

// ── Antwoordblad ──────────────────────────────────────────────────────────────

export async function buildAntwoordblad(lesson: LessonJSON, form: LesFormData): Promise<Buffer> {
  const { antwoordblad, handout } = lesson;
  const children: (Paragraph | Table)[] = [];

  children.push(
    new Paragraph({
      children: [new TextRun({ text: antwoordblad.title, bold: true, size: 36, color: DARK_BLUE, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [new TextRun({ text: '⚠️ UITSLUITEND VOOR DE DOCENT — NIET UITDELEN', bold: true, size: 22, color: RED, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    }),
  );

  // Lesdoelen overzicht table
  children.push(sectionHeader('1. Lesdoelen — overzicht'));
  const ldTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: simpleBorders(),
    rows: [
      headerRow(['Nr.', 'Lesdoel', 'Bloom-niveau']),
      ...antwoordblad.lesdoelenOverzicht.map((ld) =>
        dataRow([ld.nummer, ld.doel, ld.bloom])
      ),
    ],
  });
  children.push(ldTable, new Paragraph({ spacing: { after: 200 } }));

  // Tijdplanning
  children.push(sectionHeader('2. Lesoverzicht & tijdplanning'));
  const tpRows = lesson.lesplanformulier.tijdplanning;
  const tpTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: simpleBorders(),
    rows: [
      headerRow(['Tijd', 'Fase', 'Activiteit', 'Lesdoel']),
      ...tpRows.map((r, i) => dataRow([r.tijd, r.fase, r.activiteit, r.lesdoel], i % 2 === 1)),
    ],
  });
  children.push(tpTable, new Paragraph({ spacing: { after: 200 } }));

  // Modelantwoorden
  children.push(sectionHeader('3. Modelantwoorden per opdracht'));
  antwoordblad.antwoordenPerOpdracht.forEach((a) => {
    children.push(bodyParagraph(`Opdracht ${a.opdracht}`, { bold: true, color: DARK_BLUE }));
    a.modelantwoorden.forEach((ma) => children.push(bulletParagraph(ma)));
    children.push(new Paragraph({ spacing: { after: 160 } }));
  });

  // Differentiatie tips
  children.push(sectionHeader('4. Differentiatie & tips'));
  Object.entries(antwoordblad.differentiatieTips).forEach(([key, val]) => {
    children.push(bodyParagraph(`${key.toUpperCase()}: ${val}`));
  });

  // AI analyse (optional)
  if (antwoordblad.aiAnalyseObservaties?.length) {
    children.push(sectionHeader('5. AI-analyse modelobservaties'));
    antwoordblad.aiAnalyseObservaties.forEach((obs) => children.push(bulletParagraph(obs)));
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
  });

  return Buffer.from(await Packer.toBuffer(doc));
}

// ── Oefendocument ─────────────────────────────────────────────────────────────

export async function buildOefendocument(lesson: LessonJSON, form: LesFormData): Promise<Buffer> {
  const { oefendocument } = lesson;
  const children: (Paragraph | Table)[] = [];

  children.push(
    new Paragraph({
      children: [new TextRun({ text: oefendocument.title, bold: true, size: 36, color: DARK_BLUE, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    }),
    bodyParagraph(oefendocument.intro, { color: '444444' }),
    new Paragraph({ spacing: { after: 200 } }),
  );

  oefendocument.oefeningen.forEach((o) => {
    children.push(
      sectionHeader(`Oefening ${o.nummer}`),
      bodyParagraph(o.opdracht),
    );
    const lines = o.ruimte === 'groot' ? 6 : o.ruimte === 'middel' ? 4 : 2;
    children.push(...writingLines(lines));
    children.push(new Paragraph({ spacing: { after: 160 } }));
  });

  const doc = new Document({
    sections: [{ properties: {}, children }],
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
  });

  return Buffer.from(await Packer.toBuffer(doc));
}

// ── Lesplanformulier ──────────────────────────────────────────────────────────

export async function buildLesplanformulier(lesson: LessonJSON, form: LesFormData): Promise<Buffer> {
  const { lesplanformulier } = lesson;
  const children: (Paragraph | Table)[] = [];

  children.push(
    new Paragraph({
      children: [new TextRun({ text: 'Lesplanformulier', bold: true, size: 36, color: DARK_BLUE, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    }),
  );

  // Basisgegevens table
  children.push(sectionHeader('Basisgegevens'));
  const bg = lesplanformulier.basisgegevens;
  const bgTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: simpleBorders(),
    rows: [
      headerRow(['Veld', 'Waarde']),
      dataRow(['Vak', bg.vak], true),
      dataRow(['Klas / Niveau', bg.klas]),
      dataRow(['Thema', bg.thema], true),
      dataRow(['Lesduur', bg.lesduur]),
      dataRow(['Werkvorm', form.werkvorm], true),
    ],
  });
  children.push(bgTable, new Paragraph({ spacing: { after: 200 } }));

  // Lesdoelen
  children.push(sectionHeader('Lesdoelen (SMART + Bloom)'));
  lesplanformulier.lesdoelen.forEach((d, i) => children.push(bulletParagraph(`LD${i + 1}: ${d}`)));
  children.push(new Paragraph({ spacing: { after: 200 } }));

  // Materialen
  children.push(sectionHeader('Benodigde materialen'));
  lesplanformulier.materialen.forEach((m) => children.push(bulletParagraph(m)));
  children.push(new Paragraph({ spacing: { after: 200 } }));

  // Tijdplanning
  children.push(sectionHeader('Tijdplanning per fase'));
  const tpTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: simpleBorders(),
    rows: [
      headerRow(['Tijd', 'Fase', 'Activiteit', 'Lesdoel']),
      ...lesplanformulier.tijdplanning.map((r, i) =>
        dataRow([r.tijd, r.fase, r.activiteit, r.lesdoel], i % 2 === 1)
      ),
    ],
  });
  children.push(tpTable, new Paragraph({ spacing: { after: 200 } }));

  // Didactische aanpak
  children.push(sectionHeader('Didactische aanpak per fase'));
  lesplanformulier.didactischeAanpak.forEach((d) => children.push(bulletParagraph(d)));
  children.push(new Paragraph({ spacing: { after: 200 } }));

  // Differentiatie
  children.push(sectionHeader('Differentiatie'));
  children.push(bodyParagraph('Ondersteuning: ' + lesplanformulier.differentiatie.ondersteuning));
  children.push(bodyParagraph('Verrijking: ' + lesplanformulier.differentiatie.verrijking));
  children.push(new Paragraph({ spacing: { after: 200 } }));

  // Evaluatie
  children.push(sectionHeader('Evaluatie lesdoelen'));
  lesplanformulier.evaluatie.forEach((e) => children.push(bulletParagraph(e)));

  const doc = new Document({
    sections: [{ properties: {}, children }],
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
  });

  return Buffer.from(await Packer.toBuffer(doc));
}
