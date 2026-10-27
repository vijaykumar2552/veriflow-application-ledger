import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-CzX3_uuA.js
var $$splitComponentImporter = () => import("./reports-k02X1RXF.mjs");
var Route = createFileRoute("/reports")({
	validateSearch: (s) => ({ app: typeof s["app"] === "string" ? s["app"] : void 0 }),
	head: () => ({ meta: [
		{ title: "Reports — VeriFlow AI" },
		{
			name: "description",
			content: "Printable validation report for an application."
		},
		{
			property: "og:title",
			content: "Reports — VeriFlow AI"
		},
		{
			property: "og:description",
			content: "Printable validation reports."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
