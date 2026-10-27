import { describe, expect, it } from "vitest";

import { simulatedChecks, type Application } from "@/lib/store";

const makeApplication = (
  status: Application["status"],
  reference = "TL/DEL/12345",
): Application => ({
  id: "APP-2026-1048",
  applicant: "Demo Applicant",
  type: "Trade License",
  reference,
  description: "A synthetic application used to test fixed demo results.",
  submitted: "2026-10-27T00:00:00.000Z",
  status,
  reviewStatus: status === "Needs Review" || status === "Flagged" ? "Pending" : undefined,
  comments: [],
});

describe("simulated demo checks", () => {
  it("returns identical results for the same application", () => {
    const application = makeApplication("Verified");

    expect(simulatedChecks(application)).toEqual(simulatedChecks(application));
  });

  it("keeps the fixed review warning scenario", () => {
    const checks = simulatedChecks(makeApplication("Needs Review"));

    expect(checks.find((check) => check.ruleId === "R-006")?.result).toBe("Warning");
  });

  it("keeps the fixed flagged scenario", () => {
    const checks = simulatedChecks(makeApplication("Flagged"));

    expect(checks.find((check) => check.ruleId === "R-004")?.result).toBe("Fail");
    expect(checks.find((check) => check.ruleId === "R-007")?.result).toBe("Fail");
  });
});
