import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemoNotice, PageHeader, Panel, StatusBadge } from "@/components/shared";
import { RULES } from "@/lib/rules";

export const Route = createFileRoute("/rules")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Regulatory Rules — VeriFlow AI" },
      { name: "description", content: "Illustrative demo validation rules used by the prototype." },
      { property: "og:title", content: "Regulatory Rules — VeriFlow AI" },
      { property: "og:description", content: "Illustrative demo rule library." },
    ],
  }),
  component: Rules,
});

function Rules() {
  const { q } = Route.useSearch();
  const [query, setQuery] = useState(q);
  const [cat, setCat] = useState("All");
  useEffect(() => setQuery(q), [q]);
  const cats = ["All", ...new Set(RULES.map((rule) => rule.category))];
  const term = query.trim().toLowerCase();
  const rows = RULES.filter(
    (rule) =>
      (cat === "All" || rule.category === cat) &&
      `${rule.id} ${rule.title} ${rule.category} ${rule.description} ${rule.severity}`
        .toLowerCase()
        .includes(term),
  );
  return (
    <>
      <PageHeader title="Regulatory Rules" subtitle={`${rows.length} matching demo rules`} />
      <DemoNotice>
        These are illustrative demo rules created for this prototype. They are not official legal or
        regulatory requirements.
      </DemoNotice>
      <Tabs value={cat} onValueChange={setCat} className="mb-4 max-w-full">
        <TabsList className="w-full max-w-full justify-start overflow-x-auto">
          {cats.map((c) => (
            <TabsTrigger key={c} value={c} className="shrink-0">
              {c}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Panel>
        <div className="relative border-b p-4">
          <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search illustrative rules"
            className="pl-9"
            placeholder="Search by rule ID, title or category…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        {rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No demo rules match this search.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Rule ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="pr-5">Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="pl-5 font-mono text-xs">{rule.id}</TableCell>
                  <TableCell className="font-medium">{rule.title}</TableCell>
                  <TableCell className="text-muted-foreground">{rule.category}</TableCell>
                  <TableCell className="max-w-md text-sm text-muted-foreground">
                    {rule.description}
                  </TableCell>
                  <TableCell className="pr-5">
                    <StatusBadge value={rule.severity} />
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
