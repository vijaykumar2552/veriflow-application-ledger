import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTheme } from "@/lib/theme-context";

export function ClockAndTheme() {
  const [now, setNow] = useState<Date | null>(null);
  const { resolvedTheme, toggleTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }).format(now)
    : "--:--:--";
  const date = now
    ? new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now)
    : "Local date";

  return (
    <>
      <div
        className="flex min-w-[76px] flex-col items-end leading-tight"
        aria-label="Local system time and date"
      >
        <time
          dateTime={now?.toISOString()}
          className="whitespace-nowrap font-mono text-[10px] font-medium tabular-nums text-foreground sm:text-xs"
        >
          {time}
        </time>
        <time
          dateTime={now?.toISOString().slice(0, 10)}
          className="mt-1 hidden whitespace-nowrap text-[10px] text-muted-foreground sm:block"
        >
          <span className="hidden xl:inline">{date}</span>
          <span className="xl:hidden">
            {now
              ? new Intl.DateTimeFormat(undefined, {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                }).format(now)
              : "Local date"}
          </span>
        </time>
      </div>
      <button
        type="button"
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={dark}
        title={dark ? "Switch to light theme" : "Switch to dark theme"}
        onClick={() => {
          try {
            toggleTheme();
          } catch (error) {
            toast.error("Could not save your appearance preference.");
            console.error("Could not persist theme preference.", error);
          }
        }}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {dark ? (
          <Moon className="h-4 w-4 transition-transform duration-200" aria-hidden="true" />
        ) : (
          <Sun className="h-4 w-4 transition-transform duration-200" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
