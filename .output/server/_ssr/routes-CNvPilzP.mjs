import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as useStore, i as fmtDate, t as APP_TYPES } from "./store-sypQrs4G.mjs";
import { t as Button } from "./button-Dh8XWZW7.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowUpRight, E as FileCheckCorner, a as TriangleAlert, h as Plus, k as Clock3, r as UserCheck, w as FileStack } from "../_libs/lucide-react.mjs";
import { a as StatusBadge, i as Panel, r as PageHeader } from "./shared-BGGDkcGC.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-ClxrR_VU.mjs";
import { t as NewApplicationDialog } from "./NewApplicationDialog-BpfNK7ja.mjs";
import { a as CartesianGrid, c as Cell, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Bar, r as YAxis, s as Pie, t as PieChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CNvPilzP.js
var import_jsx_runtime = require_jsx_runtime();
var COLORS = {
	Verified: "var(--chart-1)",
	"Under Validation": "var(--chart-2)",
	Submitted: "var(--chart-5)",
	"Needs Review": "var(--chart-3)",
	Flagged: "var(--chart-4)",
	Rejected: "var(--muted-foreground)"
};
function Dashboard() {
	const { apps, docs, audit, officer } = useStore();
	const stats = [
		{
			label: "Total Applications",
			value: apps.length,
			icon: FileStack,
			tone: "text-primary bg-accent"
		},
		{
			label: "Documents Passing Checks",
			value: docs.filter((d) => d.status === "Checks Passed").length,
			icon: FileCheckCorner,
			tone: "text-success bg-success/12"
		},
		{
			label: "Requiring Review",
			value: apps.filter((a) => a.status === "Needs Review").length,
			icon: UserCheck,
			tone: "text-warning-foreground bg-warning/15"
		},
		{
			label: "Flagged Inconsistencies",
			value: apps.filter((a) => a.status === "Flagged").length,
			icon: TriangleAlert,
			tone: "text-destructive bg-destructive/10"
		}
	];
	const byStatus = Object.keys(COLORS).map((s) => ({
		name: s,
		value: apps.filter((a) => a.status === s).length
	})).filter((x) => x.value);
	const byType = APP_TYPES.map((t) => ({
		name: t.split(" ")[0],
		count: apps.filter((a) => a.type === t).length
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `Welcome back, ${officer.replace(/^Officer /, "")}`,
			subtitle: "A snapshot of your verification workspace. All records and checks are synthetic demo data.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewApplicationDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New Application"]
			}) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: stats.map((s, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stat-enter rounded-xl border bg-card p-5 shadow-[0_1px_2px_rgb(22_35_58_/_3%),0_8px_24px_rgb(22_35_58_/_2%)]",
				style: { animationDelay: `${index * 45}ms` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[13px] text-muted-foreground",
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `flex h-9 w-9 items-center justify-center rounded-lg ${s.tone}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 text-[30px] font-semibold tracking-tight tabular-nums",
						children: s.value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: "Synthetic demo records"
					})
				]
			}, s.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Recent Applications",
				className: "xl:col-span-2",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/applications",
					className: "text-sm font-medium text-primary hover:underline",
					children: "View all"
				}),
				children: apps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-12 text-center text-sm text-muted-foreground",
						children: "No applications yet. Create a demo application to get started."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "pl-5",
						children: "ID"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Applicant" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Submitted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: apps.slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "pl-5 font-mono text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/applications/$id",
							params: { id: a.id },
							className: "font-medium text-primary hover:underline",
							children: a.id
						})
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
						className: "text-muted-foreground",
						children: fmtDate(a.submitted)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: a.status }) })
				] }, a.id)) })] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Verification Status",
				children: byStatus.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-64 items-center justify-center px-5 text-center text-sm text-muted-foreground",
					children: "Status distribution will appear when demo applications are added."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
						data: byStatus,
						dataKey: "value",
						nameKey: "name",
						innerRadius: 55,
						outerRadius: 85,
						paddingAngle: 2,
						children: byStatus.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[s.name] }, s.name))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {})] }) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1.5 px-5 pb-5 text-sm",
					children: byStatus.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-2.5 w-2.5 rounded-full",
								style: { background: COLORS[s.name] }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 text-muted-foreground",
								children: s.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium tabular-nums",
								children: s.value
							})
						]
					}, s.name))
				})] })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Applications by Type",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: byType,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "var(--border)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								tick: {
									fontSize: 12,
									fill: "var(--muted-foreground)"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								allowDecimals: false,
								tick: {
									fontSize: 12,
									fill: "var(--muted-foreground)"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "count",
								fill: "var(--primary)",
								radius: [
									4,
									4,
									0,
									0
								]
							})
						]
					}) })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Recent Activity",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/audit",
					className: "inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline",
					children: ["View audit log ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" })]
				}),
				children: audit.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-64 flex-col items-center justify-center gap-2 px-5 text-center text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-7 w-7 text-muted-foreground/50" }), "No activity recorded yet."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "divide-y",
					children: audit.slice(0, 4).map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 px-5 py-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/65" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[13px] font-medium",
										children: entry.action
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
										className: "text-[11px] text-muted-foreground",
										children: fmtDate(entry.at)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 truncate text-xs text-muted-foreground",
									children: entry.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-[10px] text-muted-foreground/80",
									children: entry.user
								})
							]
						})]
					}, entry.id))
				})
			})]
		})
	] });
}
//#endregion
export { Dashboard as component };
