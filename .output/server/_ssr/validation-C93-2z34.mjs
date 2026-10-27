import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as useStore, s as simulatedChecks } from "./store-sypQrs4G.mjs";
import { t as Button } from "./button-Dh8XWZW7.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Circle, C as FileText, M as CircleCheck, a as TriangleAlert, g as Play, j as CircleX, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as StatusBadge, i as Panel, n as EmptyState, r as PageHeader, t as DemoNotice } from "./shared-BGGDkcGC.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-ClxrR_VU.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AppPicker } from "./AppPicker-VXKomcJA.mjs";
import { t as Route } from "./validation-C6bFiWSr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/validation-C93-2z34.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Validation() {
	const { app } = Route.useSearch();
	const nav = useNavigate({ from: "/validation" });
	const { apps, docs, log } = useStore();
	const appId = app ?? apps[0]?.id ?? "";
	const a = apps.find((x) => x.id === appId);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [complete, setComplete] = (0, import_react.useState)(false);
	const [stage, setStage] = (0, import_react.useState)(-1);
	const [detail, setDetail] = (0, import_react.useState)(null);
	const run = () => {
		setComplete(false);
		setStage(0);
		setRunning(true);
	};
	const selectApp = (value) => {
		setRunning(false);
		setComplete(false);
		setStage(-1);
		nav({ search: { app: value } });
	};
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const timer = window.setTimeout(() => {
			if (stage < 3) {
				setStage((current) => current + 1);
				return;
			}
			setRunning(false);
			setComplete(true);
			log("Validation Run", appId, "Simulated validation checks re-run (demo).");
			toast.success("Simulated verification complete");
		}, 500);
		return () => window.clearTimeout(timer);
	}, [
		appId,
		log,
		running,
		stage
	]);
	if (!a) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Validation Results" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "No applications available." }) })] });
	const checks = simulatedChecks(a);
	const appDocs = docs.filter((d) => d.appId === a.id);
	const fails = checks.filter((c) => c.result === "Fail").length;
	const warns = checks.filter((c) => c.result === "Warning").length;
	const overall = fails ? "Fail" : warns ? "Warning" : "Pass";
	const Icon = overall === "Pass" ? CircleCheck : overall === "Warning" ? TriangleAlert : CircleX;
	const tone = overall === "Pass" ? "text-success" : overall === "Warning" ? "text-warning" : "text-destructive";
	const stages = [
		"Application information",
		"Selected documents",
		"Rule-based checks",
		"Findings & next steps"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Validation Results",
			subtitle: "Rule-based check outcomes per application.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: run,
				disabled: running,
				children: [
					running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }),
					" ",
					running ? "Demo verification in progress" : "Run Demo Verification"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/applications/$id",
					params: { id: a.id },
					children: "Open Application"
				})
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "DEMO / SIMULATED VERIFICATION — fixed results from local demo logic; no document contents are analyzed and this is not an official compliance determination." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPicker, {
				value: appId,
				onChange: selectApp
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Verification workflow",
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-0 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-4",
				children: stages.map((label, index) => {
					const done = complete || running && index < stage;
					const active = running && index === stage;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-center gap-3 px-1 py-2.5 sm:px-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${done ? "border-success/30 bg-success/10 text-success" : active ? "border-primary/30 bg-accent text-primary" : "border-border bg-muted/60 text-muted-foreground"}`,
								children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-medium",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-[10px] text-muted-foreground",
									children: done ? "Complete" : active ? "In progress" : "Ready"
								})]
							}),
							index < stages.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-9 top-[27px] hidden h-px w-[calc(100%-1rem)] bg-border xl:block" })
						]
					}, label);
				})
			}), running && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t bg-muted/30 px-5 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between text-[11px] text-muted-foreground",
					"aria-live": "polite",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Running deterministic demo checks…" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [Math.round((stage + 1) / stages.length * 100), "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-muted",
					role: "progressbar",
					"aria-label": "Simulated verification progress",
					"aria-valuemin": 0,
					"aria-valuemax": 100,
					"aria-valuenow": Math.round((stage + 1) / stages.length * 100),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-primary transition-[width] duration-300 ease-out",
						style: { width: `${(stage + 1) / stages.length * 100}%` }
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-6 xl:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Application information",
				className: "xl:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid grid-cols-2 gap-x-4 gap-y-4 p-5",
					children: [
						["Applicant", a.applicant],
						["Application ID", a.id],
						["Application type", a.type],
						["Reference", a.reference]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[10px] font-medium uppercase tracking-wide text-muted-foreground",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 truncate text-xs font-medium",
							title: value,
							children: value
						})]
					}, label))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: `Selected documents · ${appDocs.length}`,
				className: "xl:col-span-3",
				children: appDocs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: appDocs.map((document) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 px-5 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs font-medium",
									children: document.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-0.5 text-[10px] text-muted-foreground",
									children: [document.docType, " · demo metadata only"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: document.status })
						]
					}, document.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "No documents attached to this application." })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-4 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 rounded-xl border bg-card p-5 shadow-sm md:col-span-2",
					children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-10 w-10 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-10 w-10 ${tone}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: "Overall status (simulated)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xl font-semibold",
							children: running ? "Running checks…" : overall === "Pass" ? "All checks passed" : overall === "Warning" ? "Passed with warnings" : "Issues found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted-foreground",
							children: [
								a.applicant,
								" · ",
								a.type
							]
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Passed",
					value: checks.length - fails - warns
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Warnings / Failures",
					value: `${warns} / ${fails}`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Individual Checks",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground",
				children: "Fixed demo scenario"
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "pl-5",
					children: "Check"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Result" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Severity" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Finding" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Recommended Action" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { className: "pr-5" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "pl-5 font-medium",
					children: [c.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-xs text-muted-foreground",
						children: c.ruleId
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: c.result }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: c.severity }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "max-w-xs text-sm text-muted-foreground",
					children: c.finding
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "max-w-xs text-sm",
					children: c.action
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "pr-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => setDetail(c),
						children: "Details"
					})
				})
			] }, c.name)) })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!detail,
			onOpenChange: (o) => !o && setDetail(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: detail.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: ["Simulated finding · Rule ", detail.ruleId] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: detail.result }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: detail.severity })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "space-y-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs uppercase text-muted-foreground",
							children: "Finding"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: detail.finding })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs uppercase text-muted-foreground",
							children: "Evidence notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: detail.evidence })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs uppercase text-muted-foreground",
							children: "Recommended action"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: detail.action })] })
					]
				})
			] }) })
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border bg-card p-5 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-3xl font-semibold tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { Validation as component };
