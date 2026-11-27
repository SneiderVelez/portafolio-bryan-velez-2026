"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent, type TouchEvent } from "react";

type ProjectGalleryImage = {
  src: string;
  position?: string;
};

type ProjectGalleryProps = {
  images: ProjectGalleryImage[];
  projectTitle: string;
  projectHref?: string;
};

const SWIPE_THRESHOLD_PX = 44;

export function ProjectGallery({
  images,
  projectTitle,
  projectHref,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    suppressClickRef.current = false;
    if (images.length < 2 || !window.matchMedia("(max-width: 640px)").matches) return;

    const touch = event.touches[0];
    if (!touch) return;

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || !window.matchMedia("(max-width: 640px)").matches) return;

    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) <= Math.abs(deltaY)) return;

    suppressClickRef.current = true;
    window.requestAnimationFrame(() => {
      suppressClickRef.current = false;
    });
    setActiveIndex((currentIndex) =>
      (currentIndex + (deltaX < 0 ? 1 : -1) + images.length) % images.length,
    );
  }

  function handleGalleryClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!suppressClickRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }

  function selectImage(index: number) {
    setActiveIndex(index);
  }

  return (
    <>
      <div
        className="project-preview-window"
        onClickCapture={handleGalleryClickCapture}
        onTouchCancel={() => {
          touchStartRef.current = null;
        }}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
      >
        <div
          aria-label={`Capturas de ${projectTitle}`}
          aria-roledescription={images.length > 1 ? "carrusel" : undefined}
          className="project-preview-gallery"
          data-active-index={activeIndex}
          role="group"
        >
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            const imageContent = (
              <Image
                alt=""
                className="project-preview-image"
                fill
                quality={75}
                sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 100vw, (max-width: 1440px) 45vw, 640px"
                src={image.src}
                style={{ objectPosition: image.position ?? "50% 50%" }}
              />
            );
            const frameClassName =
              "project-preview-frame project-preview-frame--carousel";

            return projectHref ? (
              <a
                aria-label={`Abrir ${projectTitle}, captura ${index + 1} de ${images.length}`}
                className={`${frameClassName} project-preview-frame--link`}
                data-carousel-active={isActive}
                href={projectHref}
                key={image.src}
                rel="noreferrer"
                target="_blank"
              >
                {imageContent}
              </a>
            ) : (
              <div
                className={frameClassName}
                data-carousel-active={isActive}
                key={image.src}
              >
                {imageContent}
              </div>
            );
          })}
        </div>
      </div>

      {images.length > 1 ? (
        <div className="project-preview-controls">
          <span aria-hidden="true" className="project-preview-count">
            {String(activeIndex + 1).padStart(2, "0")}
            <span>/</span>
            {String(images.length).padStart(2, "0")}
          </span>

          <div aria-label="Elegir captura" className="project-preview-pagination" role="group">
            {images.map((image, index) => (
              <button
                aria-label={`Mostrar captura ${index + 1} de ${images.length}`}
                aria-pressed={index === activeIndex}
                className="project-preview-page-button"
                key={image.src}
                onClick={() => selectImage(index)}
                type="button"
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
