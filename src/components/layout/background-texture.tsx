"use client";

import { useEffect, useRef } from "react";

export function BackgroundTexture() {
  const revealLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = revealLayer.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!layer || !canHover.matches || reduceMotion.matches) return;

    let animationFrame = 0;

    const showAt = (x: number, y: number, radius: number) => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        layer.style.setProperty("--spot-x", `${x}px`);
        layer.style.setProperty("--spot-y", `${y}px`);
        layer.style.setProperty("--spot-radius", `${radius}px`);
        layer.dataset.active = "true";
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const isAction =
        event.target instanceof Element &&
        event.target.closest("[data-background-reveal]");
      showAt(event.clientX, event.clientY, isAction ? 210 : 145);
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) layer.dataset.active = "false";
    };

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const action = target.closest<HTMLElement>("[data-background-reveal]");
      if (!action) return;

      const bounds = action.getBoundingClientRect();
      showAt(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2, 190);
    };

    const handleFocusOut = (event: FocusEvent) => {
      const nextTarget = event.relatedTarget;
      if (
        !(nextTarget instanceof Element) ||
        !nextTarget.closest("[data-background-reveal]")
      ) {
        layer.dataset.active = "false";
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="site-canvas" />
      <div
        aria-hidden="true"
        className="site-canvas-reveal"
        data-active="false"
        ref={revealLayer}
      />
    </>
  );
}
