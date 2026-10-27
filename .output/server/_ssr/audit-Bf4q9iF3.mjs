import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as fmtDateTime, c as useStore } from "./store-sypQrs4G.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Search } from "../_libs/lucide-react.mjs";
import { i as Panel, n as EmptyState, r as PageHeader } from "./shared-BGGDkcGC.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-ClxrR_VU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-Bf4q9iF3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Audit() {
	const { audit } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const rows = audit.filter((l) => `${l.user} ${l.action} ${l.appId} ${l.description}`.toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Audit Logs",
		subtitle: `${audit.length} sample and browser events · synthetic demo data`
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				className: "pl-9",
				placeholder: "Search logs…",
				value: q,
				onChange: (e) => setQ(e.target.value)
			})]
		})
	}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "No log entries." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
			className: "pl-5",
			children: "Timestamp"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Action" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Application" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
			className: "pr-5",
			children: "Event"
		})
	] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "whitespace-nowrap pl-5 font-mono text-xs text-muted-foreground",
			children: fmtDateTime(l.at)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "whitespace-nowrap",
			children: l.user
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "whitespace-nowrap font-medium",
			children: l.action
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "font-mono text-xs",
			children: l.appId === "—" ? "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/applications/$id",
				params: { id: l.appId },
				className: "text-primary hover:underline",
				children: l.appId
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			className: "pr-5 text-sm text-muted-foreground",
			children: l.description
		})
	] }, l.id)) })] })] })] });
}
//#endregion
export { Audit as component };
