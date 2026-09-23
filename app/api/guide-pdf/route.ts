import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

// Guía genérica de "cómo leer el crochet": es la misma para todos los kits y
// se sirve gratis, sin código de desbloqueo, igual que los videos de técnicas
// básicas (ver app/api/tutorial-video/[id]).
const GUIDE_FILE = "guia-principiantes-hookmi.pdf";

export async function GET() {
  const filePath = path.join(process.cwd(), "private", "pdfs", GUIDE_FILE);

  let fileBuffer: Buffer;
  try {
    fileBuffer = await fs.readFile(filePath);
  } catch {
    return NextResponse.json({ error: "Archivo no disponible." }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(fileBuffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${GUIDE_FILE}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
