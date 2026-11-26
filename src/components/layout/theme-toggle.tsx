"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "portfolio-theme";
const THEME_CHANGE_EVENT = "portfolio-theme-change";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeToTheme(onChange: () => void) {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const syncSystemTheme = (event: MediaQueryListEvent) => {
    if (hasSavedTheme()) return;

    document.documentElement.dataset.theme = event.matches ? "dark" : "light";
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  systemTheme.addEventListener("change", syncSystemTheme);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    systemTheme.removeEventListener("change", syncSystemTheme);
  };
}

function getServerTheme(): Theme {
  return "light";
}

function hasSavedTheme(): boolean {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === "light" || savedTheme === "dark";
  } catch {
    return false;
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    readTheme,
    getServerTheme,
  );

  const toggleTheme = () => {
    const nextTheme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The current session still changes theme if storage is unavailable.
    }

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <Button
      aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      onClick={toggleTheme}
      size="icon"
      title={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      type="button"
      variant="ghost"
    >
      <ThemeIcon aria-hidden="true" />
    </Button>
  );
}
