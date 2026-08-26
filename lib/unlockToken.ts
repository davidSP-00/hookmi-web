import "server-only";

import { SignJWT, jwtVerify } from "jose";

const ALGORITHM = "HS256";

function getSecretKey(): Uint8Array {
  const secret = process.env.UNLOCK_SECRET;
  if (!secret) {
    throw new Error(
      "Falta la variable de entorno UNLOCK_SECRET. Defínela en .env.local (ver .env.example)."
    );
  }
  return new TextEncoder().encode(secret);
}

export type UnlockPayload = {
  slug: string;
  unlocked: true;
};

export async function signUnlockToken(slug: string): Promise<string> {
  return new SignJWT({ slug, unlocked: true } satisfies UnlockPayload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime("180d")
    .sign(getSecretKey());
}

export async function verifyUnlockToken(
  token: string,
  expectedSlug: string
): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload.slug === expectedSlug && payload.unlocked === true;
  } catch {
    return false;
  }
}
