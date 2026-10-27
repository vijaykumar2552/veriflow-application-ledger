import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { c as useStore } from "./store-sypQrs4G.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppPicker-VXKomcJA.js
var import_jsx_runtime = require_jsx_runtime();
function AppPicker({ value, onChange, filter }) {
	const { apps } = useStore();
	const list = filter ? apps.filter((a) => filter(a.status)) : apps;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: onChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
			className: "w-full sm:w-96",
			"aria-label": "Select an application",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select an application" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: list.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
			value: a.id,
			children: [
				a.id,
				" — ",
				a.applicant
			]
		}, a.id)) })]
	});
}
//#endregion
export { AppPicker as t };
