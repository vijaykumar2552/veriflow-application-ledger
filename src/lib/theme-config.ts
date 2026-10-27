export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = Exclude<ThemePreference, "system">;

export const STORAGE_KEY = "veriflow-theme";

export function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export const themeInitializationScript = `(() => {
  try {
    const stored = localStorage.getItem("${STORAGE_KEY}");
    const preference = stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : "system";
    const dark = preference === "dark" ||
      (preference === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (error) {
    console.error("Could not restore the saved VeriFlow appearance preference.", error);
  }
})();`;
