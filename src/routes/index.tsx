import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileStack,
  FileCheck2,
  UserCheck,
  AlertTriangle,
  Plus,
  Clock3,
  ArrowUpRight,
} from "lucide-react";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader, Panel, StatusBadge } from "@/components/shared";
import { NewApplicationDialog } from "@/components/NewApplicationDialog";
import { APP_TYPES, fmtDate, useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — VeriFlow AI" },
      {
        name: "description",
        content: "Overview of applications, verified documents and flagged inconsistencies.",
      },
      { property: "og:title", content: "Dashboard — VeriFlow AI" },
      { property: "og:description", content: "Application validation overview dashboard." },
    ],
  }),
  component: Dashboard,
});

const COLORS: Record<string, string> = {
  Verified: "var(--chart-1)",
  "Under Validation": "var(--chart-2)",
  Submitted: "var(--chart-5)",
  "Needs Review": "var(--chart-3)",
  Flagged: "var(--chart-4)",
  Rejected: "var(--muted-foreground)",
};

function Dashboard() {
  const { apps, docs, audit, officer } = useStore();
  const stats = [
    {
      label: "Total Applications",
      value: apps.length,
      icon: FileStack,
      tone: "text-primary bg-accent",
    },
    {
      label: "Documents Passing Checks",
      value: docs.filter((d) => d.status === "Checks Passed").length,
      icon: FileCheck2,
      tone: "text-success bg-success/12",
    },
    {
      label: "Requiring Review",
      value: apps.filter((a) => a.status === "Needs Review").length,
      icon: UserCheck,
      tone: "text-warning-foreground bg-warning/15",
    },
    {
      label: "Flagged Inconsistencies",
      value: apps.filter((a) => a.status === "Flagged").length,
      icon: AlertTriangle,
      tone: "text-destructive bg-destructive/10",
    },
  ];
  const byStatus = Object.keys(COLORS)
    .map((s) => ({ name: s, value: apps.filter((a) => a.status === s).length }))
    .filter((x) => x.value);
  const byType = APP_TYPES.map((t) => ({
    name: t.split(" ")[0],
    count: apps.filter((a) => a.type === t).length,
  }));

  return (
    <>
      <PageHeader
        title={`Welcome back, ${officer.replace(/^Officer /, "")}`}
        subtitle="A snapshot of your verification workspace. All records and checks are synthetic demo data."
        actions={
          <NewApplicationDialog
            trigger={
              <Button size="lg">
                <Plus className="h-4 w-4" /> New Application
              </Button>
            }
          />
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, index) => (
          <div
            key={s.label}
            className="stat-enter rounded-xl border bg-card p-5 shadow-[0_1px_2px_rgb(22_35_58_/_3%),0_8px_24px_rgb(22_35_58_/_2%)]"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted-foreground">{s.label}</span>
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.tone}`}>
                <s.icon className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-3 text-[30px] font-semibold tracking-tight tabular-nums">
              {s.value}
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">Synthetic demo records</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel
          title="Recent Applications"
          className="xl:col-span-2"
          actions={
            <Link to="/applications" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          }
        >
          {apps.length === 0 ? (
            <div className="px-5">
              <p className="py-12 text-center text-sm text-muted-foreground">
                No applications yet. Create a demo application to get started.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">ID</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apps.slice(0, 6).map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="pl-5 font-mono text-xs">
                      <Link
                        to="/applications/$id"
                        params={{ id: a.id }}
                        className="font-medium text-primary hover:underline"
                      >
                        {a.id}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">{a.applicant}</TableCell>
                    <TableCell className="text-muted-foreground">{a.type}</TableCell>
                    <TableCell className="text-muted-foreground">{fmtDate(a.submitted)}</TableCell>
                    <TableCell>
                      <StatusBadge value={a.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Panel>
        <Panel title="Verification Status">
          {byStatus.length === 0 ? (
            <div className="flex h-64 items-center justify-center px-5 text-center text-sm text-muted-foreground">
              Status distribution will appear when demo applications are added.
            </div>
          ) : (
            <>
              <div className="h-56 p-4">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={byStatus}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                    >
                      {byStatus.map((s) => (
                        <Cell key={s.name} fill={COLORS[s.name]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="space-y-1.5 px-5 pb-5 text-sm">
                {byStatus.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: COLORS[s.name] }}
                    />
                    <span className="flex-1 text-muted-foreground">{s.name}</span>
                    <span className="font-medium tabular-nums">{s.value}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Panel title="Applications by Type">
          <div className="h-64 p-4">
            <ResponsiveContainer>
              <BarChart data={byType}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <Tooltip />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel
          title="Recent Activity"
          actions={
            <Link
              to="/audit"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              View audit log <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          {audit.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-2 px-5 text-center text-sm text-muted-foreground">
              <Clock3 className="h-7 w-7 text-muted-foreground/50" />
              No activity recorded yet.
            </div>
          ) : (
            <ol className="divide-y">
              {audit.slice(0, 4).map((entry) => (
                <li key={entry.id} className="flex gap-3 px-5 py-3.5">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/65" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className="text-[13px] font-medium">{entry.action}</span>
                      <time className="text-[11px] text-muted-foreground">{fmtDate(entry.at)}</time>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {entry.description}
                    </p>
                    <span className="mt-1 block text-[10px] text-muted-foreground/80">
                      {entry.user}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </div>
    </>
  );
}
