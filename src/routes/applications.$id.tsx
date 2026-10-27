import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, ShieldCheck, FileBarChart, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoNotice, EmptyState, PageHeader, Panel, StatusBadge } from "@/components/shared";
import { fmtDate, fmtDateTime, fmtSize, simulatedChecks, useStore } from "@/lib/store";

export const Route = createFileRoute("/applications/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.id} — VeriFlow AI` },
      {
        name: "description",
        content: "Application details, documents and simulated validation summary.",
      },
      { property: "og:title", content: `${params.id} — VeriFlow AI` },
      { property: "og:description", content: "Application detail view." },
    ],
  }),
  component: Detail,
});

function Detail() {
  const { id } = Route.useParams();
  const { apps, docs, audit } = useStore();
  const app = apps.find((a) => a.id === id);
  if (!app)
    return (
      <Panel>
        <EmptyState text={`Application ${id} not found.`} />
        <div className="pb-8 text-center">
          <Button asChild variant="outline">
            <Link to="/applications">Back to applications</Link>
          </Button>
        </div>
      </Panel>
    );
  const myDocs = docs.filter((d) => d.appId === id);
  const checks = simulatedChecks(app);
  const logs = audit.filter((l) => l.appId === id);

  return (
    <>
      <Link
        to="/applications"
        className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Applications
      </Link>
      <PageHeader
        title={app.applicant}
        subtitle={`${app.id} · ${app.type} · Ref ${app.reference}`}
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/documents" search={{ app: app.id }}>
                <Upload className="h-4 w-4" /> Attach Documents
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/validation" search={{ app: app.id }}>
                <ShieldCheck className="h-4 w-4" /> Validation
              </Link>
            </Button>
            <Button asChild>
              <Link to="/reports" search={{ app: app.id }}>
                <FileBarChart className="h-4 w-4" /> Report
              </Link>
            </Button>
          </>
        }
      />
      <div className="grid min-w-0 gap-6 xl:grid-cols-3">
        <div className="min-w-0 space-y-6 xl:col-span-2">
          <Panel title="Application Details">
            <dl className="grid gap-4 p-5 sm:grid-cols-2">
              {[
                ["Status", <StatusBadge key="s" value={app.status} />],
                [
                  "Review status",
                  app.reviewStatus ? (
                    <StatusBadge key="r" value={app.reviewStatus} />
                  ) : (
                    "Not required"
                  ),
                ],
                ["Submitted", fmtDate(app.submitted)],
                ["Reference", app.reference],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className="mt-1 text-sm font-medium">{v}</dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Description
                </dt>
                <dd className="mt-1 text-sm">{app.description}</dd>
              </div>
            </dl>
          </Panel>
          <Panel title={`Documents (${myDocs.length})`}>
            {myDocs.length === 0 ? (
              <EmptyState text="No documents attached yet." />
            ) : (
              <ul className="divide-y">
                {myDocs.map((d) => (
                  <li key={d.id} className="flex items-center gap-3 px-5 py-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{d.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {d.docType} · {fmtSize(d.size)}
                      </div>
                    </div>
                    <StatusBadge value={d.status} />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel title="Simulated Check Summary">
            <DemoNotice>
              Simulated results for demonstration — no real AI analysis was performed.
            </DemoNotice>
            <ul className="divide-y">
              {checks.map((c) => (
                <li key={c.name} className="flex items-center justify-between px-5 py-3 text-sm">
                  <span>{c.name}</span>
                  <StatusBadge value={c.result} />
                </li>
              ))}
            </ul>
          </Panel>
        </div>
        <div className="min-w-0 space-y-6">
          <Panel title="Reviewer Comments">
            {app.comments.length === 0 ? (
              <EmptyState text="No comments yet." />
            ) : (
              <ul className="space-y-3 p-5">
                {app.comments.map((c, i) => (
                  <li key={i} className="rounded-md bg-muted p-3 text-sm">
                    <div>{c.text}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {c.by} · {fmtDateTime(c.at)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
          <Panel title="Activity">
            {logs.length === 0 ? (
              <EmptyState text="No activity yet." />
            ) : (
              <ol className="space-y-4 p-5">
                {logs.map((l) => (
                  <li key={l.id} className="border-l-2 border-primary/30 pl-3 text-sm">
                    <div className="font-medium">{l.action}</div>
                    <div className="text-muted-foreground">{l.description}</div>
                    <div className="text-xs text-muted-foreground">
                      {fmtDateTime(l.at)} · {l.user}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </Panel>
        </div>
      </div>
    </>
  );
}
