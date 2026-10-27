import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { EmptyState, PageHeader, Panel, StatusBadge } from "@/components/shared";
import { NewApplicationDialog } from "@/components/NewApplicationDialog";
import { APP_TYPES, fmtDate, useStore } from "@/lib/store";

export const Route = createFileRoute("/applications/")({
  head: () => ({
    meta: [
      { title: "Applications — VeriFlow AI" },
      { name: "description", content: "Search, filter and create applications for validation." },
      { property: "og:title", content: "Applications — VeriFlow AI" },
      { property: "og:description", content: "Searchable application register." },
    ],
  }),
  component: Applications,
});

const STATUSES = [
  "Submitted",
  "Under Validation",
  "Verified",
  "Needs Review",
  "Flagged",
  "Rejected",
];

function Applications() {
  const { apps, docs } = useStore();
  const [q, setQ] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("submitted-desc");
  const rows = apps
    .filter(
      (a) =>
        (type === "all" || a.type === type) &&
        (status === "all" || a.status === status) &&
        `${a.id} ${a.applicant} ${a.reference} ${a.type} ${a.description} ${docs
          .filter((document) => document.appId === a.id)
          .map((document) => document.name)
          .join(" ")}`
          .toLowerCase()
          .includes(q.trim().toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "applicant") return a.applicant.localeCompare(b.applicant);
      if (sort === "status") return a.status.localeCompare(b.status);
      const byDate = a.submitted.localeCompare(b.submitted);
      return sort === "submitted-asc" ? byDate : -byDate;
    });

  return (
    <>
      <PageHeader
        title="Applications"
        subtitle={`${apps.length} applications in the register`}
        actions={
          <NewApplicationDialog
            trigger={
              <Button>
                <Plus className="h-4 w-4" /> New Application
              </Button>
            }
          />
        }
      />
      <Panel>
        <div className="flex flex-wrap gap-3 border-b p-4">
          <div className="relative min-w-60 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              aria-label="Search applications"
              className="pl-9"
              placeholder="Search ID, applicant, reference or document…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full sm:w-52" aria-label="Filter by application type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {APP_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-44" aria-label="Filter by application status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-48" aria-label="Sort applications">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="submitted-desc">Newest first</SelectItem>
              <SelectItem value="submitted-asc">Oldest first</SelectItem>
              <SelectItem value="applicant">Applicant A–Z</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {rows.length === 0 ? (
          <EmptyState text="No applications match your filters." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Application ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-5 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="pl-5 font-mono text-xs">{a.id}</TableCell>
                  <TableCell className="font-medium">{a.applicant}</TableCell>
                  <TableCell className="text-muted-foreground">{a.type}</TableCell>
                  <TableCell className="tabular-nums text-muted-foreground">
                    {docs.filter((document) => document.appId === a.id).length}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {a.reference}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{fmtDate(a.submitted)}</TableCell>
                  <TableCell>
                    <StatusBadge value={a.status} />
                  </TableCell>
                  <TableCell className="pr-5 text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link to="/applications/$id" params={{ id: a.id }}>
                        Open
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Panel>
    </>
  );
}
