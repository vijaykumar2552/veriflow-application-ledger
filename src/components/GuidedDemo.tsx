import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SAMPLE_APP = "APP-2026-1048";

export function GuidedDemo() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const steps = useMemo(
    () => [
      {
        title: "Dashboard",
        description:
          "Start with the command centre: application counts, simulated outcomes, and recent demo activity.",
        visit: () => navigate({ to: "/" }),
      },
      {
        title: "Sample application",
        description:
          "Open a seeded sample record to inspect applicant information and its current workflow state.",
        visit: () =>
          navigate({
            to: "/applications/$id",
            params: { id: SAMPLE_APP },
          }),
      },
      {
        title: "Document Centre",
        description:
          "Review attached document metadata. The prototype records filenames and categories only; it does not read or authenticate file contents.",
        visit: () =>
          navigate({
            to: "/documents",
            search: { app: SAMPLE_APP },
          }),
      },
      {
        title: "Validation Centre",
        description:
          "Inspect the deterministic simulated checks, evidence text, severity, and recommended next actions for the sample.",
        visit: () =>
          navigate({
            to: "/validation",
            search: { app: SAMPLE_APP },
          }),
      },
      {
        title: "Illustrative rules",
        description:
          "Browse the demo rule library. These examples are not authoritative legal requirements or an official government service.",
        visit: () => navigate({ to: "/rules", search: { q: "" } }),
      },
      {
        title: "Human review",
        description:
          "See applications routed for manual review and the available reviewer actions using local demo state.",
        visit: () => navigate({ to: "/review" }),
      },
      {
        title: "Audit Trail",
        description:
          "Review the seeded and browser-generated activity entries. The demo log is not immutable or tamper-proof.",
        visit: () => navigate({ to: "/audit" }),
      },
      {
        title: "Reports",
        description:
          "Preview the selected sample's report and export its local demo data as CSV or print to PDF.",
        visit: () =>
          navigate({
            to: "/reports",
            search: { app: SAMPLE_APP },
          }),
      },
    ],
    [navigate],
  );

  const visit = useCallback(
    (index: number) => {
      const destination = steps[index];
      if (!destination) return;
      destination.visit().catch((error: unknown) => {
        toast.error("Could not open the next demo section.");
        console.error("Guided demo navigation failed.", error);
      });
    },
    [steps],
  );

  useEffect(() => {
    const handleStart = () => {
      setCurrent(0);
      setOpen(true);
      visit(0);
    };
    window.addEventListener("veriflow:start-guided-demo", handleStart);
    return () => window.removeEventListener("veriflow:start-guided-demo", handleStart);
  }, [visit]);

  const goTo = (index: number) => {
    if (!steps[index]) return;
    setCurrent(index);
    visit(index);
  };

  const step = steps[current];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
            Guided SIH demonstration
          </div>
          <DialogTitle>{step?.title}</DialogTitle>
          <DialogDescription>{step?.description}</DialogDescription>
        </DialogHeader>
        <div
          className="flex items-center gap-1.5"
          role="progressbar"
          aria-label="Guided demo progress"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={current + 1}
        >
          {steps.map((item, index) => (
            <span
              key={item.title}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                index <= current ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Step {current + 1} of {steps.length} · Sample data only
        </p>
        <DialogFooter className="flex-row items-center justify-between sm:justify-between">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" aria-hidden="true" />
            Exit demo
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" disabled={current === 0} onClick={() => goTo(current - 1)}>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </Button>
            {current < steps.length - 1 ? (
              <Button onClick={() => goTo(current + 1)}>
                Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button onClick={() => setOpen(false)}>
                Finish <Check className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
