import { type NextRequest } from "next/server";
import { basicTutorialVideoSources } from "@/content/basics.secure";

type Context = { params: Promise<{ id: string }> };

// Cabeceras que el navegador puede pedirle a nuestra Route Handler y que
// simplemente reenviamos hacia CloudFront para que el <video> pueda buscar
// (scrubbing) sin descargar el archivo completo cada vez.
const FORWARDABLE_REQUEST_HEADERS = ["range", "if-range", "if-none-match"] as const;

// Cabeceras de la respuesta de CloudFront que sí es seguro reenviar al cliente.
const FORWARDABLE_RESPONSE_HEADERS = [
  "content-type",
  "content-length",
  "content-range",
  "accept-ranges",
  "etag",
  "last-modified",
] as const;

function isCrossSiteRequest(request: NextRequest) {
  // "Fetch Metadata": la marca el navegador, no se puede falsificar desde JS.
  // Si otro sitio intenta incrustar nuestro video (<video>/<iframe> en su
  // propio dominio), llega como "cross-site" y lo bloqueamos acá.
  const secFetchSite = request.headers.get("sec-fetch-site");
  return secFetchSite === "cross-site";
}

export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const sourceUrl = basicTutorialVideoSources[id];

  if (!sourceUrl) {
    return new Response("No encontrado.", { status: 404 });
  }

  if (isCrossSiteRequest(request)) {
    return new Response("No autorizado.", { status: 403 });
  }

  const upstreamHeaders = new Headers();
  for (const header of FORWARDABLE_REQUEST_HEADERS) {
    const value = request.headers.get(header);
    if (value) upstreamHeaders.set(header, value);
  }

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(sourceUrl, { headers: upstreamHeaders, cache: "no-store" });
  } catch {
    return new Response("Video no disponible.", { status: 502 });
  }

  if (!upstreamResponse.ok && upstreamResponse.status !== 206) {
    return new Response("Video no disponible.", { status: 502 });
  }

  const responseHeaders = new Headers();
  for (const header of FORWARDABLE_RESPONSE_HEADERS) {
    const value = upstreamResponse.headers.get(header);
    if (value) responseHeaders.set(header, value);
  }

  // "inline" para que el navegador lo reproduzca en el <video>, nunca lo
  // ofrezca como descarga; "private" para que no quede cacheado en CDNs/
  // proxies intermedios ni se reindexe fuera de nuestro dominio.
  responseHeaders.set("Content-Disposition", "inline");
  responseHeaders.set("Cache-Control", "private, max-age=3600, no-transform");
  responseHeaders.set("X-Content-Type-Options", "nosniff");
  responseHeaders.set("Content-Security-Policy", "default-src 'none'");

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  });
}
