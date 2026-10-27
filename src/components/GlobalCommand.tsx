import { Link } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { toast } from "sonner";
import {
  BookOpen,
  FileCheck2,
  FileStack,
  FileText,
  LayoutDashboard,
  Moon,
  Play,
  Search,
  Settings,
  ShieldAlert,
  Sun,
  UserRoundCheck,
  ScrollText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchRecords, type SearchResult } from "@/lib/search";
import { useStore } from "@/lib/store";
import { useTheme } from "@/lib/theme-context";

const icons = {
  application: FileStack,
  document: FileCheck2,
  finding: ShieldAlert,
  rule: BookOpen,
};

const labels: Record<SearchResult["kind"], string> = {
  application: "Applications",
  document: "Documents",
  finding: "Simulated findings",
  rule: "Illustrative rules",
};

const commands = [
  { label: "Dashboard", description: "Overview and activity", to: "/", icon: LayoutDashboard },
  {
    label: "Applications",
    description: "Search and manage applications",
    to: "/applications",
    icon: FileStack,
  },
  {
    label: "Document Centre",
    description: "Uploaded document metadata",
    to: "/documents",
    icon: FileCheck2,
  },
  {
    label: "Validation Centre",
    description: "Review simulated check results",
    to: "/validation",
    icon: ShieldAlert,
  },
  {
    label: "Review Centre",
    description: "Open the manual review queue",
    to: "/review",
    icon: UserRoundCheck,
  },
  {
    label: "Compliance Rules",
    description: "Browse illustrative demo rules",
    to: "/rules",
    icon: BookOpen,
  },
  {
    label: "Audit Trail",
    description: "Inspect recorded demo activity",
    to: "/audit",
    icon: ScrollText,
  },
  {
    label: "Reports",
    description: "Open validation reports and exports",
    to: "/reports",
    icon: FileText,
  },
  {
    label: "Settings",
    description: "Profile and appearance preferences",
    to: "/settings",
    icon: Settings,
  },
] as const;

export function GlobalCommand() {
  const { apps, docs } = useStore();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchRecords(apps, docs, query), [apps, docs, query]);
  const matchingCommands = commands.filter((command) =>
    `${command.label} ${command.description}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const themeCommand = {
    label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`,
    description: "Change appearance for this browser",
    icon: resolvedTheme === "dark" ? Sun : Moon,
  };
  const showThemeCommand = `${themeCommand.label} ${themeCommand.description}`
    .toLowerCase()
    .includes(query.trim().toLowerCase());
  const demoCommandMatches = "start guided demo walkthrough".includes(query.trim().toLowerCase());

  useEffect(() => {
    const handleShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    const handleOpen = () => setOpen(true);
    window.addEventListener("keydown", handleShortcut);
    window.addEventListener("veriflow:open-search", handleOpen);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
      window.removeEventListener("veriflow:open-search", handleOpen);
    };
  }, []);

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const renderResult = (result: SearchResult) => {
    const Icon = icons[result.kind];
    const content = (
      <>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-foreground">{result.title}</span>
          <span className="block truncate text-xs text-muted-foreground">{result.subtitle}</span>
        </span>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
          {labels[result.kind]}
        </span>
      </>
    );
    const className =
      "command-item flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none";

    if (result.kind === "application") {
      return (
        <Link
          key={`${result.kind}-${result.key}`}
          to="/applications/$id"
          params={{ id: result.appId }}
          className={className}
          data-command-item="true"
          onClick={() => setOpen(false)}
        >
          {content}
        </Link>
      );
    }
    if (result.kind === "document") {
      return (
        <Link
          key={`${result.kind}-${result.key}`}
          to="/documents"
          search={{ app: result.appId }}
          className={className}
          data-command-item="true"
          onClick={() => setOpen(false)}
        >
          {content}
        </Link>
      );
    }
    if (result.kind === "rule") {
      return (
        <Link
          key={`${result.kind}-${result.key}`}
          to="/rules"
          search={{ q: result.ruleId }}
          className={className}
          data-command-item="true"
          onClick={() => setOpen(false)}
        >
          {content}
        </Link>
      );
    }
    return (
      <Link
        key={`${result.kind}-${result.key}`}
        to="/validation"
        search={{ app: result.appId }}
        className={className}
        data-command-item="true"
        onClick={() => setOpen(false)}
      >
        {content}
      </Link>
    );
  };

  const handlePaletteKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>("[data-command-item='true']"),
    );
    if (!items.length) return;
    event.preventDefault();
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    const nextIndex =
      event.key === "ArrowDown"
        ? currentIndex < 0 || currentIndex === items.length - 1
          ? 0
          : currentIndex + 1
        : currentIndex <= 0
          ? items.length - 1
          : currentIndex - 1;
    if (document.activeElement === inputRef.current && event.key === "ArrowUp") {
      items[items.length - 1]?.focus();
    } else {
      items[nextIndex]?.focus();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onKeyDown={handlePaletteKeyDown}
        className="top-[12%] max-h-[78vh] translate-y-0 gap-3 overflow-hidden p-0 sm:top-[15%]"
      >
        <DialogHeader className="border-b px-5 pb-3 pt-5 pr-12">
          <DialogTitle>Search VeriFlow</DialogTitle>
          <DialogDescription>Search demo records or navigate to a workspace.</DialogDescription>
        </DialogHeader>
        <div className="relative px-5">
          <Search
            className="absolute left-8 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            autoFocus
            ref={inputRef}
            aria-label="Search applications, documents, and findings"
            className="pl-9"
            placeholder="Search records or pages…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="min-h-32 space-y-4 overflow-y-auto px-3 pb-4" aria-live="polite">
          {(matchingCommands.length > 0 || showThemeCommand || demoCommandMatches) && (
            <section aria-label="Commands">
              <h3 className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Navigate
              </h3>
              <div className="space-y-0.5">
                {matchingCommands.map((command) => {
                  const Icon = command.icon;
                  return (
                    <Link
                      key={command.to}
                      to={command.to}
                      className="command-item flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                      data-command-item="true"
                      onClick={() => setOpen(false)}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-foreground">
                          {command.label}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {command.description}
                        </span>
                      </span>
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Page
                      </span>
                    </Link>
                  );
                })}
                {showThemeCommand && (
                  <button
                    type="button"
                    className="command-item flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                    data-command-item="true"
                    onClick={() => {
                      try {
                        toggleTheme();
                        setOpen(false);
                      } catch (error) {
                        toast.error("Could not save your appearance preference.");
                        console.error("Could not persist theme preference.", error);
                      }
                    }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground">
                      <themeCommand.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        {themeCommand.label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {themeCommand.description}
                      </span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Theme
                    </span>
                  </button>
                )}
                {demoCommandMatches && (
                  <button
                    type="button"
                    className="command-item flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                    data-command-item="true"
                    onClick={() => {
                      setOpen(false);
                      window.dispatchEvent(new Event("veriflow:start-guided-demo"));
                    }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground">
                      <Play className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-foreground">
                        Start guided demo
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        Follow the sample application walkthrough
                      </span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Demo
                    </span>
                  </button>
                )}
              </div>
            </section>
          )}
          {query.trim() &&
          results.length === 0 &&
          matchingCommands.length === 0 &&
          !showThemeCommand &&
          !demoCommandMatches ? (
            <p className="px-2 py-8 text-center text-sm text-muted-foreground">
              No matching pages or demo records.
            </p>
          ) : (
            (["application", "document", "finding", "rule"] as const).map((kind) => {
              const records = results.filter((result) => result.kind === kind);
              if (!records.length) return null;
              return (
                <section key={kind} aria-label={labels[kind]}>
                  <h3 className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {labels[kind]}
                  </h3>
                  <div className="space-y-0.5">{records.map(renderResult)}</div>
                </section>
              );
            })
          )}
        </div>
        <div className="border-t bg-muted/40 px-5 py-2 text-[11px] text-muted-foreground">
          Press <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono">Esc</kbd> to
          close · Search includes demo data only
        </div>
      </DialogContent>
    </Dialog>
  );
}
