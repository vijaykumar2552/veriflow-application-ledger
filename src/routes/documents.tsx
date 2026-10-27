import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import type { DragEvent } from "react";
import { toast } from "sonner";
import { FileText, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { DOC_TYPES, fmtDateTime, fmtSize, useStore } from "@/lib/store";

export const Route = createFileRoute("/documents")({
  validateSearch: (s: Record<string, unknown>) => ({
    app: typeof s["app"] === "string" ? s["app"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Document Verification — VeriFlow AI" },
      { name: "description", content: "Attach PDF, PNG and JPG documents to applications." },
      { property: "og:title", content: "Document Verification — VeriFlow AI" },
      { property: "og:description", content: "Attach and track application documents." },
    ],
  }),
  component: Documents,
});

const ACCEPT = ["application/pdf", "image/png", "image/jpeg"];
const FILE_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
};
const MAX = 10 * 1024 * 1024;

function Documents() {
  const { app } = Route.useSearch();
  const nav = useNavigate({ from: "/documents" });
  const { docs, addDocs, setDocType, removeDoc } = useStore();
  const appId = app ?? "";
  const input = useRef<HTMLInputElement>(null);
  const [staged, setStaged] = useState<{ file: File; docType: string }[]>([]);
  const [dragging, setDragging] = useState(false);

  const pick = (files: FileList | null) => {
    if (!files) return;
    const ok: { file: File; docType: string }[] = [];
    Array.from(files).forEach((f) => {
      const extension = f.name.split(".").pop()?.toLowerCase();
      const expectedType = FILE_TYPES[extension ?? ""];
      if (!expectedType || (f.type !== "" && (!ACCEPT.includes(f.type) || f.type !== expectedType)))
        toast.error(`${f.name}: only PDF, PNG or JPG allowed`);
      else if (f.size > MAX) toast.error(`${f.name}: exceeds 10 MB`);
      else ok.push({ file: f, docType: "Other" });
    });
    setStaged((s) => [...s, ...ok]);
    if (input.current) input.current.value = "";
  };

  const dropFiles = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragging(false);
    pick(event.dataTransfer.files);
  };

  const attach = () => {
    if (!appId) {
      toast.error("Select an application first");
      return;
    }
    addDocs(
      appId,
      staged.map((s) => ({ name: s.file.name, size: s.file.size, docType: s.docType })),
    );
    toast.success(`${staged.length} document(s) attached to ${appId}`);
    setStaged([]);
  };

  const list = appId ? docs.filter((d) => d.appId === appId) : docs;

  return (
    <>
      <PageHeader
        title="Document Verification"
        subtitle="Attach supporting documents to an application."
      />
      <DemoNotice>
        Only the file name, size and type are recorded. File contents are not read, extracted or
        forensically authenticated in this prototype.
      </DemoNotice>
      <div className="grid gap-6 xl:grid-cols-5">
        <Panel title="Attach Documents" className="xl:col-span-2">
          <div className="space-y-4 p-5">
            <div className="space-y-1.5">
              <div className="text-sm font-medium">Application</div>
              <AppPicker value={appId} onChange={(v) => nav({ search: { app: v } })} />
            </div>
            <button
              type="button"
              onClick={() => input.current?.click()}
              onDragEnter={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={(event) => {
                const nextTarget = event.relatedTarget;
                if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget))
                  setDragging(false);
              }}
              onDrop={dropFiles}
              aria-label="Choose or drop PDF, PNG, or JPG documents"
              className={`flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-10 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${dragging ? "border-primary bg-accent" : "border-input bg-muted/50"}`}
            >
              <Upload className="h-7 w-7 text-primary" />
              <span className="font-medium text-foreground">
                {dragging ? "Drop files to add them" : "Drop files here or browse"}
              </span>
              <span>PDF, PNG or JPG · up to 10 MB each · multiple allowed</span>
            </button>
            <input
              ref={input}
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(e) => pick(e.target.files)}
            />
            {staged.length > 0 && (
              <ul className="space-y-2">
                {staged.map((s, i) => (
                  <li
                    key={`${s.file.name}-${s.file.size}-${i}`}
                    className="flex flex-wrap items-center gap-2 rounded-md border p-2.5 sm:flex-nowrap"
                  >
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{s.file.name}</div>
                      <div className="text-xs text-muted-foreground">{fmtSize(s.file.size)}</div>
                    </div>
                    <Select
                      value={s.docType}
                      onValueChange={(v) =>
                        setStaged((st) => st.map((x, j) => (j === i ? { ...x, docType: v } : x)))
                      }
                    >
                      <SelectTrigger
                        className="h-8 w-full text-xs sm:w-40"
                        aria-label={`Document type for ${s.file.name}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DOC_TYPES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <button
                      type="button"
                      onClick={() => setStaged((st) => st.filter((_, j) => j !== i))}
                      aria-label={`Remove ${s.file.name}`}
                      className="rounded p-1 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <Button className="w-full" disabled={!staged.length || !appId} onClick={attach}>
              Attach {staged.length || ""} Document{staged.length === 1 ? "" : "s"}
            </Button>
          </div>
        </Panel>
        <Panel title={appId ? `Documents for ${appId}` : "All Documents"} className="xl:col-span-3">
          {list.length === 0 ? (
            <EmptyState text="No documents attached yet." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">File</TableHead>
                  <TableHead>Application</TableHead>
                  <TableHead>Document Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="pl-5">
                      <div className="font-medium">{d.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {fmtSize(d.size)} · {fmtDateTime(d.uploaded)}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{d.appId}</TableCell>
                    <TableCell>
                      <Select value={d.docType} onValueChange={(v) => setDocType(d.id, v)}>
                        <SelectTrigger
                          className="h-8 w-44 text-xs"
                          aria-label={`Document type for ${d.name}`}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {DOC_TYPES.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <StatusBadge value={d.status} />
                    </TableCell>
                    <TableCell className="pr-4">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeDoc(d.id)}
                        aria-label="Remove document"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Panel>
      </div>
    </>
  );
}
