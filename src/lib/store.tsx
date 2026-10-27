import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type AppStatus = "Submitted" | "Under Validation" | "Verified" | "Needs Review" | "Flagged" | "Rejected";
export type Severity = "Low" | "Medium" | "High" | "Critical";
export type ReviewStatus = "Pending" | "In Review" | "Approved" | "Rejected" | "Info Requested";

export interface Application {
  id: string;
  applicant: string;
  type: string;
  reference: string;
  description: string;
  submitted: string;
  status: AppStatus;
  reviewStatus?: ReviewStatus | undefined;
  comments: { at: string; by: string; text: string }[];
}
export interface DocItem {
  id: string;
  appId: string;
  name: string;
  size: number;
  docType: string;
  status: "Pending" | "Checks Passed" | "Needs Review" | "Flagged";
  uploaded: string;
}
export interface AuditEntry {
  id: string;
  at: string;
  user: string;
  action: string;
  appId: string;
  description: string;
}

export const APP_TYPES = [
  "Trade License",
  "Building Permit",
  "Import-Export Code",
  "Pollution Clearance",
  "Food Safety License",
  "MSME Registration",
];
export const DOC_TYPES = ["Identity Proof", "Address Proof", "Registration Certificate", "Financial Statement", "NOC", "Site Plan", "Other"];

const d = (daysAgo: number, h = 10) => {
  const t = new Date("2026-10-27T00:00:00Z");
  t.setUTCDate(t.getUTCDate() - daysAgo);
  t.setUTCHours(h, (daysAgo * 7) % 60);
  return t.toISOString();
};

const seedApps: Application[] = [
  ["APP-2026-1048", "Ananya Sharma", "Trade License", "TL/DEL/88412", "New retail trade license for stationery store in Karol Bagh.", 0, "Under Validation"],
  ["APP-2026-1047", "Rajesh Kumar Traders", "Import-Export Code", "IEC/MUM/55210", "IEC application for spice exports.", 1, "Needs Review"],
  ["APP-2026-1046", "Priya Nair", "Food Safety License", "FSL/KOC/30981", "Home bakery food safety registration.", 1, "Verified"],
  ["APP-2026-1045", "GreenLeaf Industries Pvt Ltd", "Pollution Clearance", "PC/PUN/12007", "Consent to operate for packaging unit.", 2, "Flagged"],
  ["APP-2026-1044", "Mohammed Irfan", "Building Permit", "BP/HYD/77341", "G+2 residential construction permit.", 3, "Verified"],
  ["APP-2026-1043", "Sunrise Textiles", "MSME Registration", "MSME/SUR/40112", "Udyam registration for textile unit.", 4, "Verified"],
  ["APP-2026-1042", "Kavita Deshmukh", "Trade License", "TL/NAG/21987", "Renewal of beauty salon license.", 5, "Needs Review"],
  ["APP-2026-1041", "Arjun Mehta", "Building Permit", "BP/AHM/66502", "Commercial office extension.", 6, "Rejected"],
  ["APP-2026-1040", "Lakshmi Foods", "Food Safety License", "FSL/CHE/18874", "State license for packaged snacks.", 7, "Verified"],
  ["APP-2026-1039", "Vikram Singh Logistics", "Import-Export Code", "IEC/JAI/90233", "IEC modification - address change.", 8, "Flagged"],
].map(([id, applicant, type, reference, description, ago, status]) => ({
  id: id as string,
  applicant: applicant as string,
  type: type as string,
  reference: reference as string,
  description: description as string,
  submitted: d(ago as number),
  status: status as AppStatus,
  reviewStatus: status === "Needs Review" || status === "Flagged" ? ("Pending" as ReviewStatus) : undefined,
  comments: [],
}));

const seedDocs: DocItem[] = [
  ["APP-2026-1048", "aadhaar_ananya.pdf", 412000, "Identity Proof", "Checks Passed"],
  ["APP-2026-1048", "shop_rent_agreement.pdf", 1240000, "Address Proof", "Pending"],
  ["APP-2026-1047", "gst_certificate.pdf", 298000, "Registration Certificate", "Needs Review"],
  ["APP-2026-1045", "site_plan_unit3.png", 2310000, "Site Plan", "Flagged"],
  ["APP-2026-1046", "pan_priya.jpg", 184000, "Identity Proof", "Checks Passed"],
  ["APP-2026-1039", "bank_statement_q2.pdf", 870000, "Financial Statement", "Flagged"],
].map(([appId, name, size, docType, status], i) => ({
  id: `DOC-${5000 + i}`,
  appId: appId as string,
  name: name as string,
  size: size as number,
  docType: docType as string,
  status: status as DocItem["status"],
  uploaded: d(i % 3, 9 + i),
}));

const seedAudit: AuditEntry[] = [
  ["Officer R. Iyer", "Status Changed", "APP-2026-1046", "Application marked Verified after simulated checks."],
  ["System (demo)", "Validation Run", "APP-2026-1045", "Simulated validation flagged 2 high-severity findings."],
  ["Officer S. Rao", "Comment Added", "APP-2026-1047", "Requested clarification on GST certificate date."],
  ["Applicant", "Application Submitted", "APP-2026-1048", "New Trade License application submitted."],
].map(([user, action, appId, description], i) => ({
  id: `LOG-${9000 - i}`,
  at: d(i, 15 - i),
  user: user as string,
  action: action as string,
  appId: appId as string,
  description: description as string,
}));

/* ---------- Simulated validation (deterministic, clearly labelled demo) ---------- */
export interface Check {
  name: string;
  result: "Pass" | "Warning" | "Fail";
  severity: Severity;
  finding: string;
  evidence: string;
  action: string;
  ruleId: string;
}
export function simulatedChecks(app: Application): Check[] {
  const base: Check[] = [
    { name: "Mandatory fields completeness", result: "Pass", severity: "Low", finding: "All required form fields are filled.", evidence: "Form data contains applicant, type, reference and description.", action: "No action required.", ruleId: "R-001" },
    { name: "Reference number format", result: /^[A-Z]+\/[A-Z]{3}\/\d{5}$/.test(app.reference) ? "Pass" : "Warning", severity: "Medium", finding: /^[A-Z]+\/[A-Z]{3}\/\d{5}$/.test(app.reference) ? "Reference follows expected pattern." : "Reference does not match pattern XX/CITY/00000.", evidence: `Reference entered: ${app.reference}`, action: "Confirm reference number with applicant.", ruleId: "R-002" },
    { name: "Document set completeness", result: "Pass", severity: "Medium", finding: "Identity and address proofs are listed.", evidence: "Based on demo document list for this application.", action: "No action required.", ruleId: "R-004" },
    { name: "Name consistency across documents", result: "Pass", severity: "High", finding: "Applicant name consistent in demo records.", evidence: "Simulated comparison of recorded metadata.", action: "No action required.", ruleId: "R-006" },
    { name: "Document date validity", result: "Pass", severity: "High", finding: "No expired documents detected in demo data.", evidence: "Simulated date check.", action: "No action required.", ruleId: "R-007" },
  ];
  if (app.status === "Needs Review") {
    base[3] = { ...base[3]!, result: "Warning", finding: "Minor name spelling variation between documents.", evidence: "Simulated: 'Kumar' vs 'Kumaar' in two records.", action: "Route to manual review for officer confirmation." };
  }
  if (app.status === "Flagged" || app.status === "Rejected") {
    base[4] = { ...base[4]!, result: "Fail", finding: "One supporting document appears to be past its validity date.", evidence: "Simulated: certificate validity ended 31-03-2026.", action: "Request updated document from applicant." };
    base[2] = { ...base[2]!, result: "Fail", severity: "High", finding: "Required NOC not found in submitted set.", evidence: "Simulated document list lacks an NOC entry.", action: "Request NOC before proceeding." };
  }
  return base;
}

/* ---------- Store ---------- */
interface State {
  apps: Application[];
  docs: DocItem[];
  audit: AuditEntry[];
  officer: string;
}
const seed = (): State => ({ apps: seedApps, docs: seedDocs, audit: seedAudit, officer: "Officer V. Kumar" });
const KEY = "veriflow-demo-v1";

interface Ctx extends State {
  addApp: (a: Omit<Application, "id" | "submitted" | "status" | "comments">) => Application;
  addDocs: (appId: string, files: { name: string; size: number; docType: string }[]) => void;
  setDocType: (id: string, docType: string) => void;
  removeDoc: (id: string) => void;
  updateReview: (appId: string, status: ReviewStatus, comment: string) => void;
  log: (action: string, appId: string, description: string) => void;
  setOfficer: (n: string) => void;
  reset: () => void;
}
const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(seed);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, loaded]);

  const mkLog = (s: State, action: string, appId: string, description: string): AuditEntry => ({
    id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    at: new Date().toISOString(),
    user: s.officer,
    action,
    appId,
    description,
  });

  const log = useCallback((action: string, appId: string, description: string) => {
    setState((s) => ({ ...s, audit: [mkLog(s, action, appId, description), ...s.audit] }));
  }, []);

  const addApp: Ctx["addApp"] = (a) => {
    const nums = state.apps.map((x) => Number(x.id.split("-")[2]) || 0);
    const app: Application = {
      ...a,
      id: `APP-2026-${Math.max(1000, ...nums) + 1}`,
      submitted: new Date().toISOString(),
      status: "Submitted",
      comments: [],
    };
    setState((s) => ({ ...s, apps: [app, ...s.apps], audit: [mkLog(s, "Application Created", app.id, `${a.type} application created for ${a.applicant}.`), ...s.audit] }));
    return app;
  };

  const addDocs: Ctx["addDocs"] = (appId, files) =>
    setState((s) => {
      const docs = files.map((f, i) => ({ id: `DOC-${Date.now()}-${i}`, appId, name: f.name, size: f.size, docType: f.docType, status: "Pending" as const, uploaded: new Date().toISOString() }));
      return { ...s, docs: [...docs, ...s.docs], audit: [mkLog(s, "Documents Attached", appId, `${files.length} document(s) attached: ${files.map((f) => f.name).join(", ")}.`), ...s.audit] };
    });

  const value: Ctx = {
    ...state,
    addApp,
    addDocs,
    setDocType: (id, docType) => setState((s) => ({ ...s, docs: s.docs.map((x) => (x.id === id ? { ...x, docType } : x)) })),
    removeDoc: (id) =>
      setState((s) => {
        const doc = s.docs.find((x) => x.id === id);
        return { ...s, docs: s.docs.filter((x) => x.id !== id), audit: doc ? [mkLog(s, "Document Removed", doc.appId, `Removed ${doc.name}.`), ...s.audit] : s.audit };
      }),
    updateReview: (appId, status, comment) =>
      setState((s) => {
        const appStatus: Partial<Record<ReviewStatus, AppStatus>> = { Approved: "Verified", Rejected: "Rejected" };
        return {
          ...s,
          apps: s.apps.map((a) =>
            a.id === appId
              ? { ...a, reviewStatus: status, status: appStatus[status] ?? a.status, comments: comment ? [...a.comments, { at: new Date().toISOString(), by: s.officer, text: comment }] : a.comments }
              : a,
          ),
          audit: [mkLog(s, "Review Updated", appId, `Review status set to ${status}${comment ? ` — "${comment}"` : ""}.`), ...s.audit],
        };
      }),
    log,
    setOfficer: (officer) => setState((s) => ({ ...s, officer })),
    reset: () => {
      localStorage.removeItem(KEY);
      setState(seed());
    },
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}

export const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
export const fmtDateTime = (iso: string) => new Date(iso).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
export const fmtSize = (b: number) => (b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`);
