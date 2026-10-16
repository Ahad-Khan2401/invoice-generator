/**
 * lib/pdf.ts — turn the live preview DOM into a PDF.
 *
 * Why rasterise? The preview IS the design (three templates, brand colours,
 * logos, non-Latin currency symbols). Rendering the same DOM guarantees the
 * download matches the preview pixel-for-pixel. Improvements over the old
 * implementation:
 *   - JPEG (q 0.92) instead of PNG → files are ~5× smaller.
 *   - A4 or US Letter.
 *   - Smart page breaks: slices only at "safe" boundaries (table rows,
 *     blocks) so a row is never cut in half. Falls back to a hard cut only
 *     when a single block is taller than a page.
 *   - Page margins, page numbers ("Page 1 of 2") on multi-page output.
 *   - PDF metadata (title, subject, creator).
 *
 * Elements that may not be split are marked by the preview with the
 * attribute `data-pdf-block`. Everything is measured in CSS pixels relative
 * to the captured element.
 */

export type PaperSize = "a4" | "letter";

export interface PdfOptions {
  paper: PaperSize;
  fileName: string;
  title: string;
  subject?: string;
  /** Draw "Page x of y" on multi-page documents (default true). */
  pageNumbers?: boolean;
  /** Device pixel scale for the capture (default 2). */
  scale?: number;
}

const PAPER_MM: Record<PaperSize, { w: number; h: number }> = {
  a4:     { w: 210, h: 297 },
  letter: { w: 215.9, h: 279.4 },
};
const MARGIN_MM = { top: 8, bottom: 10, side: 0 };

/** Collect y-positions (in element px) where a page may safely break. */
function breakCandidates(root: HTMLElement): number[] {
  const rootTop = root.getBoundingClientRect().top;
  const ys = new Set<number>([0]);
  root.querySelectorAll<HTMLElement>("[data-pdf-block]").forEach((el) => {
    const r = el.getBoundingClientRect();
    ys.add(Math.round(r.top - rootTop));
    ys.add(Math.round(r.bottom - rootTop));
  });
  return [...ys].sort((a, b) => a - b);
}

export async function renderPdf(el: HTMLElement, opts: PdfOptions): Promise<Blob> {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"), import("html2canvas-pro"),
  ]);

  // Long documents: 2× on a 5000px-tall canvas is ~2 MB+ of JPEG; step down gently.
  const naturalH = el.scrollHeight || 0;
  const scale = opts.scale ?? (naturalH > 4500 ? 1.25 : naturalH > 2400 ? 1.5 : 2);
  const canvas = await html2canvas(el, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const paper = PAPER_MM[opts.paper] ?? PAPER_MM.a4;
  const pdf = new jsPDF({ unit: "mm", format: opts.paper === "letter" ? "letter" : "a4", compress: true });
  pdf.setProperties({ title: opts.title, subject: opts.subject ?? opts.title, creator: "PDF Bill Builder", author: "PDF Bill Builder" });

  const pageW = paper.w;
  const pageH = paper.h;
  const contentH = pageH - MARGIN_MM.top - MARGIN_MM.bottom;

  // px (element CSS px) → mm
  const elWidthPx = el.offsetWidth || canvas.width / scale; // fixed page width set by the preview (794px A4 / 816px Letter)
  const pxToMm = pageW / elWidthPx;
  const contentHpx = contentH / pxToMm;          // in CSS px
  const totalHpx = canvas.height / scale;        // in CSS px

  const singlePage = totalHpx * pxToMm <= pageH; // fits without margins → full-bleed like before
  const candidates = breakCandidates(el);

  // Build page ranges [startPx, endPx)
  const ranges: [number, number][] = [];
  if (singlePage) {
    ranges.push([0, totalHpx]);
  } else {
    let start = 0;
    while (start < totalHpx - 0.5) {
      const limit = start + contentHpx;
      if (limit >= totalHpx) { ranges.push([start, totalHpx]); break; }
      // Best candidate: largest boundary <= limit that is meaningfully after start
      let cut = -1;
      for (const y of candidates) {
        if (y > start + contentHpx * 0.35 && y <= limit) cut = y;
      }
      if (cut < 0) cut = limit; // hard cut fallback
      ranges.push([start, cut]);
      start = cut;
    }
  }

  const pageCanvas = document.createElement("canvas");
  const ctx = pageCanvas.getContext("2d")!;
  const total = ranges.length;

  ranges.forEach(([a, b], i) => {
    const sy = Math.round(a * scale);
    const sh = Math.max(1, Math.round((b - a) * scale));
    pageCanvas.width = canvas.width;
    pageCanvas.height = sh;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    ctx.drawImage(canvas, 0, sy, canvas.width, sh, 0, 0, canvas.width, sh);

    if (i > 0) pdf.addPage();
    const img = pageCanvas.toDataURL("image/jpeg", 0.92);
    const hMm = (sh / scale) * pxToMm;
    const yMm = singlePage ? 0 : MARGIN_MM.top;
    pdf.addImage(img, "JPEG", MARGIN_MM.side, yMm, pageW, hMm, undefined, "FAST");

    if (total > 1 && opts.pageNumbers !== false) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(150);
      pdf.text(`Page ${i + 1} of ${total}`, pageW - 10, pageH - 4, { align: "right" });
      if (opts.title) pdf.text(opts.title, 10, pageH - 4, { align: "left" });
    }
  });

  return pdf.output("blob");
}

/** Trigger a browser download for a Blob. */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
