import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as fmtDateTime, c as useStore, i as fmtDate, o as fmtSize, s as simulatedChecks } from "./store-sypQrs4G.mjs";
import { t as Button } from "./button-Dh8XWZW7.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as Download, c as ShieldCheck, m as Printer } from "../_libs/lucide-react.mjs";
import { a as StatusBadge, i as Panel, n as EmptyState, r as PageHeader } from "./shared-BGGDkcGC.mjs";
import { t as AppPicker } from "./AppPicker-VXKomcJA.mjs";
import { t as Route } from "./reports-CzX3_uuA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-k02X1RXF.js
var import_jsx_runtime = require_jsx_runtime();
function toCsv(rows) {
	return rows.map((row) => row.map((cell) => {
		const value = cell == null ? "" : String(cell);
		return `"${(/^[\t\r ]*[=+\-@]/.test(value) ? `'${value}` : value).replaceAll("\"", "\"\"")}"`;
	}).join(",")).join("\r\n");
}
function Reports() {
	const { app } = Route.useSearch();
	const nav = useNavigate({ from: "/reports" });
	const { apps, docs, officer, log } = useStore();
	const appId = app ?? apps[0]?.id ?? "";
	const a = apps.find((x) => x.id === appId);
	const print = () => {
		log("Report Printed", appId, "Validation report opened in browser print dialog.");
		window.print();
	};
	const exportCsv = () => {
		if (!a) return;
		const checks = simulatedChecks(a);
		const csv = toCsv([[
			"Record type",
			"Record ID",
			"Field 1",
			"Value 1",
			"Field 2",
			"Value 2",
			"Field 3",
			"Value 3",
			"Field 4",
			"Value 4",
			"Field 5",
			"Value 5"
		], ...[
			[
				"Application",
				a.id,
				"Applicant",
				a.applicant,
				"Type",
				a.type,
				"Reference",
				a.reference
			],
			[
				"Application",
				a.id,
				"Submitted",
				fmtDate(a.submitted),
				"Status",
				a.status
			],
			...docs.filter((document) => document.appId === a.id).map((document) => [
				"Document",
				document.id,
				"File",
				document.name,
				"Type",
				document.docType,
				"Size",
				fmtSize(document.size),
				"Status",
				document.status
			]),
			...checks.map((check) => [
				"Simulated check",
				check.ruleId,
				"Check",
				check.name,
				"Finding",
				check.finding,
				"Result",
				check.result,
				"Severity",
				check.severity,
				"Recommended action",
				check.action
			]),
			...a.comments.map((comment) => [
				"Reviewer comment",
				comment.by,
				"Date",
				fmtDateTime(comment.at),
				"Comment",
				comment.text
			])
		]]);
		const url = URL.createObjectURL(new Blob(["﻿", csv], { type: "text/csv;charset=utf-8" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = `${a.id.toLowerCase()}-validation-report.csv`;
		link.click();
		URL.revokeObjectURL(url);
		log("Report Exported", a.id, "Simulated validation report exported as CSV.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "no-print",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Reports",
			subtitle: "Generate a readable validation report. Use Print → Save as PDF to export.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: exportCsv,
					disabled: !a,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Export CSV"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: print,
					disabled: !a,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), " Print / Save as PDF"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPicker, {
				value: appId,
				onChange: (v) => nav({ search: { app: v } })
			})
		})]
	}), !a ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "Select an application to view its report." }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		className: "print-area mx-auto max-w-4xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-8 lg:p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between border-b pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-semibold",
							children: "VeriFlow AI — Validation Report"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: "Prototype output · SIH26261"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Generated ", fmtDateTime((/* @__PURE__ */ new Date()).toISOString())] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["By ", officer] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 rounded-md border border-warning/40 bg-warning/15 px-4 py-2.5 text-sm text-warning-foreground",
					children: "This report contains simulated results from a demonstration prototype. It is not a compliance certificate or official approval."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Application"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 grid grid-cols-2 gap-x-8 gap-y-3 text-sm",
					children: [[
						["Application ID", a.id],
						["Applicant", a.applicant],
						["Type", a.type],
						["Reference", a.reference],
						["Submitted", fmtDate(a.submitted)]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "font-medium",
						children: v
					})] }, k)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: "Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: a.status }) })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Documents"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 w-full overflow-x-auto print:overflow-visible",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[560px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b text-left text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 font-medium",
									children: "File"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "font-medium",
									children: "Type"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "font-medium",
									children: "Size"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "font-medium",
									children: "Status"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [docs.filter((d) => d.appId === a.id).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2",
									children: d.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: d.docType }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: fmtSize(d.size) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: d.status })
							]
						}, d.id)), !docs.some((d) => d.appId === a.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 4,
							className: "py-3 text-muted-foreground",
							children: "No documents attached."
						}) })] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Simulated Checks"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 w-full overflow-x-auto print:overflow-visible",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[560px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b text-left text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-2 font-medium",
									children: "Check"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "font-medium",
									children: "Result"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "font-medium",
									children: "Severity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "font-medium",
									children: "Recommended action"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: simulatedChecks(a).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b align-top",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2 pr-3",
									children: [c.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: c.finding
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "pr-3",
									children: c.result
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "pr-3",
									children: c.severity
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.action })
							]
						}, c.name)) })]
					})
				}),
				a.comments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Reviewer Comments"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: a.comments.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"“",
						c.text,
						"” — ",
						c.by,
						", ",
						fmtDateTime(c.at)
					] }, i))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 border-t pt-4 text-xs text-muted-foreground",
					children: "Generated by the VeriFlow AI prototype using synthetic data. No genuine AI verification, forensic document authentication or regulatory approval has been performed."
				})
			]
		})
	})] });
}
//#endregion
export { Reports as component };
