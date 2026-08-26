"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  alt,
  overlay,
}: {
  images: string[];
  alt: string;
  overlay?: ReactNode;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-hookmi-cream">
        {overlay}
        <Image
          src={images[active]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ver imagen ${index + 1} de ${alt}`}
              aria-current={index === active}
              className={`relative aspect-square w-16 overflow-hidden rounded-xl border-2 transition ${
                index === active ? "border-hookmi-yellow-dark" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
