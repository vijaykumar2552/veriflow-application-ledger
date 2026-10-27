import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as useStore, t as APP_TYPES } from "./store-sypQrs4G.mjs";
import { t as Button } from "./button-Dh8XWZW7.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/NewApplicationDialog-BpfNK7ja.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewApplicationDialog({ trigger }) {
	const { addApp } = useStore();
	const nav = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [f, setF] = (0, import_react.useState)({
		applicant: "",
		type: "",
		reference: "",
		description: ""
	});
	const [err, setErr] = (0, import_react.useState)({});
	const submit = () => {
		const e = {};
		if (f.applicant.trim().length < 3) e.applicant = "Enter at least 3 characters.";
		if (!f.type) e.type = "Select an application type.";
		if (!/^[A-Za-z0-9/-]{5,30}$/.test(f.reference.trim())) e.reference = "5–30 characters: letters, numbers, / or -.";
		if (f.description.trim().length < 10) e.description = "Enter at least 10 characters.";
		setErr(e);
		if (Object.keys(e).length) return;
		const app = addApp({
			applicant: f.applicant.trim(),
			type: f.type,
			reference: f.reference.trim().toUpperCase(),
			description: f.description.trim()
		});
		toast.success(`Application ${app.id} created`);
		setOpen(false);
		setF({
			applicant: "",
			type: "",
			reference: "",
			description: ""
		});
		nav({
			to: "/applications/$id",
			params: { id: app.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: trigger
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New Application" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Saved locally in this browser for demo purposes." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "applicant-name",
							label: "Applicant name",
							error: err.applicant,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "applicant-name",
								"aria-invalid": !!err.applicant,
								"aria-describedby": err.applicant ? "applicant-name-error" : void 0,
								value: f.applicant,
								onChange: (e) => setF({
									...f,
									applicant: e.target.value
								}),
								placeholder: "e.g. Ravi Enterprises"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "application-type",
							label: "Application type",
							error: err.type,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: f.type,
								onValueChange: (v) => setF({
									...f,
									type: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "application-type",
									"aria-invalid": !!err.type,
									"aria-describedby": err.type ? "application-type-error" : void 0,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select type" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: APP_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t,
									children: t
								}, t)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "application-reference",
							label: "Application reference number",
							error: err.reference,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "application-reference",
								"aria-invalid": !!err.reference,
								"aria-describedby": err.reference ? "application-reference-error" : void 0,
								value: f.reference,
								onChange: (e) => setF({
									...f,
									reference: e.target.value
								}),
								placeholder: "e.g. TL/DEL/12345"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "application-description",
							label: "Description",
							error: err.description,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "application-description",
								"aria-invalid": !!err.description,
								"aria-describedby": err.description ? "application-description-error" : void 0,
								rows: 3,
								value: f.description,
								onChange: (e) => setF({
									...f,
									description: e.target.value
								}),
								placeholder: "Brief purpose of the application"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: submit,
					children: "Create Application"
				})] })
			]
		})]
	});
}
function Field({ id, label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: id,
				children: label
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-error`,
				role: "alert",
				className: "text-xs text-destructive",
				children: error
			})
		]
	});
}
//#endregion
export { NewApplicationDialog as t };
