import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { S as Inbox, x as Info } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shared-BGGDkcGC.js
var import_jsx_runtime = require_jsx_runtime();
var tone = {
	success: "bg-success/12 text-success border-success/25",
	warning: "bg-warning/15 text-warning-foreground border-warning/40",
	danger: "bg-destructive/10 text-destructive border-destructive/25",
	info: "bg-accent text-accent-foreground border-primary/20",
	muted: "bg-muted text-muted-foreground border-border"
};
var map = {
	Verified: "success",
	"Checks Passed": "success",
	Pass: "success",
	Approved: "success",
	Low: "muted",
	"Needs Review": "warning",
	Warning: "warning",
	Medium: "warning",
	"In Review": "info",
	"Info Requested": "warning",
	Flagged: "danger",
	Rejected: "danger",
	Fail: "danger",
	High: "danger",
	Critical: "danger",
	Submitted: "info",
	"Under Validation": "info",
	Pending: "muted"
};
function StatusBadge({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium", tone[map[value] ?? "muted"]),
		children: value
	});
}
function PageHeader({ title, subtitle, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-7 flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-[25px] font-semibold tracking-[-0.035em] text-foreground sm:text-[27px]",
			children: title
		}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-[13px] leading-5 text-muted-foreground",
			children: subtitle
		})] }), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: actions
		})]
	});
}
function Panel({ title, actions, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("min-w-0 rounded-xl border bg-card shadow-[0_1px_2px_rgb(22_35_58_/_3%),0_8px_24px_rgb(22_35_58_/_2%)] transition-shadow duration-200", className),
		children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-[52px] items-center justify-between border-b px-5 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[13px] font-semibold tracking-[-0.01em] text-foreground",
				children: title
			}), actions]
		}), children]
	});
}
function EmptyState({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-2 py-12 text-center text-sm text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "h-8 w-8 opacity-50" }), text]
	});
}
function DemoNotice({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 flex items-start gap-2 rounded-md border border-primary/20 bg-accent px-4 py-2.5 text-sm text-accent-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
}
//#endregion
export { StatusBadge as a, Panel as i, EmptyState as n, PageHeader as r, DemoNotice as t };
