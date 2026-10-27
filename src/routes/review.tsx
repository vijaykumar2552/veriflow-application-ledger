import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DemoNotice, EmptyState, PageHeader, Panel, StatusBadge } from "@/components/shared";
import { fmtDate, fmtDateTime, simulatedChecks, useStore, type ReviewStatus } from "@/lib/store";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Manual Review — VeriFlow AI" },
      {
        name: "description",
        content: "Applications requiring human review with reviewer comments.",
      },
      { property: "og:title", content: "Manual Review — VeriFlow AI" },
      { property: "og:description", content: "Human review queue." },
    ],
  }),
  component: Review,
});

const RS: ReviewStatus[] = ["Pending", "In Review", "Info Requested", "Approved", "Rejected"];

function Review() {
  const { apps, updateReview } = useStore();
  const queue = apps.filter(
    (a) => a.reviewStatus && a.reviewStatus !== "Approved" && a.reviewStatus !== "Rejected",
  );
  const [sel, setSel] = useState<string>("");
  const current = queue.find((a) => a.id === sel) ?? queue[0];
  const findings = current
    ? simulatedChecks(current).filter((check) => check.result !== "Pass")
    : [];
  const [status, setStatus] = useState<ReviewStatus | "">("");
  const [comment, setComment] = useState("");

  const save = () => {
    if (!current) return;
    const s = (status || current.reviewStatus) as ReviewStatus;
    if (!comment.trim() && s === current.reviewStatus) {
      toast.error("Add a comment or change the status");
      return;
    }
    updateReview(current.id, s, comment.trim());
    toast.success(`Review updated for ${current.id}`);
    setComment("");
    setStatus("");
  };

  return (
    <>
      <PageHeader
        title="Manual Review"
        subtitle="Applications routed for human verification. Decisions here are demo actions only."
      />
      {queue.length === 0 ? (
        <Panel>
          <EmptyState text="No applications in the review queue." />
        </Panel>
      ) : (
        <div className="grid gap-6 xl:grid-cols-5">
          <Panel title={`Review Queue (${queue.length})`} className="xl:col-span-2">
            <ul className="divide-y">
              {queue.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() => {
                      setSel(a.id);
                      setStatus("");
                      setComment("");
                    }}
                    className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-muted ${current?.id === a.id ? "bg-accent" : ""}`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{a.applicant}</div>
                      <div className="font-mono text-xs text-muted-foreground">
                        {a.id} · {fmtDate(a.submitted)}
                      </div>
                    </div>
                    <StatusBadge value={a.reviewStatus!} />
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
          {current && (
            <Panel
              title={`${current.id} — ${current.type}`}
              className="xl:col-span-3"
              actions={
                <Link
                  to="/applications/$id"
                  params={{ id: current.id }}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Open application
                </Link>
              }
            >
              <div className="space-y-5 p-5">
                <DemoNotice>
                  Findings below are deterministic demo scenarios based on application metadata;
                  document contents have not been analyzed.
                </DemoNotice>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="text-muted-foreground">Application status:</span>
                  <StatusBadge value={current.status} />
                  <span className="ml-3 text-muted-foreground">Review:</span>
                  <StatusBadge value={current.reviewStatus!} />
                </div>
                <p className="text-sm">{current.description}</p>
                <div>
                  <div className="mb-2 text-sm font-medium">
                    Potential findings ({findings.length})
                  </div>
                  {findings.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No warning or failure findings in this demo scenario.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {findings.map((finding) => (
                        <li key={finding.ruleId} className="rounded-lg border bg-card p-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-sm font-medium">{finding.name}</span>
                            <div className="flex items-center gap-2">
                              <StatusBadge value={finding.result} />
                              <StatusBadge value={finding.severity} />
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{finding.finding}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            <span className="font-medium text-foreground/80">
                              Demo evidence · {finding.ruleId}:
                            </span>{" "}
                            {finding.evidence}
                          </p>
                          <p className="mt-1 text-xs">
                            <span className="font-medium">Suggested next step:</span>{" "}
                            {finding.action}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="space-y-3 rounded-md border bg-muted/40 p-4">
                  <div className="text-sm font-medium">Reviewer decision</div>
                  <Select
                    value={status || current.reviewStatus || "Pending"}
                    onValueChange={(v) => setStatus(v as ReviewStatus)}
                  >
                    <SelectTrigger
                      className="w-full bg-card sm:w-60"
                      aria-label="Reviewer decision"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {RS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Label htmlFor="reviewer-comment">Reviewer comment</Label>
                  <Textarea
                    id="reviewer-comment"
                    className="bg-card"
                    rows={3}
                    placeholder="Add reviewer comment…"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    maxLength={500}
                  />
                  <Button onClick={save}>Save Review</Button>
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium">Comment history</div>
                  {current.comments.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No comments yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {[...current.comments].reverse().map((c, i) => (
                        <li key={i} className="rounded-md border p-3 text-sm">
                          {c.text}
                          <div className="mt-1 text-xs text-muted-foreground">
                            {c.by} · {fmtDateTime(c.at)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Panel>
          )}
        </div>
      )}
    </>
  );
}
