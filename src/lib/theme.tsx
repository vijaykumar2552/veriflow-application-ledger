import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  isThemePreference,
  STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme-config";
import { ThemeContext } from "@/lib/theme-context";

function applyTheme(theme: ResolvedTheme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>("light");
  const [initialized, setInitialized] = useState(false);
  const resolvedTheme = preference === "system" ? systemTheme : preference;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = () => setSystemTheme(media.matches ? "dark" : "light");
    updateSystemTheme();
    media.addEventListener("change", updateSystemTheme);

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isThemePreference(stored)) setPreferenceState(stored);
    } catch (error) {
      console.error("Could not read the saved VeriFlow appearance preference.", error);
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && isThemePreference(event.newValue)) {
        setPreferenceState(event.newValue);
      } else if (event.key === STORAGE_KEY && event.newValue === null) {
        setPreferenceState("system");
      }
    };
    window.addEventListener("storage", handleStorage);
    setInitialized(true);

    return () => {
      media.removeEventListener("change", updateSystemTheme);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;
    applyTheme(resolvedTheme);
  }, [initialized, resolvedTheme]);

  const setPreference = useCallback((next: ThemePreference) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setPreferenceState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setPreference]);

  return (
    <ThemeContext.Provider value={{ preference, resolvedTheme, setPreference, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
