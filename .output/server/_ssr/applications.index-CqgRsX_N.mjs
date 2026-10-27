import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as useStore, i as fmtDate, t as APP_TYPES } from "./store-sypQrs4G.mjs";
import { t as Button } from "./button-Dh8XWZW7.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Search, h as Plus } from "../_libs/lucide-react.mjs";
import { a as StatusBadge, i as Panel, n as EmptyState, r as PageHeader } from "./shared-BGGDkcGC.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-ClxrR_VU.mjs";
import { t as NewApplicationDialog } from "./NewApplicationDialog-BpfNK7ja.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/applications.index-CqgRsX_N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"Submitted",
	"Under Validation",
	"Verified",
	"Needs Review",
	"Flagged",
	"Rejected"
];
function Applications() {
	const { apps, docs } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("submitted-desc");
	const rows = apps.filter((a) => (type === "all" || a.type === type) && (status === "all" || a.status === status) && `${a.id} ${a.applicant} ${a.reference} ${a.type} ${a.description} ${docs.filter((document) => document.appId === a.id).map((document) => document.name).join(" ")}`.toLowerCase().includes(q.trim().toLowerCase())).sort((a, b) => {
		if (sort === "applicant") return a.applicant.localeCompare(b.applicant);
		if (sort === "status") return a.status.localeCompare(b.status);
		const byDate = a.submitted.localeCompare(b.submitted);
		return sort === "submitted-asc" ? byDate : -byDate;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Applications",
		subtitle: `${apps.length} applications in the register`,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewApplicationDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New Application"] }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-3 border-b p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-60 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					"aria-label": "Search applications",
					className: "pl-9",
					placeholder: "Search ID, applicant, reference or document…",
					value: q,
					onChange: (e) => setQ(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: type,
				onValueChange: setType,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "w-full sm:w-52",
					"aria-label": "Filter by application type",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: "all",
					children: "All types"
				}), APP_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: t,
					children: t
				}, t))] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: status,
				onValueChange: setStatus,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "w-full sm:w-44",
					"aria-label": "Filter by application status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: "all",
					children: "All statuses"
				}), STATUSES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: t,
					children: t
				}, t))] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: sort,
				onValueChange: setSort,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "w-full sm:w-48",
					"aria-label": "Sort applications",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "submitted-desc",
						children: "Newest first"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "submitted-asc",
						children: "Oldest first"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "applicant",
						children: "Applicant A–Z"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "status",
						children: "Status"
					})
				] })]
			})
		]
	}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "No applications match your filters." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
			className: "pl-5",
			children: "Application ID"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Applicant" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Documents" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Reference" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Submitted" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
			className: "pr-5 text-right",
			children: "Action"
		})
	] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "pl-5 font-mono text-xs",
			children: a.id
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "font-medium",
			children: a.applicant
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-muted-foreground",
			children: a.type
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "tabular-nums text-muted-foreground",
			children: docs.filter((document) => document.appId === a.id).length
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "font-mono text-xs text-muted-foreground",
			children: a.reference
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "text-muted-foreground",
			children: fmtDate(a.submitted)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: a.status }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "pr-5 text-right",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/applications/$id",
					params: { id: a.id },
					children: "Open"
				})
			})
		})
	] }, a.id)) })] })] })] });
}
//#endregion
export { Applications as component };
