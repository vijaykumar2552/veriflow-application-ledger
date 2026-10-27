import { useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APP_TYPES, useStore } from "@/lib/store";

export function NewApplicationDialog({ trigger }: { trigger: ReactNode }) {
  const { addApp } = useStore();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({ applicant: "", type: "", reference: "", description: "" });
  const [err, setErr] = useState<
    Partial<Record<"applicant" | "type" | "reference" | "description", string>>
  >({});

  const submit = () => {
    const e: Partial<Record<"applicant" | "type" | "reference" | "description", string>> = {};
    if (f.applicant.trim().length < 3) e.applicant = "Enter at least 3 characters.";
    if (!f.type) e.type = "Select an application type.";
    if (!/^[A-Za-z0-9/-]{5,30}$/.test(f.reference.trim()))
      e.reference = "5–30 characters: letters, numbers, / or -.";
    if (f.description.trim().length < 10) e.description = "Enter at least 10 characters.";
    setErr(e);
    if (Object.keys(e).length) return;
    const app = addApp({
      applicant: f.applicant.trim(),
      type: f.type,
      reference: f.reference.trim().toUpperCase(),
      description: f.description.trim(),
    });
    toast.success(`Application ${app.id} created`);
    setOpen(false);
    setF({ applicant: "", type: "", reference: "", description: "" });
    nav({ to: "/applications/$id", params: { id: app.id } });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Application</DialogTitle>
          <DialogDescription>Saved locally in this browser for demo purposes.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Field id="applicant-name" label="Applicant name" error={err.applicant}>
            <Input
              id="applicant-name"
              aria-invalid={!!err.applicant}
              aria-describedby={err.applicant ? "applicant-name-error" : undefined}
              value={f.applicant}
              onChange={(e) => setF({ ...f, applicant: e.target.value })}
              placeholder="e.g. Ravi Enterprises"
            />
          </Field>
          <Field id="application-type" label="Application type" error={err.type}>
            <Select value={f.type} onValueChange={(v) => setF({ ...f, type: v })}>
              <SelectTrigger
                id="application-type"
                aria-invalid={!!err.type}
                aria-describedby={err.type ? "application-type-error" : undefined}
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {APP_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field
            id="application-reference"
            label="Application reference number"
            error={err.reference}
          >
            <Input
              id="application-reference"
              aria-invalid={!!err.reference}
              aria-describedby={err.reference ? "application-reference-error" : undefined}
              value={f.reference}
              onChange={(e) => setF({ ...f, reference: e.target.value })}
              placeholder="e.g. TL/DEL/12345"
            />
          </Field>
          <Field id="application-description" label="Description" error={err.description}>
            <Textarea
              id="application-description"
              aria-invalid={!!err.description}
              aria-describedby={err.description ? "application-description-error" : undefined}
              rows={3}
              value={f.description}
              onChange={(e) => setF({ ...f, description: e.target.value })}
              placeholder="Brief purpose of the application"
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={submit}>Create Application</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
