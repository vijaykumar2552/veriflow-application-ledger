import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-config-DaCSQ_n9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var ThemeContext = (0, import_react.createContext)(null);
function useTheme() {
	const context = (0, import_react.useContext)(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
}
var STORAGE_KEY = "veriflow-theme";
function isThemePreference(value) {
	return value === "light" || value === "dark" || value === "system";
}
var themeInitializationScript = `(() => {
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
//#endregion
export { useTheme as a, themeInitializationScript as i, ThemeContext as n, isThemePreference as r, STORAGE_KEY as t };
