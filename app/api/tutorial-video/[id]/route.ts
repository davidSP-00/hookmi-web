import { type NextRequest } from "next/server";
import { basicTutorialVideoSources } from "@/content/basics.secure";
import { proxyVideo } from "@/lib/videoProxy";

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const sourceUrl = basicTutorialVideoSources[id];

  if (!sourceUrl) {
    return new Response("No encontrado.", { status: 404 });
  }

  return proxyVideo(request, sourceUrl);
}
