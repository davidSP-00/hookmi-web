import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import fs from "node:fs/promises";
import path from "node:path";
import { getAnimalSecureBySlug } from "@/content/animals.secure";
import { verifyUnlockToken } from "@/lib/unlockToken";
import { UNLOCK_COOKIE_PREFIX } from "@/lib/constants";

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Context) {
  const { slug } = await params;
  const secure = getAnimalSecureBySlug(slug);

  if (!secure) {
    return NextResponse.json({ error: "No encontrado." }, { status: 404 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(`${UNLOCK_COOKIE_PREFIX}${slug}`)?.value;

  if (!token || !(await verifyUnlockToken(token, slug))) {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const filePath = path.join(process.cwd(), "private", "pdfs", secure.pdfFile);

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
      "Content-Disposition": `attachment; filename="${secure.pdfFile}"`,
    },
  });
}
