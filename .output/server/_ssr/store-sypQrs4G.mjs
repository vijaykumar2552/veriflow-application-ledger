import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-sypQrs4G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var APP_TYPES = [
	"Trade License",
	"Building Permit",
	"Import-Export Code",
	"Pollution Clearance",
	"Food Safety License",
	"MSME Registration"
];
var DOC_TYPES = [
	"Identity Proof",
	"Address Proof",
	"Registration Certificate",
	"Financial Statement",
	"NOC",
	"Site Plan",
	"Other"
];
var d = (daysAgo, h = 10) => {
	const t = /* @__PURE__ */ new Date("2026-10-27T00:00:00Z");
	t.setUTCDate(t.getUTCDate() - daysAgo);
	t.setUTCHours(h, daysAgo * 7 % 60);
	return t.toISOString();
};
var seedApps = [
	[
		"APP-2026-1048",
		"Ananya Sharma",
		"Trade License",
		"TL/DEL/88412",
		"New retail trade license for stationery store in Karol Bagh.",
		0,
		"Under Validation"
	],
	[
		"APP-2026-1047",
		"Rajesh Kumar Traders",
		"Import-Export Code",
		"IEC/MUM/55210",
		"IEC application for spice exports.",
		1,
		"Needs Review"
	],
	[
		"APP-2026-1046",
		"Priya Nair",
		"Food Safety License",
		"FSL/KOC/30981",
		"Home bakery food safety registration.",
		1,
		"Verified"
	],
	[
		"APP-2026-1045",
		"GreenLeaf Industries Pvt Ltd",
		"Pollution Clearance",
		"PC/PUN/12007",
		"Consent to operate for packaging unit.",
		2,
		"Flagged"
	],
	[
		"APP-2026-1044",
		"Mohammed Irfan",
		"Building Permit",
		"BP/HYD/77341",
		"G+2 residential construction permit.",
		3,
		"Verified"
	],
	[
		"APP-2026-1043",
		"Sunrise Textiles",
		"MSME Registration",
		"MSME/SUR/40112",
		"Udyam registration for textile unit.",
		4,
		"Verified"
	],
	[
		"APP-2026-1042",
		"Kavita Deshmukh",
		"Trade License",
		"TL/NAG/21987",
		"Renewal of beauty salon license.",
		5,
		"Needs Review"
	],
	[
		"APP-2026-1041",
		"Arjun Mehta",
		"Building Permit",
		"BP/AHM/66502",
		"Commercial office extension.",
		6,
		"Rejected"
	],
	[
		"APP-2026-1040",
		"Lakshmi Foods",
		"Food Safety License",
		"FSL/CHE/18874",
		"State license for packaged snacks.",
		7,
		"Verified"
	],
	[
		"APP-2026-1039",
		"Vikram Singh Logistics",
		"Import-Export Code",
		"IEC/JAI/90233",
		"IEC modification - address change.",
		8,
		"Flagged"
	]
].map(([id, applicant, type, reference, description, ago, status]) => ({
	id,
	applicant,
	type,
	reference,
	description,
	submitted: d(ago),
	status,
	reviewStatus: status === "Needs Review" || status === "Flagged" ? "Pending" : void 0,
	comments: []
}));
var seedDocs = [
	[
		"APP-2026-1048",
		"aadhaar_ananya.pdf",
		412e3,
		"Identity Proof",
		"Checks Passed"
	],
	[
		"APP-2026-1048",
		"shop_rent_agreement.pdf",
		124e4,
		"Address Proof",
		"Pending"
	],
	[
		"APP-2026-1047",
		"gst_certificate.pdf",
		298e3,
		"Registration Certificate",
		"Needs Review"
	],
	[
		"APP-2026-1045",
		"site_plan_unit3.png",
		231e4,
		"Site Plan",
		"Flagged"
	],
	[
		"APP-2026-1046",
		"pan_priya.jpg",
		184e3,
		"Identity Proof",
		"Checks Passed"
	],
	[
		"APP-2026-1039",
		"bank_statement_q2.pdf",
		87e4,
		"Financial Statement",
		"Flagged"
	]
].map(([appId, name, size, docType, status], i) => ({
	id: `DOC-${5e3 + i}`,
	appId,
	name,
	size,
	docType,
	status,
	uploaded: d(i % 3, 9 + i)
}));
var seedAudit = [
	[
		"Officer R. Iyer",
		"Status Changed",
		"APP-2026-1046",
		"Application marked Verified after simulated checks."
	],
	[
		"System (demo)",
		"Validation Run",
		"APP-2026-1045",
		"Simulated validation flagged 2 high-severity findings."
	],
	[
		"Officer S. Rao",
		"Comment Added",
		"APP-2026-1047",
		"Requested clarification on GST certificate date."
	],
	[
		"Applicant",
		"Application Submitted",
		"APP-2026-1048",
		"New Trade License application submitted."
	]
].map(([user, action, appId, description], i) => ({
	id: `LOG-${9e3 - i}`,
	at: d(i, 15 - i),
	user,
	action,
	appId,
	description
}));
function simulatedChecks(app) {
	const base = [
		{
			name: "Mandatory fields completeness",
			result: "Pass",
			severity: "Low",
			finding: "All required form fields are filled.",
			evidence: "Form data contains applicant, type, reference and description.",
			action: "No action required.",
			ruleId: "R-001"
		},
		{
			name: "Reference number format",
			result: /^[A-Z]+\/[A-Z]{3}\/\d{5}$/.test(app.reference) ? "Pass" : "Warning",
			severity: "Medium",
			finding: /^[A-Z]+\/[A-Z]{3}\/\d{5}$/.test(app.reference) ? "Reference follows expected pattern." : "Reference does not match pattern XX/CITY/00000.",
			evidence: `Reference entered: ${app.reference}`,
			action: "Confirm reference number with applicant.",
			ruleId: "R-002"
		},
		{
			name: "Document set completeness",
			result: "Pass",
			severity: "Medium",
			finding: "Identity and address proofs are listed.",
			evidence: "Based on demo document list for this application.",
			action: "No action required.",
			ruleId: "R-004"
		},
		{
			name: "Name consistency across documents",
			result: "Pass",
			severity: "High",
			finding: "Applicant name consistent in demo records.",
			evidence: "Simulated comparison of recorded metadata.",
			action: "No action required.",
			ruleId: "R-006"
		},
		{
			name: "Document date validity",
			result: "Pass",
			severity: "High",
			finding: "No expired documents detected in demo data.",
			evidence: "Simulated date check.",
			action: "No action required.",
			ruleId: "R-007"
		}
	];
	if (app.status === "Needs Review") base[3] = {
		...base[3],
		result: "Warning",
		finding: "Minor name spelling variation between documents.",
		evidence: "Simulated: 'Kumar' vs 'Kumaar' in two records.",
		action: "Route to manual review for officer confirmation."
	};
	if (app.status === "Flagged" || app.status === "Rejected") {
		base[4] = {
			...base[4],
			result: "Fail",
			finding: "One supporting document appears to be past its validity date.",
			evidence: "Simulated: certificate validity ended 31-03-2026.",
			action: "Request updated document from applicant."
		};
		base[2] = {
			...base[2],
			result: "Fail",
			severity: "High",
			finding: "Required NOC not found in submitted set.",
			evidence: "Simulated document list lacks an NOC entry.",
			action: "Request NOC before proceeding."
		};
	}
	return base;
}
var seed = () => ({
	apps: seedApps,
	docs: seedDocs,
	audit: seedAudit,
	officer: "Officer V. Kumar"
});
var KEY = "veriflow-demo-v1";
var StoreCtx = (0, import_react.createContext)(null);
function StoreProvider({ children }) {
	const [state, setState] = (0, import_react.useState)(seed);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) setState(JSON.parse(raw));
		} catch {}
		setLoaded(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (loaded) localStorage.setItem(KEY, JSON.stringify(state));
	}, [state, loaded]);
	const mkLog = (s, action, appId, description) => ({
		id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1e3)}`,
		at: (/* @__PURE__ */ new Date()).toISOString(),
		user: s.officer,
		action,
		appId,
		description
	});
	const log = (0, import_react.useCallback)((action, appId, description) => {
		setState((s) => ({
			...s,
			audit: [mkLog(s, action, appId, description), ...s.audit]
		}));
	}, []);
	const addApp = (a) => {
		const nums = state.apps.map((x) => Number(x.id.split("-")[2]) || 0);
		const app = {
			...a,
			id: `APP-2026-${Math.max(1e3, ...nums) + 1}`,
			submitted: (/* @__PURE__ */ new Date()).toISOString(),
			status: "Submitted",
			comments: []
		};
		setState((s) => ({
			...s,
			apps: [app, ...s.apps],
			audit: [mkLog(s, "Application Created", app.id, `${a.type} application created for ${a.applicant}.`), ...s.audit]
		}));
		return app;
	};
	const addDocs = (appId, files) => setState((s) => {
		const docs = files.map((f, i) => ({
			id: `DOC-${Date.now()}-${i}`,
			appId,
			name: f.name,
			size: f.size,
			docType: f.docType,
			status: "Pending",
			uploaded: (/* @__PURE__ */ new Date()).toISOString()
		}));
		return {
			...s,
			docs: [...docs, ...s.docs],
			audit: [mkLog(s, "Documents Attached", appId, `${files.length} document(s) attached: ${files.map((f) => f.name).join(", ")}.`), ...s.audit]
		};
	});
	const value = {
		...state,
		addApp,
		addDocs,
		setDocType: (id, docType) => setState((s) => ({
			...s,
			docs: s.docs.map((x) => x.id === id ? {
				...x,
				docType
			} : x)
		})),
		removeDoc: (id) => setState((s) => {
			const doc = s.docs.find((x) => x.id === id);
			return {
				...s,
				docs: s.docs.filter((x) => x.id !== id),
				audit: doc ? [mkLog(s, "Document Removed", doc.appId, `Removed ${doc.name}.`), ...s.audit] : s.audit
			};
		}),
		updateReview: (appId, status, comment) => setState((s) => {
			const appStatus = {
				Approved: "Verified",
				Rejected: "Rejected"
			};
			return {
				...s,
				apps: s.apps.map((a) => a.id === appId ? {
					...a,
					reviewStatus: status,
					status: appStatus[status] ?? a.status,
					comments: comment ? [...a.comments, {
						at: (/* @__PURE__ */ new Date()).toISOString(),
						by: s.officer,
						text: comment
					}] : a.comments
				} : a),
				audit: [mkLog(s, "Review Updated", appId, `Review status set to ${status}${comment ? ` — "${comment}"` : ""}.`), ...s.audit]
			};
		}),
		log,
		setOfficer: (officer) => setState((s) => ({
			...s,
			officer
		})),
		reset: () => {
			localStorage.removeItem(KEY);
			setState(seed());
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreCtx.Provider, {
		value,
		children
	});
}
function useStore() {
	const c = (0, import_react.useContext)(StoreCtx);
	if (!c) throw new Error("useStore outside provider");
	return c;
}
var fmtDate = (iso) => new Date(iso).toLocaleDateString("en-IN", {
	day: "2-digit",
	month: "short",
	year: "numeric"
});
var fmtDateTime = (iso) => new Date(iso).toLocaleString("en-IN", {
	day: "2-digit",
	month: "short",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit"
});
var fmtSize = (b) => b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`;
//#endregion
export { fmtDateTime as a, useStore as c, fmtDate as i, DOC_TYPES as n, fmtSize as o, StoreProvider as r, simulatedChecks as s, APP_TYPES as t };
