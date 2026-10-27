import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Play,
  Circle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DemoNotice, EmptyState, PageHeader, Panel, StatusBadge } from "@/components/shared";
import { AppPicker } from "@/components/AppPicker";
import { simulatedChecks, useStore, type Check } from "@/lib/store";

export const Route = createFileRoute("/validation")({
  validateSearch: (s: Record<string, unknown>) => ({
    app: typeof s["app"] === "string" ? s["app"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Validation Results — VeriFlow AI" },
      {
        name: "description",
        content: "Simulated validation checks, findings and recommended actions.",
      },
      { property: "og:title", content: "Validation Results — VeriFlow AI" },
      { property: "og:description", content: "Simulated validation results per application." },
    ],
  }),
  component: Validation,
});

function Validation() {
  const { app } = Route.useSearch();
  const nav = useNavigate({ from: "/validation" });
  const { apps, docs, log } = useStore();
  const appId = app ?? apps[0]?.id ?? "";
  const a = apps.find((x) => x.id === appId);
  const [running, setRunning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [stage, setStage] = useState(-1);
  const [detail, setDetail] = useState<Check | null>(null);

  const run = () => {
    setComplete(false);
    setStage(0);
    setRunning(true);
  };

  const selectApp = (value: string) => {
    setRunning(false);
    setComplete(false);
    setStage(-1);
    nav({ search: { app: value } });
  };

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      if (stage < 3) {
        setStage((current) => current + 1);
        return;
      }
      setRunning(false);
      setComplete(true);
      log("Validation Run", appId, "Simulated validation checks re-run (demo).");
      toast.success("Simulated verification complete");
    }, 500);
    return () => window.clearTimeout(timer);
  }, [appId, log, running, stage]);

  if (!a)
    return (
      <>
        <PageHeader title="Validation Results" />
        <Panel>
          <EmptyState text="No applications available." />
        </Panel>
      </>
    );
  const checks = simulatedChecks(a);
  const appDocs = docs.filter((d) => d.appId === a.id);
  const fails = checks.filter((c) => c.result === "Fail").length;
  const warns = checks.filter((c) => c.result === "Warning").length;
  const overall = fails ? "Fail" : warns ? "Warning" : "Pass";
  const Icon = overall === "Pass" ? CheckCircle2 : overall === "Warning" ? AlertTriangle : XCircle;
  const tone =
    overall === "Pass"
      ? "text-success"
      : overall === "Warning"
        ? "text-warning"
        : "text-destructive";
  const stages = [
    "Application information",
    "Selected documents",
    "Rule-based checks",
    "Findings & next steps",
  ];

  return (
    <>
      <PageHeader
        title="Validation Results"
        subtitle="Rule-based check outcomes per application."
        actions={
          <>
            <Button variant="outline" onClick={run} disabled={running}>
              {running ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}{" "}
              {running ? "Demo verification in progress" : "Run Demo Verification"}
            </Button>
            <Button asChild>
              <Link to="/applications/$id" params={{ id: a.id }}>
                Open Application
              </Link>
            </Button>
          </>
        }
      />
      <DemoNotice>
        DEMO / SIMULATED VERIFICATION — fixed results from local demo logic; no document contents
        are analyzed and this is not an official compliance determination.
      </DemoNotice>
      <div className="mb-6">
        <AppPicker value={appId} onChange={selectApp} />
      </div>

      <Panel title="Verification workflow" className="mb-6">
        <div className="grid gap-0 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-4">
          {stages.map((label, index) => {
            const done = complete || (running && index < stage);
            const active = running && index === stage;
            return (
              <div key={label} className="relative flex items-center gap-3 px-1 py-2.5 sm:px-3">
                <span
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${done ? "border-success/30 bg-success/10 text-success" : active ? "border-primary/30 bg-accent text-primary" : "border-border bg-muted/60 text-muted-foreground"}`}
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : active ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-medium">{label}</div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">
                    {done ? "Complete" : active ? "In progress" : "Ready"}
                  </div>
                </div>
                {index < stages.length - 1 && (
                  <span className="absolute left-9 top-[27px] hidden h-px w-[calc(100%-1rem)] bg-border xl:block" />
                )}
              </div>
            );
          })}
        </div>
        {running && (
          <div className="border-t bg-muted/30 px-5 py-3">
            <div
              className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground"
              aria-live="polite"
            >
              <span>Running deterministic demo checks…</span>
              <span className="tabular-nums">
                {Math.round(((stage + 1) / stages.length) * 100)}%
              </span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-label="Simulated verification progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(((stage + 1) / stages.length) * 100)}
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                style={{ width: `${((stage + 1) / stages.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </Panel>

      <div className="mb-6 grid gap-6 xl:grid-cols-5">
        <Panel title="Application information" className="xl:col-span-2">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-4 p-5">
            {[
              ["Applicant", a.applicant],
              ["Application ID", a.id],
              ["Application type", a.type],
              ["Reference", a.reference],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0">
                <dt className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1 truncate text-xs font-medium" title={value}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Panel>
        <Panel title={`Selected documents · ${appDocs.length}`} className="xl:col-span-3">
          {appDocs.length ? (
            <ul className="divide-y">
              {appDocs.map((document) => (
                <li key={document.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-medium">{document.name}</div>
                    <div className="mt-0.5 text-[10px] text-muted-foreground">
                      {document.docType} · demo metadata only
                    </div>
                  </div>
                  <StatusBadge value={document.status} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState text="No documents attached to this application." />
          )}
        </Panel>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="flex items-center gap-4 rounded-xl border bg-card p-5 shadow-sm md:col-span-2">
          {running ? (
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          ) : (
            <Icon className={`h-10 w-10 ${tone}`} />
          )}
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Overall status (simulated)
            </div>
            <div className="text-xl font-semibold">
              {running
                ? "Running checks…"
                : overall === "Pass"
                  ? "All checks passed"
                  : overall === "Warning"
                    ? "Passed with warnings"
                    : "Issues found"}
            </div>
            <div className="text-sm text-muted-foreground">
              {a.applicant} · {a.type}
            </div>
          </div>
        </div>
        <Stat label="Passed" value={checks.length - fails - warns} />
        <Stat label="Warnings / Failures" value={`${warns} / ${fails}`} />
      </div>

      <Panel
        title="Individual Checks"
        actions={
          <span className="mr-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            Fixed demo scenario
          </span>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Check</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Finding</TableHead>
              <TableHead>Recommended Action</TableHead>
              <TableHead className="pr-5" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {checks.map((c) => (
              <TableRow key={c.name}>
                <TableCell className="pl-5 font-medium">
                  {c.name}
                  <div className="font-mono text-xs text-muted-foreground">{c.ruleId}</div>
                </TableCell>
                <TableCell>
                  <StatusBadge value={c.result} />
                </TableCell>
                <TableCell>
                  <StatusBadge value={c.severity} />
                </TableCell>
                <TableCell className="max-w-xs text-sm text-muted-foreground">
                  {c.finding}
                </TableCell>
                <TableCell className="max-w-xs text-sm">{c.action}</TableCell>
                <TableCell className="pr-5">
                  <Button size="sm" variant="outline" onClick={() => setDetail(c)}>
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent>
          {detail && (
            <>
              <DialogHeader>
                <DialogTitle>{detail.name}</DialogTitle>
                <DialogDescription>Simulated finding · Rule {detail.ruleId}</DialogDescription>
              </DialogHeader>
              <div className="flex gap-2">
                <StatusBadge value={detail.result} />
                <StatusBadge value={detail.severity} />
              </div>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Finding</dt>
                  <dd>{detail.finding}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Evidence notes</dt>
                  <dd>{detail.evidence}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase text-muted-foreground">Recommended action</dt>
                  <dd>{detail.action}</dd>
                </div>
              </dl>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}
