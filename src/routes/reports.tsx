import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, Printer, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState, PageHeader, Panel, StatusBadge } from "@/components/shared";
import { AppPicker } from "@/components/AppPicker";
import { fmtDate, fmtDateTime, fmtSize, simulatedChecks, useStore } from "@/lib/store";
import { toCsv } from "@/lib/csv";

export const Route = createFileRoute("/reports")({
  validateSearch: (s: Record<string, unknown>) => ({
    app: typeof s["app"] === "string" ? s["app"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Reports — VeriFlow AI" },
      { name: "description", content: "Printable validation report for an application." },
      { property: "og:title", content: "Reports — VeriFlow AI" },
      { property: "og:description", content: "Printable validation reports." },
    ],
  }),
  component: Reports,
});

function Reports() {
  const { app } = Route.useSearch();
  const nav = useNavigate({ from: "/reports" });
  const { apps, docs, officer, log } = useStore();
  const appId = app ?? apps[0]?.id ?? "";
  const a = apps.find((x) => x.id === appId);

  const print = () => {
    log("Report Printed", appId, "Validation report opened in browser print dialog.");
    window.print();
  };

  const exportCsv = () => {
    if (!a) return;
    const checks = simulatedChecks(a);
    const appRows = [
      ["Application", a.id, "Applicant", a.applicant, "Type", a.type, "Reference", a.reference],
      ["Application", a.id, "Submitted", fmtDate(a.submitted), "Status", a.status],
      ...docs
        .filter((document) => document.appId === a.id)
        .map((document) => [
          "Document",
          document.id,
          "File",
          document.name,
          "Type",
          document.docType,
          "Size",
          fmtSize(document.size),
          "Status",
          document.status,
        ]),
      ...checks.map((check) => [
        "Simulated check",
        check.ruleId,
        "Check",
        check.name,
        "Finding",
        check.finding,
        "Result",
        check.result,
        "Severity",
        check.severity,
        "Recommended action",
        check.action,
      ]),
      ...a.comments.map((comment) => [
        "Reviewer comment",
        comment.by,
        "Date",
        fmtDateTime(comment.at),
        "Comment",
        comment.text,
      ]),
    ];
    const csv = toCsv([
      [
        "Record type",
        "Record ID",
        "Field 1",
        "Value 1",
        "Field 2",
        "Value 2",
        "Field 3",
        "Value 3",
        "Field 4",
        "Value 4",
        "Field 5",
        "Value 5",
      ],
      ...appRows,
    ]);
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${a.id.toLowerCase()}-validation-report.csv`;
    link.click();
    URL.revokeObjectURL(url);
    log("Report Exported", a.id, "Simulated validation report exported as CSV.");
  };

  return (
    <>
      <div className="no-print">
        <PageHeader
          title="Reports"
          subtitle="Generate a readable validation report. Use Print → Save as PDF to export."
          actions={
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={exportCsv} disabled={!a}>
                <Download className="h-4 w-4" /> Export CSV
              </Button>
              <Button onClick={print} disabled={!a}>
                <Printer className="h-4 w-4" /> Print / Save as PDF
              </Button>
            </div>
          }
        />
        <div className="mb-6">
          <AppPicker value={appId} onChange={(v) => nav({ search: { app: v } })} />
        </div>
      </div>
      {!a ? (
        <Panel>
          <EmptyState text="Select an application to view its report." />
        </Panel>
      ) : (
        <Panel className="print-area mx-auto max-w-4xl">
          <div className="p-8 lg:p-10">
            <div className="flex items-start justify-between border-b pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-semibold">VeriFlow AI — Validation Report</div>
                  <div className="text-sm text-muted-foreground">Prototype output · SIH26261</div>
                </div>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <div>Generated {fmtDateTime(new Date().toISOString())}</div>
                <div>By {officer}</div>
              </div>
            </div>

            <div className="mt-4 rounded-md border border-warning/40 bg-warning/15 px-4 py-2.5 text-sm text-warning-foreground">
              This report contains simulated results from a demonstration prototype. It is not a
              compliance certificate or official approval.
            </div>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Application
            </h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {[
                ["Application ID", a.id],
                ["Applicant", a.applicant],
                ["Type", a.type],
                ["Reference", a.reference],
                ["Submitted", fmtDate(a.submitted)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd>
                  <StatusBadge value={a.status} />
                </dd>
              </div>
            </dl>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Documents
            </h3>
            <div className="mt-3 w-full overflow-x-auto print:overflow-visible">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="py-2 font-medium">File</th>
                    <th className="font-medium">Type</th>
                    <th className="font-medium">Size</th>
                    <th className="font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {docs
                    .filter((d) => d.appId === a.id)
                    .map((d) => (
                      <tr key={d.id} className="border-b">
                        <td className="py-2">{d.name}</td>
                        <td>{d.docType}</td>
                        <td>{fmtSize(d.size)}</td>
                        <td>{d.status}</td>
                      </tr>
                    ))}
                  {!docs.some((d) => d.appId === a.id) && (
                    <tr>
                      <td colSpan={4} className="py-3 text-muted-foreground">
                        No documents attached.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Simulated Checks
            </h3>
            <div className="mt-3 w-full overflow-x-auto print:overflow-visible">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="py-2 font-medium">Check</th>
                    <th className="font-medium">Result</th>
                    <th className="font-medium">Severity</th>
                    <th className="font-medium">Recommended action</th>
                  </tr>
                </thead>
                <tbody>
                  {simulatedChecks(a).map((c) => (
                    <tr key={c.name} className="border-b align-top">
                      <td className="py-2 pr-3">
                        {c.name}
                        <div className="text-xs text-muted-foreground">{c.finding}</div>
                      </td>
                      <td className="pr-3">{c.result}</td>
                      <td className="pr-3">{c.severity}</td>
                      <td>{c.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {a.comments.length > 0 && (
              <>
                <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Reviewer Comments
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {a.comments.map((c, i) => (
                    <li key={i}>
                      “{c.text}” — {c.by}, {fmtDateTime(c.at)}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="mt-10 border-t pt-4 text-xs text-muted-foreground">
              Generated by the VeriFlow AI prototype using synthetic data. No genuine AI
              verification, forensic document authentication or regulatory approval has been
              performed.
            </p>
          </div>
        </Panel>
      )}
    </>
  );
}
