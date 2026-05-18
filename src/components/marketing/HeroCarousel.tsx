"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
};

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 28,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
    const id = setInterval(() => {
      if (document.visibilityState === "visible") embla.scrollNext();
    }, 7000);
    return () => clearInterval(id);
  }, [embla, onSelect]);

  return (
    <section
      className="relative overflow-hidden bg-ink text-paper"
      aria-roledescription="carousel"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, idx) => (
            <article
              key={idx}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} / ${slides.length}`}
              className="relative min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover img-cohesive"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/30" />
              <div className="container-prose relative grid min-h-[560px] items-center pt-20 pb-40 md:min-h-[600px] md:pt-28 md:pb-44">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-bronze-300">
                    <span aria-hidden className="h-px w-6 bg-bronze-300" />
                    {slide.eyebrow}
                  </span>
                  <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-xl text-pretty text-base text-paper/80 md:text-lg">
                    {slide.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Controls floating over the slide, above any overlapping content below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-28 z-20 md:bottom-32">
        <div className="container-prose pointer-events-auto flex items-center justify-between gap-4">
          <div className="flex gap-1.5" role="tablist" aria-label="Hero slides">
            {slides.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={idx === selected}
                onClick={() => embla?.scrollTo(idx)}
                className={`h-1 rounded-full transition-all ${
                  idx === selected ? "w-10 bg-bronze-400" : "w-6 bg-paper/30 hover:bg-paper/50"
                }`}
              >
                <span className="sr-only">{`Slide ${idx + 1}`}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => embla?.scrollPrev()}
              aria-label="Previous slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 bg-ink/40 text-paper backdrop-blur-sm transition-colors hover:bg-ink/70"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => embla?.scrollNext()}
              aria-label="Next slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 bg-ink/40 text-paper backdrop-blur-sm transition-colors hover:bg-ink/70"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
