import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { d as Search } from "../_libs/lucide-react.mjs";
import { a as StatusBadge, i as Panel, r as PageHeader, t as DemoNotice } from "./shared-BGGDkcGC.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-ClxrR_VU.mjs";
import { n as Route, t as RULES } from "./rules-CzrBDrYl.mjs";
import { i as TabsTrigger$1, n as TabsContent$1, r as TabsList$1, t as Tabs$1 } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rules-DgmH1aZX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Tabs$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList$1, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = TabsList$1.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger$1, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = TabsTrigger$1.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent$1, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = TabsContent$1.displayName;
function Rules() {
	const { q } = Route.useSearch();
	const [query, setQuery] = (0, import_react.useState)(q);
	const [cat, setCat] = (0, import_react.useState)("All");
	(0, import_react.useEffect)(() => setQuery(q), [q]);
	const cats = ["All", ...new Set(RULES.map((rule) => rule.category))];
	const term = query.trim().toLowerCase();
	const rows = RULES.filter((rule) => (cat === "All" || rule.category === cat) && `${rule.id} ${rule.title} ${rule.category} ${rule.description} ${rule.severity}`.toLowerCase().includes(term));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Regulatory Rules",
			subtitle: `${rows.length} matching demo rules`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "These are illustrative demo rules created for this prototype. They are not official legal or regulatory requirements." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
			value: cat,
			onValueChange: setCat,
			className: "mb-4 max-w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
				className: "w-full max-w-full justify-start overflow-x-auto",
				children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: c,
					className: "shrink-0",
					children: c
				}, c))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative border-b p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				"aria-label": "Search illustrative rules",
				className: "pl-9",
				placeholder: "Search by rule ID, title or category…",
				value: query,
				onChange: (event) => setQuery(event.target.value)
			})]
		}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-8 text-center text-sm text-muted-foreground",
			children: "No demo rules match this search."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "pl-5",
				children: "Rule ID"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Title" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Category" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Description" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "pr-5",
				children: "Severity"
			})
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "pl-5 font-mono text-xs",
				children: rule.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "font-medium",
				children: rule.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "text-muted-foreground",
				children: rule.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "max-w-md text-sm text-muted-foreground",
				children: rule.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				className: "pr-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: rule.severity })
			})
		] }, rule.id)) })] })] })
	] });
}
//#endregion
export { Rules as component };
