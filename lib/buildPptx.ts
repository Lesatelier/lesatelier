import PptxGenJS from 'pptxgenjs';
import type { LessonJSON, PowerPointSlide } from '@/types/lesson';

type ShapeName = Parameters<PptxGenJS.Slide['addShape']>[0];

// ── Brand palette ────────────────────────────────────────────────────────────
const NAVY = '1B2A6B';
const NAVY_DEEP = '14205A';
const SOFT_BG = 'F0F4FA';        // page background
const SOFT_BORDER = 'CADCFC';
const TABLE_HEADER_BG = 'DDE7F5';
const RED = 'CC0000';
const WHITE = 'FFFFFF';
const GREY_TIMER = 'E5E9F0';
const GREY_TEXT = '4A5568';

// ── Layout (16:9, inches) ─────────────────────────────────────────────────────
const W = 13.333;
const H = 7.5;
const MARGIN = 0.6;

// ── Image fetching via Pollinations.ai (free, no auth) ────────────────────────

async function fetchImage(query: string, seed: number): Promise<string | null> {
  try {
    const prompt = `professional editorial stock photo, ${query}, natural lighting, high quality, photorealistic, no text`;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=768&nologo=true&seed=${seed}&model=flux`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) return null;
    return `data:image/jpeg;base64,${buf.toString('base64')}`;
  } catch {
    return null;
  }
}

/** Fetch all images in parallel; returns Map<slideNumber, dataUrl|null>. */
async function preloadImages(slides: PowerPointSlide[]): Promise<Map<number, string>> {
  const out = new Map<number, string>();
  const tasks = slides
    .filter((s) => s.imageQuery && s.imageQuery.trim().length > 0)
    .slice(0, 10) // cap total images for performance
    .map(async (s, idx) => {
      const dataUrl = await fetchImage(s.imageQuery!, 1000 + idx);
      if (dataUrl) out.set(s.slideNumber, dataUrl);
    });
  await Promise.allSettled(tasks);
  return out;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function setBackground(p: PptxGenJS.Slide) {
  p.background = { color: SOFT_BG };
}

function addTitle(
  p: PptxGenJS.Slide,
  text: string,
  opts: { x?: number; y?: number; w?: number; h?: number; size?: number } = {}
) {
  p.addText(text, {
    x: opts.x ?? MARGIN,
    y: opts.y ?? 0.5,
    w: opts.w ?? W - 2 * MARGIN,
    h: opts.h ?? 1.0,
    fontSize: opts.size ?? 36,
    bold: true,
    color: NAVY,
    fontFace: 'Calibri',
    align: 'left',
    valign: 'top',
    wrap: true,
  });
}

function addBodyBullets(
  p: PptxGenJS.Slide,
  items: string[],
  opts: { x?: number; y?: number; w?: number; h?: number; size?: number; color?: string } = {}
) {
  if (!items.length) return;
  const blocks = items.map((text) => ({
    text,
    options: {
      bullet: { type: 'bullet' as const },
      fontSize: opts.size ?? 18,
      color: opts.color ?? NAVY,
      fontFace: 'Calibri',
      paraSpaceAfter: 8,
    },
  }));
  p.addText(blocks, {
    x: opts.x ?? MARGIN,
    y: opts.y ?? 1.8,
    w: opts.w ?? W - 2 * MARGIN,
    h: opts.h ?? 5.0,
    valign: 'top',
    wrap: true,
  });
}

function addPlainBody(p: PptxGenJS.Slide, lines: string[], opts: { x?: number; y?: number; w?: number; h?: number; size?: number; color?: string } = {}) {
  if (!lines.length) return;
  const blocks = lines.map((text) => ({
    text,
    options: {
      fontSize: opts.size ?? 18,
      color: opts.color ?? NAVY,
      fontFace: 'Calibri',
      paraSpaceAfter: 6,
    },
  }));
  p.addText(blocks, {
    x: opts.x ?? MARGIN,
    y: opts.y ?? 1.8,
    w: opts.w ?? W - 2 * MARGIN,
    h: opts.h ?? 5.0,
    valign: 'top',
    wrap: true,
  });
}

function addImage(p: PptxGenJS.Slide, dataUrl: string | undefined, x: number, y: number, w: number, h: number) {
  if (dataUrl) {
    p.addImage({ data: dataUrl, x, y, w, h, sizing: { type: 'cover', w, h } });
  } else {
    // Stylish placeholder card
    p.addShape('roundRect' as ShapeName, {
      x, y, w, h,
      fill: { color: SOFT_BORDER },
      line: { color: SOFT_BORDER },
      rectRadius: 0.15,
    });
    p.addText('🖼️', {
      x, y, w, h,
      fontSize: 48,
      align: 'center',
      valign: 'middle',
      color: NAVY,
      fontFace: 'Calibri',
    });
  }
}

function addTimerWidget(p: PptxGenJS.Slide, time: string, x: number, y: number) {
  // time format "5:00" or "2:30"
  const [m, s] = time.split(':');
  const w = 3.0;
  const h = 1.5;
  const boxW = (w - 0.2) / 2;

  // Background card
  p.addShape('roundRect' as ShapeName, {
    x, y, w, h,
    fill: { color: GREY_TIMER },
    line: { color: GREY_TIMER },
    rectRadius: 0.12,
  });

  // Minutes box
  p.addShape('roundRect' as ShapeName, {
    x: x + 0.1, y: y + 0.1, w: boxW - 0.05, h: h - 0.6,
    fill: { color: WHITE },
    line: { color: WHITE },
    rectRadius: 0.08,
  });
  p.addText(m ?? '0', {
    x: x + 0.1, y: y + 0.1, w: boxW - 0.05, h: h - 0.85,
    fontSize: 36, bold: true, color: NAVY, fontFace: 'Calibri', align: 'center', valign: 'middle',
  });
  p.addText('m', {
    x: x + 0.1, y: y + h - 0.85, w: boxW - 0.05, h: 0.25,
    fontSize: 11, color: GREY_TEXT, fontFace: 'Calibri', align: 'center', valign: 'top',
  });

  // Seconds box
  p.addShape('roundRect' as ShapeName, {
    x: x + boxW + 0.15, y: y + 0.1, w: boxW - 0.05, h: h - 0.6,
    fill: { color: WHITE },
    line: { color: WHITE },
    rectRadius: 0.08,
  });
  p.addText(s ?? '00', {
    x: x + boxW + 0.15, y: y + 0.1, w: boxW - 0.05, h: h - 0.85,
    fontSize: 36, bold: true, color: NAVY, fontFace: 'Calibri', align: 'center', valign: 'middle',
  });
  p.addText('s', {
    x: x + boxW + 0.15, y: y + h - 0.85, w: boxW - 0.05, h: 0.25,
    fontSize: 11, color: GREY_TEXT, fontFace: 'Calibri', align: 'center', valign: 'top',
  });

  // Progress bar
  p.addShape('roundRect' as ShapeName, {
    x: x + 0.15, y: y + h - 0.4, w: w - 0.3, h: 0.18,
    fill: { color: WHITE },
    line: { color: WHITE },
    rectRadius: 0.05,
  });
  p.addShape('roundRect' as ShapeName, {
    x: x + 0.15, y: y + h - 0.4, w: (w - 0.3) * 0.45, h: 0.18,
    fill: { color: SOFT_BORDER },
    line: { color: SOFT_BORDER },
    rectRadius: 0.05,
  });
}

function addHandoutRef(p: PptxGenJS.Slide, ref: string) {
  p.addText(`📄 Noteer dit bij ${ref} in je boekje.`, {
    x: MARGIN, y: H - 0.6, w: W - 2 * MARGIN, h: 0.35,
    fontSize: 13, italic: true, color: GREY_TEXT, fontFace: 'Calibri',
  });
}

function addSlideNumber(p: PptxGenJS.Slide, num: number, total: number) {
  p.addText(`${num} / ${total}`, {
    x: W - 1.2, y: H - 0.4, w: 1.0, h: 0.3,
    fontSize: 10, color: '999999', fontFace: 'Calibri', align: 'right',
  });
}

function addEmphasizedBullets(p: PptxGenJS.Slide, items: string[], y: number) {
  if (!items.length) return;
  const blocks = items.map((text) => ({
    text,
    options: {
      fontSize: 22,
      bold: true,
      color: RED,
      fontFace: 'Calibri',
      paraSpaceAfter: 10,
      align: 'center' as const,
    },
  }));
  p.addText(blocks, {
    x: MARGIN, y, w: W - 2 * MARGIN, h: H - y - 0.5,
    valign: 'top', wrap: true, align: 'center',
  });
}

// ── Slide builders ────────────────────────────────────────────────────────────

function buildTitleSlide(p: PptxGenJS.Slide, slide: PowerPointSlide, total: number, image?: string) {
  setBackground(p);
  // Big image card on top
  addImage(p, image, MARGIN, 0.5, W - 2 * MARGIN, 4.6);
  // Title below
  p.addText(slide.title, {
    x: MARGIN, y: 5.4, w: W - 2 * MARGIN, h: 1.4,
    fontSize: 40, bold: true, color: NAVY, fontFace: 'Calibri',
    align: 'left', valign: 'top', wrap: true,
  });
  if (slide.subtitle) {
    p.addText(slide.subtitle, {
      x: MARGIN, y: 6.7, w: W - 2 * MARGIN, h: 0.5,
      fontSize: 16, color: GREY_TEXT, fontFace: 'Calibri', italic: true,
    });
  }
  addSlideNumber(p, slide.slideNumber, total);
}

function buildTransparencySlide(p: PptxGenJS.Slide, slide: PowerPointSlide, total: number) {
  setBackground(p);
  // Red side bar
  p.addShape('rect' as ShapeName, {
    x: MARGIN, y: 0.5, w: 0.12, h: H - 1.0,
    fill: { color: RED }, line: { color: RED },
  });
  addTitle(p, slide.title, { x: MARGIN + 0.4, y: 0.5, h: 1.1, size: 38 });
  addBodyBullets(p, slide.bullets ?? [], {
    x: MARGIN + 0.4, y: 1.9, w: W - MARGIN - 0.4 - MARGIN, h: 4.5, size: 22,
  });
  addSlideNumber(p, slide.slideNumber, total);
}

function buildGoalsSlide(p: PptxGenJS.Slide, slide: PowerPointSlide, total: number) {
  setBackground(p);
  addTitle(p, slide.title || 'Lesdoelen', { size: 40 });
  if (slide.subtitle) {
    p.addText(slide.subtitle, {
      x: MARGIN, y: 1.7, w: W - 2 * MARGIN, h: 0.5,
      fontSize: 20, color: NAVY, fontFace: 'Calibri',
    });
  }
  // Numbered list (no bullets, big numbers)
  const items = slide.bullets ?? [];
  const startY = slide.subtitle ? 2.5 : 2.0;
  const lineH = 0.7;
  items.forEach((item, i) => {
    p.addText(item, {
      x: MARGIN + 0.2, y: startY + i * lineH, w: W - 2 * MARGIN - 0.2, h: lineH,
      fontSize: 22, color: NAVY, fontFace: 'Calibri', valign: 'top',
    });
  });
  addSlideNumber(p, slide.slideNumber, total);
}

function buildProgrammaSlide(p: PptxGenJS.Slide, slide: PowerPointSlide, total: number, image?: string) {
  setBackground(p);
  // Image on left (full height, half width)
  const halfW = (W - 3 * MARGIN) / 2;
  addImage(p, image, MARGIN, MARGIN, halfW, H - 2 * MARGIN);
  // Title and content on right
  const rightX = MARGIN + halfW + MARGIN;
  addTitle(p, slide.title || 'Programma', { x: rightX, y: 1.0, w: halfW, h: 1.0, size: 36 });
  addBodyBullets(p, slide.bullets ?? [], {
    x: rightX, y: 2.2, w: halfW, h: H - 3.0, size: 20,
  });
  addSlideNumber(p, slide.slideNumber, total);
}

function buildBigTitleSlide(p: PptxGenJS.Slide, slide: PowerPointSlide, total: number) {
  setBackground(p);
  p.addText(slide.title, {
    x: MARGIN, y: H / 2 - 1.2, w: W - 2 * MARGIN, h: 1.4,
    fontSize: 60, bold: true, color: NAVY, fontFace: 'Calibri',
    align: 'center', valign: 'middle',
  });
  if (slide.subtitle) {
    p.addText(slide.subtitle, {
      x: MARGIN, y: H / 2 + 0.4, w: W - 2 * MARGIN, h: 0.8,
      fontSize: 22, color: NAVY, fontFace: 'Calibri', align: 'center', bold: true,
    });
  }
  addSlideNumber(p, slide.slideNumber, total);
}

function buildDiscussionSlide(p: PptxGenJS.Slide, slide: PowerPointSlide, total: number) {
  setBackground(p);
  addTitle(p, slide.title, { size: 38 });
  // Body — left half if timer is present, full width otherwise
  const hasTimer = slide.timer && slide.timer.trim().length > 0;
  const bodyW = hasTimer ? W - 5.0 : W - 2 * MARGIN;
  addBodyBullets(p, slide.bullets ?? [], {
    x: MARGIN, y: 2.0, w: bodyW, h: 4.5, size: 22,
  });
  if (hasTimer) {
    addTimerWidget(p, slide.timer!, W - 4.0, 1.6);
  }
  if (slide.handoutRef) addHandoutRef(p, slide.handoutRef);
  addSlideNumber(p, slide.slideNumber, total);
}

function buildContentSlide(p: PptxGenJS.Slide, slide: PowerPointSlide, total: number, image?: string) {
  setBackground(p);
  const hasImage = !!slide.imageQuery;

  if (hasImage) {
    // Two-column: text left (55%), image right (40%)
    const leftW = (W - 3 * MARGIN) * 0.55;
    const rightX = MARGIN + leftW + MARGIN;
    const rightW = W - rightX - MARGIN;

    addTitle(p, slide.title, { x: MARGIN, y: 1.0, w: leftW, h: 1.0, size: 34 });
    addBodyBullets(p, slide.bullets ?? [], {
      x: MARGIN, y: 2.2, w: leftW, h: H - 3.0, size: 19,
    });
    addImage(p, image, rightX, 1.0, rightW, H - 2.0);
  } else {
    addTitle(p, slide.title, { size: 38 });
    addBodyBullets(p, slide.bullets ?? [], { y: 2.0, size: 22 });
  }

  if (slide.handoutRef) addHandoutRef(p, slide.handoutRef);
  addSlideNumber(p, slide.slideNumber, total);
}

function buildAssignmentSlide(p: PptxGenJS.Slide, slide: PowerPointSlide, total: number, image?: string) {
  setBackground(p);
  // Title left, timer top right
  addTitle(p, slide.title, { x: MARGIN, y: 0.5, w: W - 4.5, h: 1.1, size: 36 });
  if (slide.timer) addTimerWidget(p, slide.timer, W - 3.6, 0.6);

  const hasImage = !!slide.imageQuery;
  if (hasImage) {
    const leftW = (W - 3 * MARGIN) * 0.55;
    const rightX = MARGIN + leftW + MARGIN;
    const rightW = W - rightX - MARGIN;

    addBodyBullets(p, slide.bullets ?? [], {
      x: MARGIN, y: 2.4, w: leftW, h: H - 3.5, size: 19,
    });
    addImage(p, image, rightX, 2.4, rightW, H - 3.5);
  } else {
    addBodyBullets(p, slide.bullets ?? [], { y: 2.4, size: 22 });
  }

  if (slide.handoutRef) addHandoutRef(p, slide.handoutRef);
  addSlideNumber(p, slide.slideNumber, total);
}

function buildTableSlide(p: PptxGenJS.Slide, slide: PowerPointSlide, total: number) {
  setBackground(p);
  addTitle(p, slide.title, { size: 36 });

  if (slide.table && slide.table.rows.length > 0) {
    const t = slide.table;
    const rows: PptxGenJS.TableRow[] = [
      t.headers.map((h) => ({
        text: h,
        options: {
          bold: true, color: NAVY, fontFace: 'Calibri', fontSize: 16,
          fill: { color: TABLE_HEADER_BG },
          align: 'left' as const, valign: 'middle' as const,
        },
      })),
      ...t.rows.map((row, ri) =>
        row.map((cell) => ({
          text: cell,
          options: {
            fontFace: 'Calibri', fontSize: 14, color: NAVY,
            fill: { color: ri % 2 === 0 ? WHITE : SOFT_BG },
            align: 'left' as const, valign: 'top' as const,
          },
        }))
      ),
    ];
    p.addTable(rows, {
      x: MARGIN, y: 1.7, w: W - 2 * MARGIN,
      border: { type: 'solid', pt: 0.5, color: SOFT_BORDER },
      rowH: 0.6,
    });
  } else if (slide.bullets && slide.bullets.length) {
    // bullet list (used for Nakijken slides)
    addPlainBody(p, slide.bullets, { y: 1.8, size: 20 });
  }

  // Emphasized bullets (red, e.g. "Nog meer?")
  if (slide.emphasizedBullets && slide.emphasizedBullets.length) {
    addEmphasizedBullets(p, slide.emphasizedBullets, H - 2.0);
  }

  addSlideNumber(p, slide.slideNumber, total);
}

function buildClosingSlide(p: PptxGenJS.Slide, slide: PowerPointSlide, total: number, image?: string) {
  setBackground(p);
  // Big centered title with image below or behind
  if (slide.imageQuery) {
    addImage(p, image, MARGIN, 0.5, W - 2 * MARGIN, 4.0);
    p.addText(slide.title, {
      x: MARGIN, y: 5.0, w: W - 2 * MARGIN, h: 1.5,
      fontSize: 44, bold: true, color: NAVY, fontFace: 'Calibri',
      align: 'center', valign: 'middle',
    });
  } else {
    p.addText(slide.title, {
      x: MARGIN, y: H / 2 - 1.0, w: W - 2 * MARGIN, h: 2.0,
      fontSize: 54, bold: true, color: NAVY, fontFace: 'Calibri',
      align: 'center', valign: 'middle',
    });
  }
  if (slide.bullets && slide.bullets.length) {
    addPlainBody(p, slide.bullets, { y: H - 2.0, size: 18 });
  }
  addSlideNumber(p, slide.slideNumber, total);
}

function buildExitTicketSlide(p: PptxGenJS.Slide, slide: PowerPointSlide, total: number) {
  setBackground(p);
  // Red-ish accent header
  p.addShape('rect' as ShapeName, {
    x: 0, y: 0, w: W, h: 0.18,
    fill: { color: RED }, line: { color: RED },
  });
  addTitle(p, slide.title || 'Exit-ticket', { y: 0.6, size: 40 });
  addBodyBullets(p, slide.bullets ?? [], { y: 2.0, size: 22 });
  addSlideNumber(p, slide.slideNumber, total);
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function buildPptx(lesson: LessonJSON): Promise<Buffer> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Lessengenerator';

  const slides = lesson.powerpoint.slides;
  const total = slides.length;

  // Pre-fetch images in parallel
  const images = await preloadImages(slides);

  for (const slide of slides) {
    const p = pptx.addSlide();
    const img = images.get(slide.slideNumber);

    switch (slide.type) {
      case 'title':         buildTitleSlide(p, slide, total, img); break;
      case 'transparency':  buildTransparencySlide(p, slide, total); break;
      case 'goals':         buildGoalsSlide(p, slide, total); break;
      case 'programma':     buildProgrammaSlide(p, slide, total, img); break;
      case 'big-title':     buildBigTitleSlide(p, slide, total); break;
      case 'discussion':    buildDiscussionSlide(p, slide, total); break;
      case 'content':       buildContentSlide(p, slide, total, img); break;
      case 'assignment':    buildAssignmentSlide(p, slide, total, img); break;
      case 'table':         buildTableSlide(p, slide, total); break;
      case 'closing':       buildClosingSlide(p, slide, total, img); break;
      case 'exit-ticket':   buildExitTicketSlide(p, slide, total); break;
      default:              buildContentSlide(p, slide, total, img); break;
    }
  }

  const buffer = await pptx.write({ outputType: 'nodebuffer' });
  return buffer as Buffer;
}
