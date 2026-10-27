import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Inbox, Info } from "lucide-react";

const tone: Record<string, string> = {
  success: "bg-success/12 text-success border-success/25",
  warning: "bg-warning/15 text-warning-foreground border-warning/40",
  danger: "bg-destructive/10 text-destructive border-destructive/25",
  info: "bg-accent text-accent-foreground border-primary/20",
  muted: "bg-muted text-muted-foreground border-border",
};
const map: Record<string, keyof typeof tone> = {
  Verified: "success",
  "Checks Passed": "success",
  Pass: "success",
  Approved: "success",
  Low: "muted",
  "Needs Review": "warning",
  Warning: "warning",
  Medium: "warning",
  "In Review": "info",
  "Info Requested": "warning",
  Flagged: "danger",
  Rejected: "danger",
  Fail: "danger",
  High: "danger",
  Critical: "danger",
  Submitted: "info",
  "Under Validation": "info",
  Pending: "muted",
};

export function StatusBadge({ value }: { value: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone[map[value] ?? "muted"],
      )}
    >
      {value}
    </span>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[25px] font-semibold tracking-[-0.035em] text-foreground sm:text-[27px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title,
  actions,
  children,
  className,
}: {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "min-w-0 rounded-xl border bg-card shadow-[0_1px_2px_rgb(22_35_58_/_3%),0_8px_24px_rgb(22_35_58_/_2%)] transition-shadow duration-200",
        className,
      )}
    >
      {title && (
        <div className="flex min-h-[52px] items-center justify-between border-b px-5 py-3">
          <h2 className="text-[13px] font-semibold tracking-[-0.01em] text-foreground">{title}</h2>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-sm text-muted-foreground">
      <Inbox className="h-8 w-8 opacity-50" />
      {text}
    </div>
  );
}

export function DemoNotice({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-start gap-2 rounded-md border border-primary/20 bg-accent px-4 py-2.5 text-sm text-accent-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
