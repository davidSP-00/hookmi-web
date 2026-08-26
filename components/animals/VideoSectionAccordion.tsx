"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Section = { title: string; videoUrl: string };

export function VideoSectionAccordion({ sections }: { sections: Section[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {sections.map((section, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={section.title} className="overflow-hidden rounded-2xl border border-black/10">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between bg-white px-5 py-4 text-left font-bold text-hookmi-ink"
              aria-expanded={isOpen}
            >
              {section.title}
              <ChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} size={20} />
            </button>

            {/* El iframe solo se monta cuando la sección está abierta, para no cargar todos los videos a la vez */}
            {isOpen && (
              <div className="aspect-video bg-black">
                <iframe
                  src={section.videoUrl}
                  title={section.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
