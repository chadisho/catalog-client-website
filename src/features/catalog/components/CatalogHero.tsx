'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CatalogImageModel } from '../model/catalogImageModel';

interface CatalogHeroProps {
  title: string;
  description: string;
  images?: CatalogImageModel[];
  fallbackImageUrl?: string;
  autoPlayIntervalMs?: number;
}

const isExternalUrl = (value: string) => /^https?:\/\//i.test(value);

export default function CatalogHero({
  title,
  description,
  images,
  fallbackImageUrl,
  autoPlayIntervalMs = 4000,
}: CatalogHeroProps) {
  const normalizedImages = useMemo<CatalogImageModel[]>(() => {
    const safeImages = (images ?? []).filter((image) => image.image);

    if (safeImages.length > 0) {
      return safeImages;
    }

    if (fallbackImageUrl) {
      return [
        {
          id: 0,
          image: fallbackImageUrl,
          title: null,
          description: null,
          link: null,
        },
      ];
    }

    return [];
  }, [fallbackImageUrl, images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isThumbnailHovering, setIsThumbnailHovering] = useState(false);

  useEffect(() => {
    if (normalizedImages.length <= 1 || isThumbnailHovering) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % normalizedImages.length);
    }, autoPlayIntervalMs);

    return () => window.clearInterval(timer);
  }, [autoPlayIntervalMs, isThumbnailHovering, normalizedImages.length]);

  const safeActiveIndex =
    normalizedImages.length === 0 ? 0 : activeIndex % normalizedImages.length;
  const activeImage = normalizedImages[safeActiveIndex];
  const imageOverlayContent =
    activeImage?.title || activeImage?.description ? (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4">
        {activeImage.title ? (
          <h2 className="text-base font-semibold text-neutral-content md:text-lg">{activeImage.title}</h2>
        ) : null}
        {activeImage.description ? (
          <p className="mt-1 text-xs leading-6 text-neutral-content/90 md:text-sm">{activeImage.description}</p>
        ) : null}
      </div>
    ) : null;

  return (
    <aside className="space-y-4 rounded-2xl border border-border bg-surface p-4">
      <div className="relative overflow-hidden rounded-2xl bg-secondary/25">
        {activeImage ? (
          activeImage.link ? (
            <a
              href={activeImage.link}
              target={isExternalUrl(activeImage.link) ? '_blank' : undefined}
              rel={isExternalUrl(activeImage.link) ? 'noreferrer' : undefined}
              className="block"
            >
              <img src={activeImage.image} alt={activeImage.title ?? title} className="h-52 w-full object-cover" />
            </a>
          ) : (
            <img src={activeImage.image} alt={activeImage.title ?? title} className="h-52 w-full object-cover" />
          )
        ) : null}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-overlay via-transparent to-transparent" />
        {imageOverlayContent}
      </div>

      <h1 className="text-2xl font-semibold text-text">{title}</h1>
      <p className="text-sm leading-7 text-text/80">{description}</p>

      {normalizedImages.length > 1 ? (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          onMouseEnter={() => setIsThumbnailHovering(true)}
          onMouseLeave={() => setIsThumbnailHovering(false)}
        >
          {normalizedImages.map((image, index) => {
            const isActive = index === safeActiveIndex;

            return (
              <button
                key={`${image.id}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`h-14 w-14 flex-none overflow-hidden rounded-lg border transition ${
                  isActive ? 'border-primary ring-2 ring-primary/25' : 'border-border hover:border-primary/50'
                }`}
              >
                <img src={image.image} alt={image.title ?? title} className="h-full w-full object-cover" />
              </button>
            );
          })}
        </div>
      ) : null}
    </aside>
  );
}
