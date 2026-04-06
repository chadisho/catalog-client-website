'use client';

import { useMemo, useState } from 'react';
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
      className="h-full w-full rounded-2xl bg-black object-contain"
      title={title}
    >
      <source src={src} />
    </video>
  );
}

export default function ProductGallery({ mediaItems }: ProductGalleryProps) {
  const [activeId, setActiveId] = useState<string>(mediaItems[0]?.id ?? '');

  const activeItem = useMemo(
    () => mediaItems.find((item) => item.id === activeId) ?? mediaItems[0],
    [activeId, mediaItems]
  );

  if (!activeItem) {
    return (
      <section className="rounded-2xl border border-secondary/25 bg-background p-6 shadow-sm">
        <div className="aspect-square w-full rounded-2xl bg-secondary/10" />
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-secondary/25 bg-background p-4 shadow-sm lg:p-5">
      <div className="flex flex-col gap-4 lg:flex-row-reverse">
        <div className="w-full overflow-hidden rounded-2xl bg-black/5 lg:flex-1 dark:bg-white/5">
          <div className="aspect-square w-full">
            {activeItem.type === 'video' ? (
              <VideoPlayer src={activeItem.src} title={activeItem.alt} />
            ) : (
              <img src={activeItem.src} alt={activeItem.alt} className="h-full w-full rounded-2xl object-cover" />
            )}
          </div>
        </div>

        <div className="order-2 w-full lg:order-1 lg:w-24">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:max-h-[28rem] lg:flex-col lg:overflow-y-auto lg:overflow-x-visible">
            {mediaItems.map((item) => {
              const isActive = item.id === activeItem.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={`relative h-20 w-20 flex-none overflow-hidden rounded-xl border transition-all lg:h-24 lg:w-24 ${
                    isActive
                      ? 'border-primary ring-2 ring-primary/25'
                      : 'border-secondary/35 hover:border-primary/45'
                  }`}
                >
                  {item.type === 'video' ? (
                    <div className="relative h-full w-full bg-black/75">
                      <video className="h-full w-full object-cover opacity-80" muted>
                        <source src={item.src} />
                      </video>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                        ▶
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
