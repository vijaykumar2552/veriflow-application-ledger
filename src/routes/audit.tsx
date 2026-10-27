import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState, PageHeader, Panel } from "@/components/shared";
import { fmtDateTime, useStore } from "@/lib/store";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit Logs — VeriFlow AI" },
      { name: "description", content: "Chronological log of actions taken in the prototype." },
      { property: "og:title", content: "Audit Logs — VeriFlow AI" },
      { property: "og:description", content: "Audit trail of demo actions." },
    ],
  }),
  component: Audit,
});

function Audit() {
  const { audit } = useStore();
  const [q, setQ] = useState("");
  const rows = audit.filter((l) =>
    `${l.user} ${l.action} ${l.appId} ${l.description}`.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        title="Audit Logs"
        subtitle={`${audit.length} sample and browser events · synthetic demo data`}
      />
      <Panel>
        <div className="border-b p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search logs…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
        {rows.length === 0 ? (
          <EmptyState text="No log entries." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Application</TableHead>
                <TableHead className="pr-5">Event</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="whitespace-nowrap pl-5 font-mono text-xs text-muted-foreground">
                    {fmtDateTime(l.at)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{l.user}</TableCell>
                  <TableCell className="whitespace-nowrap font-medium">{l.action}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {l.appId === "—" ? (
                      "—"
                    ) : (
                      <Link
                        to="/applications/$id"
                        params={{ id: l.appId }}
                        className="text-primary hover:underline"
                      >
                        {l.appId}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell className="pr-5 text-sm text-muted-foreground">
                    {l.description}
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
