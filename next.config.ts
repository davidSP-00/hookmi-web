import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Habilita SVG local para las imágenes placeholder de producto/animal.
    // Quitar dangerouslyAllowSVG si en el futuro se sirven SVGs de fuentes externas no confiables.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
