"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/brand/brand-mark";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const navigation = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#tecnologias", label: "Tecnologías" },
];

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cancelScroll = useRef<(() => void) | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const navigateToAnchor = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    setIsMobileMenuOpen(false);
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
    if (!isMobileMenuOpen) return;

    navigationRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsMobileMenuOpen(false);
      menuToggleRef.current?.focus();
    };
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMobileMenuOpen(false);
    };
    const desktopViewport = window.matchMedia("(min-width: 901px)");

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    desktopViewport.addEventListener("change", closeOnDesktop);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
      desktopViewport.removeEventListener("change", closeOnDesktop);
    };
  }, [isMobileMenuOpen]);

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
    <header
      className="site-header"
      data-menu-open={isMobileMenuOpen ? "true" : "false"}
      ref={headerRef}
    >
      <div className="site-header-inner">
        <a
          className="group inline-flex items-center gap-2 text-base font-semibold tracking-tight text-ink no-underline"
          href="#inicio"
          aria-label="Bryan Vélez, inicio"
          onClick={(event) => navigateToAnchor(event, "#inicio")}
        >
          <BrandMark className="brand-mark size-7 transition-transform group-hover:rotate-[-8deg]" />
          Bryan Vélez
        </a>

        <div className="site-header-controls">
          <nav
            aria-label="Navegación principal"
            className="site-navigation"
            id="site-navigation"
            ref={navigationRef}
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
            <a
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "site-nav-contact font-semibold sm:text-base",
              )}
              href="mailto:sneivega09@gmail.com"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto <ArrowUpRight aria-hidden="true" className="ml-1 size-4 shrink-0" />
            </a>
          </nav>
          <ThemeToggle />
          <Button
            aria-controls="site-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Cerrar navegación" : "Abrir navegación"}
            className="site-menu-toggle"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            ref={menuToggleRef}
            size="icon"
            type="button"
            variant="ghost"
          >
            {isMobileMenuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
