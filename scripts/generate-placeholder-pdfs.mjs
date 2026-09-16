// Genera PDFs de muestra válidos (texto plano, sin dependencias) para
// probar el flujo de descarga protegida mientras llegan los PDFs reales.
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(import.meta.dirname, "..", "private", "pdfs");
fs.mkdirSync(outDir, { recursive: true });

function buildPdf(title, lines) {
  const contentLines = [
    `BT /F1 22 Tf 72 720 Td (${escape(title)}) Tj ET`,
    ...lines.map(
      (line, i) => `BT /F1 12 Tf 72 ${690 - i * 20} Td (${escape(line)}) Tj ET`
    ),
  ].join("\n");

  const objects = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>";
  objects[3] =
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[5] = `<< /Length ${Buffer.byteLength(contentLines, "utf-8")} >>\nstream\n${contentLines}\nendstream`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (let i = 1; i <= 5; i++) {
    offsets.push(Buffer.byteLength(pdf, "utf-8"));
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, "utf-8");
  pdf += `xref\n0 6\n0000000000 65535 f \n`;
  for (let i = 1; i <= 5; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return pdf;
}

function escape(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

const docs = [
  {
    file: "henry-001.pdf",
    title: "HOOKMI - Instrucciones de Henry",
    lines: [
      "Kit: Henry el Raton",
      "Secciones: Cuerpo, Orejas, Cara",
      "Este es un PDF de muestra. Reemplazalo por las instrucciones reales.",
    ],
  },
  {
    file: "pateo-002.pdf",
    title: "HOOKMI - Instrucciones de Pateo",
    lines: [
      "Kit: Pateo el Pato",
      "Secciones: Cuerpo, Alas, Pico",
      "Este es un PDF de muestra. Reemplazalo por las instrucciones reales.",
    ],
  },
];

for (const doc of docs) {
  const pdf = buildPdf(doc.title, doc.lines);
  fs.writeFileSync(path.join(outDir, doc.file), pdf, "latin1");
  console.log(`Generado: ${doc.file}`);
}
