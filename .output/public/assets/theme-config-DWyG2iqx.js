import{a as e,c as t}from"./utils-DD_aFkVP.js";var n=t(e(),1),r=(0,n.createContext)(null);function i(){let e=(0,n.useContext)(r);if(!e)throw Error(`useTheme must be used within a ThemeProvider`);return e}var a=`veriflow-theme`;function o(e){return e===`light`||e===`dark`||e===`system`}var s=`(() => {
  try {
    const stored = localStorage.getItem("${a}");
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
})();`;export{i as a,r as i,o as n,s as r,a as t};