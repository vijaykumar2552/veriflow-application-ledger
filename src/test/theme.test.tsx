import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "@/lib/theme";
import { useTheme } from "@/lib/theme-context";

function ThemeControls() {
  const { preference, resolvedTheme, setPreference, toggleTheme } = useTheme();
  return createElement(
    "div",
    null,
    createElement("output", null, `${preference}:${resolvedTheme}`),
    createElement("button", { onClick: () => setPreference("dark") }, "Set dark"),
    createElement("button", { onClick: () => setPreference("system") }, "Set system"),
    createElement("button", { onClick: toggleTheme }, "Toggle theme"),
  );
}

describe("theme preference", () => {
  const originalMatchMedia = window.matchMedia;
  let systemDark = false;
  let mediaTarget: EventTarget;
  let mediaQuery: MediaQueryList;
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    systemDark = false;
    mediaTarget = new EventTarget();
    mediaQuery = {
      get matches() {
        return systemDark;
      },
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: mediaTarget.addEventListener.bind(mediaTarget),
      removeEventListener: mediaTarget.removeEventListener.bind(mediaTarget),
      dispatchEvent: mediaTarget.dispatchEvent.bind(mediaTarget),
    };
    window.matchMedia = vi.fn(() => mediaQuery);
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    window.matchMedia = originalMatchMedia;
  });

  async function renderTheme() {
    await act(async () => {
      root.render(createElement(ThemeProvider, null, createElement(ThemeControls)));
    });
  }

  it("applies and persists an explicit theme preference", async () => {
    await renderTheme();

    await act(async () => {
      container.querySelector<HTMLButtonElement>("button")?.click();
    });

    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("veriflow-theme")).toBe("dark");
    expect(container.querySelector("output")?.textContent).toBe("dark:dark");
  });

  it("follows system appearance changes when system mode is selected", async () => {
    await renderTheme();
    const buttons = container.querySelectorAll("button");

    await act(async () => buttons[1]?.click());
    expect(localStorage.getItem("veriflow-theme")).toBe("system");

    systemDark = true;
    await act(async () => {
      mediaTarget.dispatchEvent(new Event("change"));
    });

    expect(document.documentElement).toHaveClass("dark");
    expect(container.querySelector("output")?.textContent).toBe("system:dark");
  });

  it("restores a saved theme and toggles between light and dark", async () => {
    localStorage.setItem("veriflow-theme", "dark");
    await renderTheme();

    expect(document.documentElement).toHaveClass("dark");
    expect(container.querySelector("output")?.textContent).toBe("dark:dark");

    await act(async () => {
      container.querySelectorAll("button")[2]?.click();
    });

    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("veriflow-theme")).toBe("light");
  });
});
