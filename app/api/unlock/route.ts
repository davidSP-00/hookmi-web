import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { getAnimalSecureBySlug } from "@/content/animals.secure";
import { verifyPassword } from "@/lib/password";
import { signUnlockToken } from "@/lib/unlockToken";
import { UNLOCK_COOKIE_MAX_AGE_SECONDS, UNLOCK_COOKIE_PREFIX } from "@/lib/constants";

const bodySchema = z.object({
  slug: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const { slug, password } = parsed.data;
  const secure = getAnimalSecureBySlug(slug);

  if (!secure || !verifyPassword(password, secure.passwordHash)) {
    return NextResponse.json({ ok: false, error: "Código incorrecto." }, { status: 401 });
  }

  const token = await signUnlockToken(slug);
  const cookieStore = await cookies();

  cookieStore.set(`${UNLOCK_COOKIE_PREFIX}${slug}`, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: UNLOCK_COOKIE_MAX_AGE_SECONDS,
  });

  return NextResponse.json({ ok: true });
}
