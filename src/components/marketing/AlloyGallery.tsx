"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
};

export function AlloyGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const count = images.length;

  const next = useCallback(
    () => setActive((i) => (i + 1) % count),
    [count],
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + count) % count),
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, next, prev]);

  if (count === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[5/4] overflow-hidden rounded-xl border border-slate-200 bg-white">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${alt} — ${active + 1}/${count}`}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-contain p-4 transition-opacity duration-200"
          priority={active === 0}
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/95 text-ink shadow-sm backdrop-blur transition hover:bg-paper"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/95 text-ink shadow-sm backdrop-blur transition hover:bg-paper"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
            <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-paper/95 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink shadow-sm backdrop-blur">
              {active + 1} / {count}
            </div>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-square overflow-hidden rounded-md border transition ${
                i === active
                  ? "border-bronze-500 ring-2 ring-bronze-300"
                  : "border-slate-200 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
