'use client';

import { useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { ProductMediaItem } from './productUiUtils';

type ProductGalleryProps = {
  mediaItems: ProductMediaItem[];
};

function VideoPlayer({ src, title }: { src: string; title: string }) {
  return (
    <video
      controls
      playsInline
      preload="metadata"
      className="h-full w-full rounded-2xl bg-neutral object-contain"
      title={title}
    >
      <source src={src} />
    </video>
  );
}

export default function ProductGallery({ mediaItems }: ProductGalleryProps) {
  const [activeId, setActiveId] = useState<string>(mediaItems[0]?.id ?? '');
  const touchStartX = useRef<number | null>(null);

  const activeIndex = useMemo(
    () => Math.max(0, mediaItems.findIndex((item) => item.id === activeId)),
    [activeId, mediaItems]
  );

  const activeItem = mediaItems[activeIndex] ?? mediaItems[0];

  const goTo = (index: number) => {
    const clamped = (index + mediaItems.length) % mediaItems.length;
    setActiveId(mediaItems[clamped]?.id ?? '');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 40) return;
    // RTL-aware: swipe right → prev, swipe left → next (standard LTR)
    goTo(deltaX > 0 ? activeIndex - 1 : activeIndex + 1);
  };

  if (!activeItem) {
    return (
      <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <div className="aspect-square w-full rounded-2xl bg-secondary/10" />
      </section>
    );
  }

  const showNav = mediaItems.length > 1;

  return (
    <section className="rounded-2xl border border-border bg-background p-4 shadow-sm lg:p-5">
      <div className="flex flex-col gap-4 lg:flex-row-reverse">
        {/* Main viewer */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-muted lg:flex-1">
          <div
            className="aspect-square w-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {activeItem.type === 'video' ? (
              <VideoPlayer src={activeItem.src} title={activeItem.alt} />
            ) : (
              <img src={activeItem.src} alt={activeItem.alt} className="h-full w-full rounded-2xl object-cover" />
            )}
          </div>

          {showNav && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={() => goTo(activeIndex - 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur-sm transition hover:bg-background active:scale-95 lg:h-10 lg:w-10 hidden lg:flex"
              >
                <ChevronRight className="h-5 w-5 text-text" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => goTo(activeIndex + 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur-sm transition hover:bg-background active:scale-95 lg:h-10 lg:w-10 hidden lg:flex"
              >
                <ChevronLeft className="h-5 w-5 text-text" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        <div className="order-2 w-full lg:order-1 lg:w-24">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:max-h-[28rem] lg:flex-col lg:overflow-y-auto lg:overflow-x-visible">
            {mediaItems.map((item) => {
              const isActive = item.id === activeItem.id;
              const isVideo = item.type === 'video';

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                  className={`relative h-20 w-20 flex-none overflow-hidden rounded-xl border transition-all lg:h-24 lg:w-24 ${
                    isActive
                      ? isVideo
                        ? 'border-warning ring-2 ring-warning/30'
                        : 'border-primary ring-2 ring-primary/25'
                      : isVideo
                        ? 'border-warning/50 bg-warning/10 hover:border-warning'
                        : 'border-secondary/35 hover:border-primary/45'
                  }`}
                >
                  {isVideo ? (
                    <div className="relative h-full w-full bg-overlay">
                      <video className="h-full w-full object-cover opacity-70" muted>
                        <source src={item.src} />
                      </video>
                      <span className="absolute inset-0 flex items-center justify-center bg-black/35 text-primary-content">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-warning shadow-sm">
                          <Play className="h-6 w-6 fill-current" aria-hidden="true" />
                        </span>
                      </span>
                    </div>
                  ) : (
                    <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
