(() => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let savedTheme;

  try {
    savedTheme = window.localStorage?.getItem("portfolio-theme");
  } catch {
    // Use the operating-system preference when storage is unavailable.
  }

  const theme =
    savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : prefersDark
        ? "dark"
        : "light";

  document.documentElement.dataset.theme = theme;
})();
