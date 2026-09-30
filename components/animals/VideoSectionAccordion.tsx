"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";

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
              className="flex w-full items-center justify-between gap-3 bg-white px-4 py-3.5 text-left text-sm font-bold text-hookmi-ink sm:px-5 sm:py-4 sm:text-base"
              aria-expanded={isOpen}
            >
              <span className="min-w-0">
                {index + 1}. {section.title}
              </span>
              <ChevronDown className={`flex-shrink-0 transition ${isOpen ? "rotate-180" : ""}`} size={20} />
            </button>

            {/* El video/iframe solo se monta cuando la sección está abierta, para no cargar todos a la vez */}
            {isOpen &&
              (section.videoUrl.endsWith(".mp4") ? (
                <VideoPlayer key={section.videoUrl} src={section.videoUrl} title={section.title} />
              ) : (
                <div className="aspect-video bg-black">
                  <iframe
                    src={section.videoUrl}
                    title={section.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}
