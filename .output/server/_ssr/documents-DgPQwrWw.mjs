import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as fmtDateTime, c as useStore, n as DOC_TYPES, o as fmtSize } from "./store-sypQrs4G.mjs";
import { t as Button } from "./button-Dh8XWZW7.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as FileText, i as Upload, o as Trash2, t as X } from "../_libs/lucide-react.mjs";
import { a as StatusBadge, i as Panel, n as EmptyState, r as PageHeader, t as DemoNotice } from "./shared-BGGDkcGC.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-ClxrR_VU.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./documents-ud98EEGG.mjs";
import { t as AppPicker } from "./AppPicker-VXKomcJA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-DgPQwrWw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACCEPT = [
	"application/pdf",
	"image/png",
	"image/jpeg"
];
var FILE_TYPES = {
	pdf: "application/pdf",
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg"
};
var MAX = 10485760;
function Documents() {
	const { app } = Route.useSearch();
	const nav = useNavigate({ from: "/documents" });
	const { docs, addDocs, setDocType, removeDoc } = useStore();
	const appId = app ?? "";
	const input = (0, import_react.useRef)(null);
	const [staged, setStaged] = (0, import_react.useState)([]);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const pick = (files) => {
		if (!files) return;
		const ok = [];
		Array.from(files).forEach((f) => {
			const expectedType = FILE_TYPES[f.name.split(".").pop()?.toLowerCase() ?? ""];
			if (!expectedType || f.type !== "" && (!ACCEPT.includes(f.type) || f.type !== expectedType)) toast.error(`${f.name}: only PDF, PNG or JPG allowed`);
			else if (f.size > MAX) toast.error(`${f.name}: exceeds 10 MB`);
			else ok.push({
				file: f,
				docType: "Other"
			});
		});
		setStaged((s) => [...s, ...ok]);
		if (input.current) input.current.value = "";
	};
	const dropFiles = (event) => {
		event.preventDefault();
		setDragging(false);
		pick(event.dataTransfer.files);
	};
	const attach = () => {
		if (!appId) {
			toast.error("Select an application first");
			return;
		}
		addDocs(appId, staged.map((s) => ({
			name: s.file.name,
			size: s.file.size,
			docType: s.docType
		})));
		toast.success(`${staged.length} document(s) attached to ${appId}`);
		setStaged([]);
	};
	const list = appId ? docs.filter((d) => d.appId === appId) : docs;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Document Verification",
			subtitle: "Attach supporting documents to an application."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "Only the file name, size and type are recorded. File contents are not read, extracted or forensically authenticated in this prototype." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Attach Documents",
				className: "xl:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: "Application"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppPicker, {
								value: appId,
								onChange: (v) => nav({ search: { app: v } })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => input.current?.click(),
							onDragEnter: (event) => {
								event.preventDefault();
								setDragging(true);
							},
							onDragOver: (event) => event.preventDefault(),
							onDragLeave: (event) => {
								const nextTarget = event.relatedTarget;
								if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) setDragging(false);
							},
							onDrop: dropFiles,
							"aria-label": "Choose or drop PDF, PNG, or JPG documents",
							className: `flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-10 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${dragging ? "border-primary bg-accent" : "border-input bg-muted/50"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-7 w-7 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground",
									children: dragging ? "Drop files to add them" : "Drop files here or browse"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PDF, PNG or JPG · up to 10 MB each · multiple allowed" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: input,
							type: "file",
							multiple: true,
							accept: ".pdf,.png,.jpg,.jpeg",
							className: "hidden",
							onChange: (e) => pick(e.target.files)
						}),
						staged.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2",
							children: staged.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex flex-wrap items-center gap-2 rounded-md border p-2.5 sm:flex-nowrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "truncate text-sm font-medium",
											children: s.file.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											children: fmtSize(s.file.size)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: s.docType,
										onValueChange: (v) => setStaged((st) => st.map((x, j) => j === i ? {
											...x,
											docType: v
										} : x)),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "h-8 w-full text-xs sm:w-40",
											"aria-label": `Document type for ${s.file.name}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DOC_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: t,
											children: t
										}, t)) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setStaged((st) => st.filter((_, j) => j !== i)),
										"aria-label": `Remove ${s.file.name}`,
										className: "rounded p-1 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4 text-muted-foreground" })
									})
								]
							}, `${s.file.name}-${s.file.size}-${i}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full",
							disabled: !staged.length || !appId,
							onClick: attach,
							children: [
								"Attach ",
								staged.length || "",
								" Document",
								staged.length === 1 ? "" : "s"
							]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: appId ? `Documents for ${appId}` : "All Documents",
				className: "xl:col-span-3",
				children: list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { text: "No documents attached yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "pl-5",
						children: "File"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Application" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Document Type" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: list.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "pl-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium",
							children: d.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								fmtSize(d.size),
								" · ",
								fmtDateTime(d.uploaded)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-mono text-xs",
						children: d.appId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: d.docType,
						onValueChange: (v) => setDocType(d.id, v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-8 w-44 text-xs",
							"aria-label": `Document type for ${d.name}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DOC_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: t,
							children: t
						}, t)) })]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: d.status }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "pr-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							onClick: () => removeDoc(d.id),
							"aria-label": "Remove document",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					})
				] }, d.id)) })] })
			})]
		})
	] });
}
//#endregion
export { Documents as component };
