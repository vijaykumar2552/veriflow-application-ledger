import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  FileStack,
  FileCheck2,
  ShieldCheck,
  BookOpen,
  UserCheck,
  ScrollText,
  FileBarChart,
  Settings,
  Menu,
  X,
  Search,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { GlobalCommand } from "@/components/GlobalCommand";
import { NotificationCenter } from "@/components/NotificationCenter";
import { ClockAndTheme } from "@/components/ClockAndTheme";
import { GuidedDemo } from "@/components/GuidedDemo";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, group: "Workspace" },
  { to: "/applications", label: "Applications", icon: FileStack, group: "Workspace" },
  { to: "/documents", label: "Document Verification", icon: FileCheck2, group: "Workspace" },
  { to: "/validation", label: "Validation Results", icon: ShieldCheck, group: "Workspace" },
  { to: "/rules", label: "Regulatory Rules", icon: BookOpen, group: "Governance" },
  { to: "/review", label: "Manual Review", icon: UserCheck, group: "Governance" },
  { to: "/audit", label: "Audit Logs", icon: ScrollText, group: "Governance" },
  { to: "/reports", label: "Reports", icon: FileBarChart, group: "Governance" },
  { to: "/settings", label: "Settings", icon: Settings, group: "Account" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [open, setOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const { officer, apps } = useStore();
  const pending = apps.filter(
    (a) => a.reviewStatus && a.reviewStatus !== "Approved" && a.reviewStatus !== "Rejected",
  ).length;
  const initials = officer
    .replace("Officer ", "")
    .split(/[ .]+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => {
      setIsCompact(media.matches);
      if (!media.matches) {
        setOpen(false);
        if (
          document.activeElement === closeButtonRef.current ||
          document.activeElement === menuButtonRef.current
        ) {
          mainRef.current?.focus();
        }
      }
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isCompact || !open) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = sidebarRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCompact, open]);

  return (
    <div className="flex min-h-screen w-full">
      <aside
        ref={sidebarRef}
        aria-label="Main navigation"
        role={isCompact && open ? "dialog" : undefined}
        aria-modal={isCompact && open ? true : undefined}
        inert={isCompact && !open}
        className={cn(
          "no-print fixed inset-y-0 left-0 z-40 flex w-[272px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="border-b border-sidebar-border px-5 pb-5 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm shadow-black/15">
              <ShieldCheck className="h-[21px] w-[21px]" strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight text-sidebar-accent-foreground">
                VeriFlow <span className="font-normal text-sidebar-foreground">AI</span>
              </div>
              <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/65">
                AI Verification Platform
              </div>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            className="absolute right-4 top-5 rounded-md p-1.5 transition-colors hover:bg-sidebar-accent lg:hidden"
            onClick={() => {
              setOpen(false);
              menuButtonRef.current?.focus();
            }}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {(["Workspace", "Governance", "Account"] as const).map((group) => (
            <div key={group} className={group === "Workspace" ? "" : "mt-7"}>
              <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-sidebar-foreground/45">
                {group}
              </div>
              {nav.map((n) => {
                if (n.group !== group) return null;
                const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => {
                      setOpen(false);
                      menuButtonRef.current?.focus();
                    }}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative mb-1 flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors duration-150",
                      active
                        ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground shadow-sm shadow-black/10 before:absolute before:inset-y-2 before:left-0 before:w-[3px] before:rounded-full before:bg-sidebar-primary"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <n.icon
                      className={cn(
                        "h-[17px] w-[17px] shrink-0 transition-colors",
                        active
                          ? "text-sidebar-primary"
                          : "text-sidebar-foreground/65 group-hover:text-sidebar-accent-foreground",
                      )}
                      strokeWidth={1.8}
                    />
                    <span className="flex-1">{n.label}</span>
                    {n.to === "/review" && pending > 0 && (
                      <span className="rounded-md bg-warning/15 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-amber-200">
                        {pending}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-4 rounded-lg border border-sidebar-border bg-black/10 p-3">
            <div className="flex items-center gap-2 text-[11px] font-medium text-sidebar-accent-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              Demo environment
            </div>
            <p className="mt-1.5 text-[10px] leading-relaxed text-sidebar-foreground/65">
              Synthetic records · simulated checks only
            </p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("veriflow:start-guided-demo"))}
              className="mt-2 inline-flex items-center gap-1.5 rounded px-1 py-1 text-[11px] font-medium text-sidebar-accent-foreground transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            >
              <Play className="h-3 w-3" aria-hidden="true" />
              Start guided demo
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-medium text-sidebar-accent-foreground">
                {officer}
              </div>
              <div className="mt-0.5 text-[10px] text-sidebar-foreground/60">Review officer</div>
            </div>
          </div>
        </div>
      </aside>
      {open && (
        <button
          className="fixed inset-0 z-30 cursor-default bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
          onClick={() => {
            setOpen(false);
            menuButtonRef.current?.focus();
          }}
          aria-label="Close navigation"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-[272px]">
        <header className="no-print sticky top-0 z-20 flex h-[68px] items-center gap-3 border-b bg-card/90 px-4 backdrop-blur-xl lg:px-8">
          <button
            ref={menuButtonRef}
            className="rounded-lg p-2 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden text-[13px] text-muted-foreground sm:block">
            Application validation <span className="mx-1.5 text-border">/</span>{" "}
            <span className="text-foreground/80">Compliance workspace</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("veriflow:open-search"))}
              className="hidden h-9 items-center gap-2 rounded-lg border bg-card px-3 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
              aria-label="Search VeriFlow"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>Search</span>
              <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                Ctrl / ⌘ K
              </kbd>
            </button>
            <div className="sm:hidden">
              <GlobalCommandTrigger />
            </div>
            <ClockAndTheme />
            <NotificationCenter />
            <span className="hidden items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200 sm:inline-flex sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-300" />
              Demo mode
            </span>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {initials}
            </div>
            <span className="hidden text-[13px] font-medium text-foreground/85 md:inline">
              {officer}
            </span>
          </div>
        </header>
        <main
          ref={mainRef}
          tabIndex={-1}
          className="mx-auto w-full max-w-[1680px] flex-1 px-4 py-6 outline-none sm:px-6 lg:px-9 lg:py-8"
        >
          <div key={path} className="page-enter">
            {children}
          </div>
        </main>
      </div>
      <GlobalCommand />
      <GuidedDemo />
    </div>
  );
}

function GlobalCommandTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("veriflow:open-search"))}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Search VeriFlow"
    >
      <Search className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
