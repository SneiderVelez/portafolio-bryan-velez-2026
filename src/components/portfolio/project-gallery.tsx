"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ProjectGalleryImage = {
  src: string;
  position?: string;
};

type ProjectGalleryProps = {
  images: ProjectGalleryImage[];
  projectTitle: string;
  projectHref?: string;
};

const ROTATION_INTERVAL_MS = 6200;

export function ProjectGallery({
  images,
  projectTitle,
  projectHref,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [canAutoRotate, setCanAutoRotate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 640px)");
    const syncAutoRotatePreference = () => setCanAutoRotate(mobileQuery.matches);

    syncAutoRotatePreference();
    mobileQuery.addEventListener("change", syncAutoRotatePreference);

    return () => {
      mobileQuery.removeEventListener("change", syncAutoRotatePreference);
    };
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || images.length < 2) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );

    observer.observe(gallery);
    return () => observer.disconnect();
  }, [images.length]);

  useEffect(() => {
    if (!canAutoRotate || isPaused || !isVisible || images.length < 2) return;

    let intervalId: number | undefined;

    function syncRotation() {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }

      if (document.visibilityState !== "visible") return;

      intervalId = window.setInterval(() => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
      }, ROTATION_INTERVAL_MS);
    }

    syncRotation();
    document.addEventListener("visibilitychange", syncRotation);

    return () => {
      document.removeEventListener("visibilitychange", syncRotation);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [canAutoRotate, images.length, isPaused, isVisible]);

  function selectImage(index: number) {
    setActiveIndex(index);
    setIsPaused(true);
  }

  return (
    <>
      <div className="project-preview-window" ref={galleryRef}>
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

          {canAutoRotate ? (
            <button
              aria-label={isPaused ? "Reanudar cambio de capturas" : "Pausar cambio de capturas"}
              aria-pressed={isPaused}
              className="project-preview-rotation-toggle"
              onClick={() => setIsPaused((current) => !current)}
              type="button"
            >
              <span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span>
            </button>
          ) : (
            <span aria-hidden="true" className="project-preview-control-spacer" />
          )}
        </div>
      ) : null}
    </>
  );
}
