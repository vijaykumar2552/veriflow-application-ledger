import { describe, expect, it } from "vitest";
import { searchRecords } from "@/lib/search";
import type { Application, DocItem } from "@/lib/store";

const applications: Application[] = [
  {
    id: "APP-2026-1",
    applicant: "Rajesh Kumar Traders",
    type: "Import-Export Code",
    reference: "IEC/MUM/55210",
    description: "Spice export registration",
    submitted: "2026-10-01T10:00:00.000Z",
    status: "Needs Review",
    reviewStatus: "Pending",
    comments: [],
  },
];

const documents: DocItem[] = [
  {
    id: "DOC-1",
    appId: "APP-2026-1",
    name: "gst_certificate.pdf",
    size: 298000,
    docType: "Registration Certificate",
    status: "Needs Review",
    uploaded: "2026-10-01T10:00:00.000Z",
  },
];

describe("searchRecords", () => {
  it("finds applications and attached documents by their content", () => {
    const results = searchRecords(applications, documents, "gst_certificate");

    expect(results.map((result) => result.kind)).toContain("document");
    expect(results.find((result) => result.kind === "document")?.appId).toBe("APP-2026-1");
  });

  it("returns deterministic simulated findings without including passing checks", () => {
    const results = searchRecords(applications, documents, "Kumaar");

    expect(results).toContainEqual(
      expect.objectContaining({ kind: "finding", appId: "APP-2026-1" }),
    );
    expect(searchRecords(applications, documents, "mandatory fields")).toEqual([]);
  });

  it("finds illustrative compliance rules and has no empty-query result flood", () => {
    expect(searchRecords(applications, documents, "environmental noc")).toContainEqual(
      expect.objectContaining({ kind: "rule", ruleId: "R-008" }),
    );
    expect(searchRecords(applications, documents, "")).toEqual([]);
  });
});
