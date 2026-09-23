import { type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getAnimalSectionVideoUrl } from "@/content/animals.secure";
import { verifyUnlockToken } from "@/lib/unlockToken";
import { UNLOCK_COOKIE_PREFIX } from "@/lib/constants";
import { proxyVideo } from "@/lib/videoProxy";

type Context = { params: Promise<{ slug: string; sectionId: string }> };

export async function GET(request: NextRequest, { params }: Context) {
  const { slug, sectionId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get(`${UNLOCK_COOKIE_PREFIX}${slug}`)?.value;

  if (!token || !(await verifyUnlockToken(token, slug))) {
    return new Response("No autorizado.", { status: 403 });
  }

  const sourceUrl = getAnimalSectionVideoUrl(slug, sectionId);
  if (!sourceUrl) {
    return new Response("No encontrado.", { status: 404 });
  }

  return proxyVideo(request, sourceUrl);
}
