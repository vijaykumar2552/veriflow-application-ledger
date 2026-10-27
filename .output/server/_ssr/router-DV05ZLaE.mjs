import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as fmtDateTime, c as useStore, r as StoreProvider, s as simulatedChecks } from "./store-sypQrs4G.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Dh8XWZW7.mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useNavigate, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$6 } from "./applications._id-BbQpFf3i.mjs";
import { C as FileText, D as FileChartColumnIncreasing, E as FileCheckCorner, F as ChevronLeft, L as Check, P as ChevronRight, R as BookOpen, T as FileExclamationPoint, _ as Moon, b as LayoutDashboard, c as ShieldCheck, d as Search, f as ScrollText, g as Play, l as ShieldAlert, n as UserRoundCheck, r as UserCheck, s as Sun, t as X, u as Settings, v as Menu, w as FileStack, z as Bell } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$7 } from "./documents-ud98EEGG.mjs";
import { t as Route$8 } from "./reports-CzX3_uuA.mjs";
import { n as Route$9, t as RULES } from "./rules-CzrBDrYl.mjs";
import { a as useTheme, i as themeInitializationScript, n as ThemeContext, r as isThemePreference, t as STORAGE_KEY$1 } from "./theme-config-DaCSQ_n9.mjs";
import { t as Route$10 } from "./validation-C6bFiWSr.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DV05ZLaE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B10JrBzv.css";
function searchRecords(applications, documents, query) {
	const term = query.trim().toLocaleLowerCase();
	if (!term) return [];
	const matches = (value) => !term || value.toLocaleLowerCase().includes(term);
	const applicationsById = new Map(applications.map((application) => [application.id, application]));
	const applicationResults = applications.filter((application) => matches(`${application.id} ${application.applicant} ${application.type} ${application.reference} ${application.description} ${application.status}`)).slice(0, 5).map((application) => ({
		kind: "application",
		key: application.id,
		title: application.applicant,
		subtitle: `${application.id} · ${application.type} · ${application.status}`,
		appId: application.id
	}));
	const documentResults = documents.filter((document) => {
		const application = applicationsById.get(document.appId);
		return matches(`${document.name} ${document.docType} ${document.status} ${document.appId} ${application?.applicant ?? ""}`);
	}).slice(0, 5).map((document) => ({
		kind: "document",
		key: document.id,
		title: document.name,
		subtitle: `${document.docType} · ${applicationsById.get(document.appId)?.applicant ?? document.appId}`,
		appId: document.appId
	}));
	const findingResults = applications.flatMap((application) => simulatedChecks(application).map((check) => ({
		application,
		check
	}))).filter(({ application, check }) => check.result !== "Pass" && matches(`${check.ruleId} ${check.name} ${check.finding} ${check.evidence} ${application.id} ${application.applicant}`)).slice(0, 5).map(({ application, check }) => ({
		kind: "finding",
		key: `${application.id}-${check.ruleId}`,
		title: check.name,
		subtitle: `${check.ruleId} · ${check.result} · ${application.applicant}`,
		appId: application.id
	}));
	const ruleResults = RULES.filter((rule) => matches(`${rule.id} ${rule.title} ${rule.category} ${rule.description} ${rule.severity}`)).slice(0, 5).map((rule) => ({
		kind: "rule",
		key: rule.id,
		title: rule.title,
		subtitle: `${rule.id} · ${rule.category} · ${rule.severity}`,
		ruleId: rule.id
	}));
	return [
		...applicationResults,
		...documentResults,
		...findingResults,
		...ruleResults
	];
}
var icons = {
	application: FileStack,
	document: FileCheckCorner,
	finding: ShieldAlert,
	rule: BookOpen
};
var labels = {
	application: "Applications",
	document: "Documents",
	finding: "Simulated findings",
	rule: "Illustrative rules"
};
var commands = [
	{
		label: "Dashboard",
		description: "Overview and activity",
		to: "/",
		icon: LayoutDashboard
	},
	{
		label: "Applications",
		description: "Search and manage applications",
		to: "/applications",
		icon: FileStack
	},
	{
		label: "Document Centre",
		description: "Uploaded document metadata",
		to: "/documents",
		icon: FileCheckCorner
	},
	{
		label: "Validation Centre",
		description: "Review simulated check results",
		to: "/validation",
		icon: ShieldAlert
	},
	{
		label: "Review Centre",
		description: "Open the manual review queue",
		to: "/review",
		icon: UserRoundCheck
	},
	{
		label: "Compliance Rules",
		description: "Browse illustrative demo rules",
		to: "/rules",
		icon: BookOpen
	},
	{
		label: "Audit Trail",
		description: "Inspect recorded demo activity",
		to: "/audit",
		icon: ScrollText
	},
	{
		label: "Reports",
		description: "Open validation reports and exports",
		to: "/reports",
		icon: FileText
	},
	{
		label: "Settings",
		description: "Profile and appearance preferences",
		to: "/settings",
		icon: Settings
	}
];
function GlobalCommand() {
	const { apps, docs } = useStore();
	const { resolvedTheme, toggleTheme } = useTheme();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const results = (0, import_react.useMemo)(() => searchRecords(apps, docs, query), [
		apps,
		docs,
		query
	]);
	const matchingCommands = commands.filter((command) => `${command.label} ${command.description}`.toLowerCase().includes(query.trim().toLowerCase()));
	const themeCommand = {
		label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`,
		description: "Change appearance for this browser",
		icon: resolvedTheme === "dark" ? Sun : Moon
	};
	const showThemeCommand = `${themeCommand.label} ${themeCommand.description}`.toLowerCase().includes(query.trim().toLowerCase());
	const demoCommandMatches = "start guided demo walkthrough".includes(query.trim().toLowerCase());
	(0, import_react.useEffect)(() => {
		const handleShortcut = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setOpen(true);
			}
		};
		const handleOpen = () => setOpen(true);
		window.addEventListener("keydown", handleShortcut);
		window.addEventListener("veriflow:open-search", handleOpen);
		return () => {
			window.removeEventListener("keydown", handleShortcut);
			window.removeEventListener("veriflow:open-search", handleOpen);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (open) setQuery("");
	}, [open]);
	const renderResult = (result) => {
		const Icon = icons[result.kind];
		const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "h-4 w-4",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-sm font-medium text-foreground",
					children: result.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-xs text-muted-foreground",
					children: result.subtitle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] uppercase tracking-wide text-muted-foreground",
				children: labels[result.kind]
			})
		] });
		const className = "command-item flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none";
		if (result.kind === "application") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/applications/$id",
			params: { id: result.appId },
			className,
			"data-command-item": "true",
			onClick: () => setOpen(false),
			children: content
		}, `${result.kind}-${result.key}`);
		if (result.kind === "document") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/documents",
			search: { app: result.appId },
			className,
			"data-command-item": "true",
			onClick: () => setOpen(false),
			children: content
		}, `${result.kind}-${result.key}`);
		if (result.kind === "rule") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/rules",
			search: { q: result.ruleId },
			className,
			"data-command-item": "true",
			onClick: () => setOpen(false),
			children: content
		}, `${result.kind}-${result.key}`);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/validation",
			search: { app: result.appId },
			className,
			"data-command-item": "true",
			onClick: () => setOpen(false),
			children: content
		}, `${result.kind}-${result.key}`);
	};
	const handlePaletteKeyDown = (event) => {
		if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
		const items = Array.from(event.currentTarget.querySelectorAll("[data-command-item='true']"));
		if (!items.length) return;
		event.preventDefault();
		const currentIndex = items.indexOf(document.activeElement);
		const nextIndex = event.key === "ArrowDown" ? currentIndex < 0 || currentIndex === items.length - 1 ? 0 : currentIndex + 1 : currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
		if (document.activeElement === inputRef.current && event.key === "ArrowUp") items[items.length - 1]?.focus();
		else items[nextIndex]?.focus();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			onKeyDown: handlePaletteKeyDown,
			className: "top-[12%] max-h-[78vh] translate-y-0 gap-3 overflow-hidden p-0 sm:top-[15%]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "border-b px-5 pb-3 pt-5 pr-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Search VeriFlow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Search demo records or navigate to a workspace." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						className: "absolute left-8 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						autoFocus: true,
						ref: inputRef,
						"aria-label": "Search applications, documents, and findings",
						className: "pl-9",
						placeholder: "Search records or pages…",
						value: query,
						onChange: (event) => setQuery(event.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-32 space-y-4 overflow-y-auto px-3 pb-4",
					"aria-live": "polite",
					children: [(matchingCommands.length > 0 || showThemeCommand || demoCommandMatches) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-label": "Commands",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
							children: "Navigate"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-0.5",
							children: [
								matchingCommands.map((command) => {
									const Icon = command.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: command.to,
										className: "command-item flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
										"data-command-item": "true",
										onClick: () => setOpen(false),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													className: "h-4 w-4",
													"aria-hidden": "true"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block truncate text-sm font-medium text-foreground",
													children: command.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block truncate text-xs text-muted-foreground",
													children: command.description
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase tracking-wide text-muted-foreground",
												children: "Page"
											})
										]
									}, command.to);
								}),
								showThemeCommand && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "command-item flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
									"data-command-item": "true",
									onClick: () => {
										try {
											toggleTheme();
											setOpen(false);
										} catch (error) {
											toast.error("Could not save your appearance preference.");
											console.error("Could not persist theme preference.", error);
										}
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(themeCommand.icon, {
												className: "h-4 w-4",
												"aria-hidden": "true"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate text-sm font-medium text-foreground",
												children: themeCommand.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate text-xs text-muted-foreground",
												children: themeCommand.description
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase tracking-wide text-muted-foreground",
											children: "Theme"
										})
									]
								}),
								demoCommandMatches && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "command-item flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
									"data-command-item": "true",
									onClick: () => {
										setOpen(false);
										window.dispatchEvent(new Event("veriflow:start-guided-demo"));
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
												className: "h-4 w-4",
												"aria-hidden": "true"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate text-sm font-medium text-foreground",
												children: "Start guided demo"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate text-xs text-muted-foreground",
												children: "Follow the sample application walkthrough"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase tracking-wide text-muted-foreground",
											children: "Demo"
										})
									]
								})
							]
						})]
					}), query.trim() && results.length === 0 && matchingCommands.length === 0 && !showThemeCommand && !demoCommandMatches ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 py-8 text-center text-sm text-muted-foreground",
						children: "No matching pages or demo records."
					}) : [
						"application",
						"document",
						"finding",
						"rule"
					].map((kind) => {
						const records = results.filter((result) => result.kind === kind);
						if (!records.length) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							"aria-label": labels[kind],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
								children: labels[kind]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-0.5",
								children: records.map(renderResult)
							})]
						}, kind);
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t bg-muted/40 px-5 py-2 text-[11px] text-muted-foreground",
					children: [
						"Press ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded border bg-background px-1.5 py-0.5 font-mono",
							children: "Esc"
						}),
						" to close · Search includes demo data only"
					]
				})
			]
		})
	});
}
var STORAGE_KEY = "veriflow-notifications-read";
function NotificationCenter() {
	const { apps, docs } = useStore();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [readIds, setReadIds] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const reviews = (0, import_react.useMemo)(() => apps.filter((application) => application.reviewStatus && application.reviewStatus !== "Approved" && application.reviewStatus !== "Rejected").map((application) => ({
		id: `review:${application.id}`,
		group: "review",
		title: application.applicant,
		detail: `${application.id} · ${application.reviewStatus}`,
		date: application.submitted,
		appId: application.id
	})), [apps]);
	const attentionDocs = (0, import_react.useMemo)(() => docs.filter((document) => document.status === "Needs Review" || document.status === "Flagged").map((document) => ({
		id: `document:${document.id}`,
		group: "document",
		title: document.name,
		detail: `${document.appId} · ${document.status}`,
		date: document.uploaded,
		appId: document.appId
	})), [docs]);
	const notifications = [...reviews, ...attentionDocs];
	const unreadCount = notifications.filter((notification) => !readIds.has(notification.id)).length;
	(0, import_react.useEffect)(() => {
		try {
			const saved = window.localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed) && parsed.every((id) => typeof id === "string")) setReadIds(new Set(parsed));
			}
		} catch (error) {
			toast.error("Could not restore notification read state.");
			console.error("Could not read notification state.", error);
		} finally {
			setLoaded(true);
		}
	}, []);
	const persistReadIds = (next) => {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
			setReadIds(next);
		} catch (error) {
			toast.error("Could not save notification read state.");
			console.error("Could not persist notification state.", error);
		}
	};
	const markRead = (id) => {
		if (readIds.has(id)) return;
		persistReadIds(/* @__PURE__ */ new Set([...readIds, id]));
	};
	const markAllRead = () => persistReadIds(new Set(notifications.map(({ id }) => id)));
	const reviewsUnread = reviews.filter(({ id }) => !readIds.has(id)).length;
	const documentsUnread = attentionDocs.filter(({ id }) => !readIds.has(id)).length;
	const renderItems = (items) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y rounded-lg border",
		children: items.map((notification) => {
			const content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 flex-1 items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `mt-1.5 h-2 w-2 shrink-0 rounded-full ${readIds.has(notification.id) ? "bg-transparent" : "bg-primary"}`,
					"aria-label": readIds.has(notification.id) ? "Read" : "Unread"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm font-medium",
							children: notification.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block truncate text-xs text-muted-foreground",
							children: notification.detail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
							className: "mt-1 block text-[10px] text-muted-foreground",
							dateTime: notification.date,
							children: fmtDateTime(notification.date)
						})
					]
				})]
			}) });
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2 px-3 py-2",
				children: [notification.group === "review" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/review",
					className: "flex min-w-0 flex-1 rounded-md py-1 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					onClick: () => {
						markRead(notification.id);
						setOpen(false);
					},
					children: content
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/documents",
					search: { app: notification.appId },
					className: "flex min-w-0 flex-1 rounded-md py-1 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					onClick: () => {
						markRead(notification.id);
						setOpen(false);
					},
					children: content
				}), !readIds.has(notification.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Mark ${notification.title} as read`,
					title: "Mark as read",
					className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					onClick: () => markRead(notification.id),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "h-4 w-4",
						"aria-hidden": "true"
					})
				})]
			}, notification.id);
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-label": `Open demo notifications${unreadCount ? `, ${unreadCount} unread` : ""}`,
				className: "relative inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
					className: "h-4 w-4",
					"aria-hidden": "true"
				}), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute -right-1 -top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground",
					children: unreadCount
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[80vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Demo notifications" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Locally derived review and document reminders. They are not real-time service notifications." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5",
				children: notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-lg border px-3 py-8 text-center text-sm text-muted-foreground",
					children: "No open review or document items."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: loaded ? `${unreadCount} unread` : "Loading saved read state…"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !loaded || unreadCount === 0,
							onClick: markAllRead,
							className: "rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50",
							children: "Mark all as read"
						})]
					}),
					reviews.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRoundCheck, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							}),
							"Reviews awaiting action",
							reviewsUnread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary",
								children: reviewsUnread
							})
						]
					}), renderItems(reviews)] }),
					attentionDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							}),
							"Documents to inspect",
							documentsUnread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary",
								children: documentsUnread
							})
						]
					}), renderItems(attentionDocs)] })
				] })
			})]
		})]
	});
}
function ClockAndTheme() {
	const [now, setNow] = (0, import_react.useState)(null);
	const { resolvedTheme, toggleTheme } = useTheme();
	const dark = resolvedTheme === "dark";
	(0, import_react.useEffect)(() => {
		setNow(/* @__PURE__ */ new Date());
		const timer = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(timer);
	}, []);
	const time = now ? new Intl.DateTimeFormat(void 0, {
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit"
	}).format(now) : "--:--:--";
	const date = now ? new Intl.DateTimeFormat(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(now) : "Local date";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-[76px] flex-col items-end leading-tight",
		"aria-label": "Local system time and date",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
			dateTime: now?.toISOString(),
			className: "whitespace-nowrap font-mono text-[10px] font-medium tabular-nums text-foreground sm:text-xs",
			children: time
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
			dateTime: now?.toISOString().slice(0, 10),
			className: "mt-1 hidden whitespace-nowrap text-[10px] text-muted-foreground sm:block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden xl:inline",
				children: date
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "xl:hidden",
				children: now ? new Intl.DateTimeFormat(void 0, {
					weekday: "short",
					day: "numeric",
					month: "short"
				}).format(now) : "Local date"
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": dark ? "Switch to light theme" : "Switch to dark theme",
		"aria-pressed": dark,
		title: dark ? "Switch to light theme" : "Switch to dark theme",
		onClick: () => {
			try {
				toggleTheme();
			} catch (error) {
				toast.error("Could not save your appearance preference.");
				console.error("Could not persist theme preference.", error);
			}
		},
		className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, {
			className: "h-4 w-4 transition-transform duration-200",
			"aria-hidden": "true"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, {
			className: "h-4 w-4 transition-transform duration-200",
			"aria-hidden": "true"
		})
	})] });
}
var SAMPLE_APP = "APP-2026-1048";
function GuidedDemo() {
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [current, setCurrent] = (0, import_react.useState)(0);
	const steps = (0, import_react.useMemo)(() => [
		{
			title: "Dashboard",
			description: "Start with the command centre: application counts, simulated outcomes, and recent demo activity.",
			visit: () => navigate({ to: "/" })
		},
		{
			title: "Sample application",
			description: "Open a seeded sample record to inspect applicant information and its current workflow state.",
			visit: () => navigate({
				to: "/applications/$id",
				params: { id: SAMPLE_APP }
			})
		},
		{
			title: "Document Centre",
			description: "Review attached document metadata. The prototype records filenames and categories only; it does not read or authenticate file contents.",
			visit: () => navigate({
				to: "/documents",
				search: { app: SAMPLE_APP }
			})
		},
		{
			title: "Validation Centre",
			description: "Inspect the deterministic simulated checks, evidence text, severity, and recommended next actions for the sample.",
			visit: () => navigate({
				to: "/validation",
				search: { app: SAMPLE_APP }
			})
		},
		{
			title: "Illustrative rules",
			description: "Browse the demo rule library. These examples are not authoritative legal requirements or an official government service.",
			visit: () => navigate({
				to: "/rules",
				search: { q: "" }
			})
		},
		{
			title: "Human review",
			description: "See applications routed for manual review and the available reviewer actions using local demo state.",
			visit: () => navigate({ to: "/review" })
		},
		{
			title: "Audit Trail",
			description: "Review the seeded and browser-generated activity entries. The demo log is not immutable or tamper-proof.",
			visit: () => navigate({ to: "/audit" })
		},
		{
			title: "Reports",
			description: "Preview the selected sample's report and export its local demo data as CSV or print to PDF.",
			visit: () => navigate({
				to: "/reports",
				search: { app: SAMPLE_APP }
			})
		}
	], [navigate]);
	const visit = (0, import_react.useCallback)((index) => {
		const destination = steps[index];
		if (!destination) return;
		destination.visit().catch((error) => {
			toast.error("Could not open the next demo section.");
			console.error("Guided demo navigation failed.", error);
		});
	}, [steps]);
	(0, import_react.useEffect)(() => {
		const handleStart = () => {
			setCurrent(0);
			setOpen(true);
			visit(0);
		};
		window.addEventListener("veriflow:start-guided-demo", handleStart);
		return () => window.removeEventListener("veriflow:start-guided-demo", handleStart);
	}, [visit]);
	const goTo = (index) => {
		if (!steps[index]) return;
		setCurrent(index);
		visit(index);
	};
	const step = steps[current];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
							className: "h-3.5 w-3.5",
							"aria-hidden": "true"
						}), "Guided SIH demonstration"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: step?.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: step?.description })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1.5",
					role: "progressbar",
					"aria-label": "Guided demo progress",
					"aria-valuemin": 1,
					"aria-valuemax": steps.length,
					"aria-valuenow": current + 1,
					children: steps.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 flex-1 rounded-full transition-colors ${index <= current ? "bg-primary" : "bg-muted"}` }, item.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Step ",
						current + 1,
						" of ",
						steps.length,
						" · Sample data only"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex-row items-center justify-between sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						onClick: () => setOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
							className: "h-4 w-4",
							"aria-hidden": "true"
						}), "Exit demo"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							disabled: current === 0,
							onClick: () => goTo(current - 1),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							}), "Previous"]
						}), current < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => goTo(current + 1),
							children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setOpen(false),
							children: ["Finish ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "h-4 w-4",
								"aria-hidden": "true"
							})]
						})]
					})]
				})
			]
		})
	});
}
var nav = [
	{
		to: "/",
		label: "Dashboard",
		icon: LayoutDashboard,
		group: "Workspace"
	},
	{
		to: "/applications",
		label: "Applications",
		icon: FileStack,
		group: "Workspace"
	},
	{
		to: "/documents",
		label: "Document Verification",
		icon: FileCheckCorner,
		group: "Workspace"
	},
	{
		to: "/validation",
		label: "Validation Results",
		icon: ShieldCheck,
		group: "Workspace"
	},
	{
		to: "/rules",
		label: "Regulatory Rules",
		icon: BookOpen,
		group: "Governance"
	},
	{
		to: "/review",
		label: "Manual Review",
		icon: UserCheck,
		group: "Governance"
	},
	{
		to: "/audit",
		label: "Audit Logs",
		icon: ScrollText,
		group: "Governance"
	},
	{
		to: "/reports",
		label: "Reports",
		icon: FileChartColumnIncreasing,
		group: "Governance"
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings,
		group: "Account"
	}
];
function AppShell({ children }) {
	const path = useRouterState({ select: (r) => r.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [isCompact, setIsCompact] = (0, import_react.useState)(false);
	const sidebarRef = (0, import_react.useRef)(null);
	const closeButtonRef = (0, import_react.useRef)(null);
	const menuButtonRef = (0, import_react.useRef)(null);
	const mainRef = (0, import_react.useRef)(null);
	const { officer, apps } = useStore();
	const pending = apps.filter((a) => a.reviewStatus && a.reviewStatus !== "Approved" && a.reviewStatus !== "Rejected").length;
	const initials = officer.replace("Officer ", "").split(/[ .]+/).filter(Boolean).map((p) => p[0]).join("").slice(0, 2);
	(0, import_react.useEffect)(() => {
		const media = window.matchMedia("(max-width: 1023px)");
		const update = () => {
			setIsCompact(media.matches);
			if (!media.matches) {
				setOpen(false);
				if (document.activeElement === closeButtonRef.current || document.activeElement === menuButtonRef.current) mainRef.current?.focus();
			}
		};
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isCompact || !open) return;
		closeButtonRef.current?.focus();
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				setOpen(false);
				menuButtonRef.current?.focus();
				return;
			}
			if (event.key !== "Tab") return;
			const focusable = sidebarRef.current?.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex=\"-1\"])");
			if (!focusable?.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last?.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first?.focus();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isCompact, open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				ref: sidebarRef,
				"aria-label": "Main navigation",
				role: isCompact && open ? "dialog" : void 0,
				"aria-modal": isCompact && open ? true : void 0,
				inert: isCompact && !open,
				className: cn("no-print fixed inset-y-0 left-0 z-40 flex w-[272px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-out lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-sidebar-border px-5 pb-5 pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm shadow-black/15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									className: "h-[21px] w-[21px]",
									strokeWidth: 2.2
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-base font-semibold tracking-tight text-sidebar-accent-foreground",
								children: ["VeriFlow ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-normal text-sidebar-foreground",
									children: "AI"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-sidebar-foreground/65",
								children: "AI Verification Platform"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							ref: closeButtonRef,
							className: "absolute right-4 top-5 rounded-md p-1.5 transition-colors hover:bg-sidebar-accent lg:hidden",
							onClick: () => {
								setOpen(false);
								menuButtonRef.current?.focus();
							},
							"aria-label": "Close menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 overflow-y-auto px-3 py-5",
						children: [
							"Workspace",
							"Governance",
							"Account"
						].map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: group === "Workspace" ? "" : "mt-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-sidebar-foreground/45",
								children: group
							}), nav.map((n) => {
								if (n.group !== group) return null;
								const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: n.to,
									onClick: () => {
										setOpen(false);
										menuButtonRef.current?.focus();
									},
									"aria-current": active ? "page" : void 0,
									className: cn("group relative mb-1 flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors duration-150", active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground shadow-sm shadow-black/10 before:absolute before:inset-y-2 before:left-0 before:w-[3px] before:rounded-full before:bg-sidebar-primary" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, {
											className: cn("h-[17px] w-[17px] shrink-0 transition-colors", active ? "text-sidebar-primary" : "text-sidebar-foreground/65 group-hover:text-sidebar-accent-foreground"),
											strokeWidth: 1.8
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1",
											children: n.label
										}),
										n.to === "/review" && pending > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-md bg-warning/15 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-amber-200",
											children: pending
										})
									]
								}, n.to);
							})]
						}, group))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-sidebar-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 rounded-lg border border-sidebar-border bg-black/10 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-[11px] font-medium text-sidebar-accent-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-300" }), "Demo environment"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-[10px] leading-relaxed text-sidebar-foreground/65",
									children: "Synthetic records · simulated checks only"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => window.dispatchEvent(new Event("veriflow:start-guided-demo")),
									className: "mt-2 inline-flex items-center gap-1.5 rounded px-1 py-1 text-[11px] font-medium text-sidebar-accent-foreground transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										className: "h-3 w-3",
										"aria-hidden": "true"
									}), "Start guided demo"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-lg px-2 py-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-white",
								children: initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs font-medium text-sidebar-accent-foreground",
									children: officer
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-[10px] text-sidebar-foreground/60",
									children: "Review officer"
								})]
							})]
						})]
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "fixed inset-0 z-30 cursor-default bg-slate-950/45 backdrop-blur-[2px] lg:hidden",
				onClick: () => {
					setOpen(false);
					menuButtonRef.current?.focus();
				},
				"aria-label": "Close navigation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col lg:pl-[272px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "no-print sticky top-0 z-20 flex h-[68px] items-center gap-3 border-b bg-card/90 px-4 backdrop-blur-xl lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							ref: menuButtonRef,
							className: "rounded-lg p-2 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden",
							onClick: () => setOpen(true),
							"aria-label": "Open menu",
							"aria-expanded": open,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden text-[13px] text-muted-foreground sm:block",
							children: [
								"Application validation ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-1.5 text-border",
									children: "/"
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground/80",
									children: "Compliance workspace"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => window.dispatchEvent(new Event("veriflow:open-search")),
									className: "hidden h-9 items-center gap-2 rounded-lg border bg-card px-3 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex",
									"aria-label": "Search VeriFlow",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
											className: "h-4 w-4",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
											className: "rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]",
											children: "Ctrl / ⌘ K"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalCommandTrigger, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockAndTheme, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationCenter, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "hidden items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-200 sm:inline-flex sm:text-[11px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-300" }), "Demo mode"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden h-8 w-px bg-border sm:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground",
									children: initials
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-[13px] font-medium text-foreground/85 md:inline",
									children: officer
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					ref: mainRef,
					tabIndex: -1,
					className: "mx-auto w-full max-w-[1680px] flex-1 px-4 py-6 outline-none sm:px-6 lg:px-9 lg:py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "page-enter",
						children
					}, path)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalCommand, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidedDemo, {})
		]
	});
}
function GlobalCommandTrigger() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => window.dispatchEvent(new Event("veriflow:open-search")),
		className: "inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		"aria-label": "Search VeriFlow",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
			className: "h-4 w-4",
			"aria-hidden": "true"
		})
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function applyTheme(theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.documentElement.style.colorScheme = theme;
}
function ThemeProvider({ children }) {
	const [preference, setPreferenceState] = (0, import_react.useState)("system");
	const [systemTheme, setSystemTheme] = (0, import_react.useState)("light");
	const [initialized, setInitialized] = (0, import_react.useState)(false);
	const resolvedTheme = preference === "system" ? systemTheme : preference;
	(0, import_react.useEffect)(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const updateSystemTheme = () => setSystemTheme(media.matches ? "dark" : "light");
		updateSystemTheme();
		media.addEventListener("change", updateSystemTheme);
		try {
			const stored = window.localStorage.getItem(STORAGE_KEY$1);
			if (isThemePreference(stored)) setPreferenceState(stored);
		} catch (error) {
			console.error("Could not read the saved VeriFlow appearance preference.", error);
		}
		const handleStorage = (event) => {
			if (event.key === "veriflow-theme" && isThemePreference(event.newValue)) setPreferenceState(event.newValue);
			else if (event.key === "veriflow-theme" && event.newValue === null) setPreferenceState("system");
		};
		window.addEventListener("storage", handleStorage);
		setInitialized(true);
		return () => {
			media.removeEventListener("change", updateSystemTheme);
			window.removeEventListener("storage", handleStorage);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!initialized) return;
		applyTheme(resolvedTheme);
	}, [initialized, resolvedTheme]);
	const setPreference = (0, import_react.useCallback)((next) => {
		window.localStorage.setItem(STORAGE_KEY$1, next);
		setPreferenceState(next);
	}, []);
	const toggleTheme = (0, import_react.useCallback)(() => {
		setPreference(resolvedTheme === "dark" ? "light" : "dark");
	}, [resolvedTheme, setPreference]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			preference,
			resolvedTheme,
			setPreference,
			toggleTheme
		},
		children
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$5 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "VeriFlow AI — Intelligent Document Validation and Regulatory Compliance" },
			{
				name: "description",
				content: "SIH 2026 prototype for application validation, simulated document checks, and regulatory compliance review."
			},
			{
				property: "og:title",
				content: "VeriFlow AI — Intelligent Document Validation"
			},
			{
				property: "og:description",
				content: "An SIH 2026 prototype for application validation and regulatory compliance review."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: themeInitializationScript } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$5.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})] }) })
	});
}
var $$splitComponentImporter$4 = () => import("./routes-CNvPilzP.mjs");
var Route$4 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Dashboard — VeriFlow AI" },
		{
			name: "description",
			content: "Overview of applications, verified documents and flagged inconsistencies."
		},
		{
			property: "og:title",
			content: "Dashboard — VeriFlow AI"
		},
		{
			property: "og:description",
			content: "Application validation overview dashboard."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./audit-Bf4q9iF3.mjs");
var Route$3 = createFileRoute("/audit")({
	head: () => ({ meta: [
		{ title: "Audit Logs — VeriFlow AI" },
		{
			name: "description",
			content: "Chronological log of actions taken in the prototype."
		},
		{
			property: "og:title",
			content: "Audit Logs — VeriFlow AI"
		},
		{
			property: "og:description",
			content: "Audit trail of demo actions."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./review-BbIBqiay.mjs");
var Route$2 = createFileRoute("/review")({
	head: () => ({ meta: [
		{ title: "Manual Review — VeriFlow AI" },
		{
			name: "description",
			content: "Applications requiring human review with reviewer comments."
		},
		{
			property: "og:title",
			content: "Manual Review — VeriFlow AI"
		},
		{
			property: "og:description",
			content: "Human review queue."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./settings-B_IMircN.mjs");
var Route$1 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Settings — VeriFlow AI" },
		{
			name: "description",
			content: "Demo settings and reset options for the prototype."
		},
		{
			property: "og:title",
			content: "Settings — VeriFlow AI"
		},
		{
			property: "og:description",
			content: "Prototype settings."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./applications.index-CqgRsX_N.mjs");
var Route = createFileRoute("/applications/")({
	head: () => ({ meta: [
		{ title: "Applications — VeriFlow AI" },
		{
			name: "description",
			content: "Search, filter and create applications for validation."
		},
		{
			property: "og:title",
			content: "Applications — VeriFlow AI"
		},
		{
			property: "og:description",
			content: "Searchable application register."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$5
});
var AuditRoute = Route$3.update({
	id: "/audit",
	path: "/audit",
	getParentRoute: () => Route$5
});
var DocumentsRoute = Route$7.update({
	id: "/documents",
	path: "/documents",
	getParentRoute: () => Route$5
});
var ReportsRoute = Route$8.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => Route$5
});
var ReviewRoute = Route$2.update({
	id: "/review",
	path: "/review",
	getParentRoute: () => Route$5
});
var RulesRoute = Route$9.update({
	id: "/rules",
	path: "/rules",
	getParentRoute: () => Route$5
});
var SettingsRoute = Route$1.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$5
});
var ValidationRoute = Route$10.update({
	id: "/validation",
	path: "/validation",
	getParentRoute: () => Route$5
});
var ApplicationsIndexRoute = Route.update({
	id: "/applications/",
	path: "/applications/",
	getParentRoute: () => Route$5
});
var rootRouteChildren = {
	IndexRoute,
	AuditRoute,
	DocumentsRoute,
	ReportsRoute,
	ReviewRoute,
	RulesRoute,
	SettingsRoute,
	ValidationRoute,
	ApplicationsIdRoute: Route$6.update({
		id: "/applications/$id",
		path: "/applications/$id",
		getParentRoute: () => Route$5
	}),
	ApplicationsIndexRoute
};
var routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
