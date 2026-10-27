import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as fmtDateTime, c as useStore, i as fmtDate, s as simulatedChecks } from "./store-sypQrs4G.mjs";
import { t as Button } from "./button-Dh8XWZW7.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as StatusBadge, i as Panel, n as EmptyState, r as PageHeader, t as DemoNotice } from "./shared-BGGDkcGC.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-BbIBqiay.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RS = [
	"Pending",
	"In Review",
	"Info Requested",
	"Approved",
	"Rejected"
];
function Review() {
	const { apps, updateReview } = useStore();
	const queue = apps.filter((a) => a.reviewStatus && a.reviewStatus !== "Approved" && a.reviewStatus !== "Rejected");
	const [sel, setSel] = (0, import_react.useState)("");
	const current = queue.find((a) => a.id === sel) ?? queue[0];
	const findings = current ? simulatedChecks(current).filter((check) => check.result !== "Pass") : [];
	const [status, setStatus] = (0, import_react.useState)("");
	const [comment, setComment] = (0, import_react.useState)("");
	const save = () => {
		if (!current) return;
		const s = status || current.reviewStatus;
		if (!comment.trim() && s === current.reviewStatus) {
			toast.error("Add a comment or change the status");
			return;
		}
		updateReview(current.id, s, comment.trim());
		toast.success(`Review updated for ${current.id}`);
		setComment("");
		setStatus("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Manual Review",
		subtitle: "Applications routed for human verification. Decisions here are demo actions only."
	}), queue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "No applications in the review queue." }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 xl:grid-cols-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: `Review Queue (${queue.length})`,
			className: "xl:col-span-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y",
				children: queue.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setSel(a.id);
						setStatus("");
						setComment("");
					},
					className: `flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-muted ${current?.id === a.id ? "bg-accent" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-sm font-medium",
							children: a.applicant
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-xs text-muted-foreground",
							children: [
								a.id,
								" · ",
								fmtDate(a.submitted)
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: a.reviewStatus })]
				}) }, a.id))
			})
		}), current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: `${current.id} — ${current.type}`,
			className: "xl:col-span-3",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/applications/$id",
				params: { id: current.id },
				className: "text-sm font-medium text-primary hover:underline",
				children: "Open application"
			}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "Findings below are deterministic demo scenarios based on application metadata; document contents have not been analyzed." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Application status:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: current.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-3 text-muted-foreground",
								children: "Review:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: current.reviewStatus })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: current.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 text-sm font-medium",
						children: [
							"Potential findings (",
							findings.length,
							")"
						]
					}), findings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No warning or failure findings in this demo scenario."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: findings.map((finding) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border bg-card p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: finding.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: finding.result }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: finding.severity })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: finding.finding
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium text-foreground/80",
											children: [
												"Demo evidence · ",
												finding.ruleId,
												":"
											]
										}),
										" ",
										finding.evidence
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "Suggested next step:"
										}),
										" ",
										finding.action
									]
								})
							]
						}, finding.ruleId))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-md border bg-muted/40 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: "Reviewer decision"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: status || current.reviewStatus || "Pending",
								onValueChange: (v) => setStatus(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-full bg-card sm:w-60",
									"aria-label": "Reviewer decision",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: RS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: r,
									children: r
								}, r)) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "reviewer-comment",
								children: "Reviewer comment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "reviewer-comment",
								className: "bg-card",
								rows: 3,
								placeholder: "Add reviewer comment…",
								value: comment,
								onChange: (e) => setComment(e.target.value),
								maxLength: 500
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: save,
								children: "Save Review"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-sm font-medium",
						children: "Comment history"
					}), current.comments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No comments yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: [...current.comments].reverse().map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md border p-3 text-sm",
							children: [c.text, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									c.by,
									" · ",
									fmtDateTime(c.at)
								]
							})]
						}, i))
					})] })
				]
			})
		})]
	})] });
}
//#endregion
export { Review as component };
