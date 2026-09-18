import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import fs from "node:fs/promises";
import path from "node:path";
import { getAnimalBySlug } from "@/content/animals";
import { verifyUnlockToken } from "@/lib/unlockToken";
import { UNLOCK_COOKIE_PREFIX } from "@/lib/constants";

// Guía genérica de "cómo leer el crochet": es la misma para todos los kits,
// pero se sirve detrás del mismo desbloqueo por código que el PDF del patrón
// y los videos, porque es el primer paso de la ruta de aprendizaje.
const GUIDE_FILE = "guia-principiantes-hookmi.pdf";

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Context) {
  const { slug } = await params;

  if (!getAnimalBySlug(slug)) {
    return NextResponse.json({ error: "No encontrado." }, { status: 404 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(`${UNLOCK_COOKIE_PREFIX}${slug}`)?.value;

  if (!token || !(await verifyUnlockToken(token, slug))) {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

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
    },
  });
}
