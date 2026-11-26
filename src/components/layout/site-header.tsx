"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/brand/brand-mark";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const navigation = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#tecnologias", label: "Tecnologías" },
];

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const cancelScroll = useRef<(() => void) | null>(null);

  const navigateToAnchor = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    cancelScroll.current?.();

    const startY = window.scrollY;
    const scrollMargin =
      Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const targetY = Math.min(
      Math.max(0, target.getBoundingClientRect().top + startY - scrollMargin),
      maxScroll,
    );
    const distance = targetY - startY;
    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }

    setActiveSection(
      navigation.find((item) => item.href === href)?.href.slice(1) ?? null,
    );

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    let frame: number | null = null;
    let startTime: number | null = null;
    let cleanup = () => {};
    const interrupt = () => cleanup();

    cleanup = () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("wheel", interrupt, true);
      window.removeEventListener("touchstart", interrupt, true);
      window.removeEventListener("pointerdown", interrupt, true);
      window.removeEventListener("keydown", interrupt, true);
      root.style.scrollBehavior = previousScrollBehavior;

      if (cancelScroll.current === cleanup) {
        cancelScroll.current = null;
      }
    };

    cancelScroll.current = cleanup;

    const focusTarget = () => {
      const heading = target.querySelector<HTMLElement>("h1[id], h2[id]");
      heading?.focus({ preventScroll: true });
    };

    if (Math.abs(distance) < 1) {
      window.scrollTo(0, targetY);
      focusTarget();
      cleanup();
      return;
    }

    const duration = Math.min(1200, Math.max(700, Math.abs(distance) * 0.45));
    const animate = (time: number) => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased =
        progress < 0.5
          ? 4 * progress ** 3
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
        return;
      }

      window.scrollTo(0, targetY);
      focusTarget();
      cleanup();
    };

    window.addEventListener("wheel", interrupt, { capture: true, passive: true });
    window.addEventListener("touchstart", interrupt, { capture: true, passive: true });
    window.addEventListener("pointerdown", interrupt, true);
    window.addEventListener("keydown", interrupt, true);
    frame = window.requestAnimationFrame(animate);
  };

  useEffect(() => () => cancelScroll.current?.(), []);

  useEffect(() => {
    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.4;
      const currentSection = navigation
        .map((item) => document.getElementById(item.href.slice(1)))
        .filter((section): section is HTMLElement => section !== null)
        .filter((section) => section.getBoundingClientRect().top <= activationLine)
        .at(-1);
      const nextActiveSection = currentSection?.id ?? null;

      setActiveSection((current) =>
        current === nextActiveSection ? current : nextActiveSection,
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="site-header-inner flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <a
          className="group inline-flex items-center gap-2 text-base font-semibold tracking-tight text-ink no-underline"
          href="#inicio"
          aria-label="Bryan Vélez, inicio"
          onClick={(event) => navigateToAnchor(event, "#inicio")}
        >
          <BrandMark className="brand-mark size-7 transition-transform group-hover:rotate-[-8deg]" />
          Bryan Vélez
        </a>

        <div className="ml-auto flex flex-wrap items-center justify-end gap-x-4 gap-y-2 sm:gap-x-6">
          <nav
            aria-label="Navegación principal"
            className="flex flex-wrap items-center gap-3 sm:gap-8"
          >
            {navigation.map((item) => {
              const isActive = activeSection === item.href.slice(1);

              return (
                <a
                  aria-current={isActive ? "location" : undefined}
                  className="site-nav-link inline-flex items-center gap-2 text-sm sm:text-base"
                  href={item.href}
                  key={item.href}
                  onClick={(event) => navigateToAnchor(event, item.href)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <a
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "h-10 px-3 font-semibold sm:text-base",
            )}
            href="mailto:sneivega09@gmail.com"
          >
            Contacto <span aria-hidden="true">↗</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
