import "server-only";

import { type NextRequest } from "next/server";

// Solo reenviamos "Range" hacia CloudFront para que el <video> pueda buscar
// (scrubbing) sin descargar el archivo completo cada vez. Deliberadamente NO
// reenviamos "If-None-Match"/"If-Range": como esta respuesta lleva su propio
// Cache-Control, el navegador los agrega solo en revalidaciones automáticas,
// y si el origin respondiera 304 no tendríamos body que retransmitir.
const FORWARDABLE_REQUEST_HEADERS = ["range"] as const;

// Cabeceras de la respuesta de CloudFront que sí es seguro reenviar al cliente.
const FORWARDABLE_RESPONSE_HEADERS = [
  "content-type",
  "content-length",
  "content-range",
  "accept-ranges",
  "etag",
  "last-modified",
] as const;

export function isCrossSiteRequest(request: NextRequest): boolean {
  // "Fetch Metadata": la marca el navegador, no se puede falsificar desde JS.
  // Si otro sitio intenta incrustar nuestro video (<video>/<iframe> en su
  // propio dominio), llega como "cross-site" y lo bloqueamos acá.
  const secFetchSite = request.headers.get("sec-fetch-site");
  return secFetchSite === "cross-site";
}

// Retransmite un video desde CloudFront sin exponer nunca la URL de origen
// al cliente: la request nunca sale del navegador hacia el bucket real.
export async function proxyVideo(request: NextRequest, sourceUrl: string): Promise<Response> {
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

  if (!upstreamResponse.ok) {
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
