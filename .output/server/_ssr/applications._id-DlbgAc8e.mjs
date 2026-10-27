import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as fmtDateTime, c as useStore, i as fmtDate, o as fmtSize, s as simulatedChecks } from "./store-sypQrs4G.mjs";
import { t as Button } from "./button-Dh8XWZW7.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./applications._id-BbQpFf3i.mjs";
import { C as FileText, D as FileChartColumnIncreasing, V as ArrowLeft, c as ShieldCheck, i as Upload } from "../_libs/lucide-react.mjs";
import { a as StatusBadge, i as Panel, n as EmptyState, r as PageHeader, t as DemoNotice } from "./shared-BGGDkcGC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/applications._id-DlbgAc8e.js
var import_jsx_runtime = require_jsx_runtime();
function Detail() {
	const { id } = Route.useParams();
	const { apps, docs, audit } = useStore();
	const app = apps.find((a) => a.id === id);
	if (!app) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: `Application ${id} not found.` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pb-8 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/applications",
				children: "Back to applications"
			})
		})
	})] });
	const myDocs = docs.filter((d) => d.appId === id);
	const checks = simulatedChecks(app);
	const logs = audit.filter((l) => l.appId === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/applications",
			className: "mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Applications"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: app.applicant,
			subtitle: `${app.id} · ${app.type} · Ref ${app.reference}`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/documents",
						search: { app: app.id },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), " Attach Documents"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/validation",
						search: { app: app.id },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), " Validation"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/reports",
						search: { app: app.id },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileChartColumnIncreasing, { className: "h-4 w-4" }), " Report"]
					})
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-w-0 gap-6 xl:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-6 xl:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Application Details",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid gap-4 p-5 sm:grid-cols-2",
							children: [[
								["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: app.status }, "s")],
								["Review status", app.reviewStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: app.reviewStatus }, "r") : "Not required"],
								["Submitted", fmtDate(app.submitted)],
								["Reference", app.reference]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs uppercase tracking-wide text-muted-foreground",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm font-medium",
								children: v
							})] }, k)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs uppercase tracking-wide text-muted-foreground",
									children: "Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-sm",
									children: app.description
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: `Documents (${myDocs.length})`,
						children: myDocs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "No documents attached yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y",
							children: myDocs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 px-5 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-sm font-medium",
											children: d.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground",
											children: [
												d.docType,
												" · ",
												fmtSize(d.size)
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: d.status })
								]
							}, d.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
						title: "Simulated Check Summary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "Simulated results for demonstration — no real AI analysis was performed." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "divide-y",
							children: checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between px-5 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: c.result })]
							}, c.name))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Reviewer Comments",
					children: app.comments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "No comments yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3 p-5",
						children: app.comments.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md bg-muted p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: c.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									c.by,
									" · ",
									fmtDateTime(c.at)
								]
							})]
						}, i))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Activity",
					children: logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "No activity yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-4 p-5",
						children: logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-l-2 border-primary/30 pl-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: l.action
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: l.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										fmtDateTime(l.at),
										" · ",
										l.user
									]
								})
							]
						}, l.id))
					})
				})]
			})]
		})
	] });
}
//#endregion
export { Detail as component };
