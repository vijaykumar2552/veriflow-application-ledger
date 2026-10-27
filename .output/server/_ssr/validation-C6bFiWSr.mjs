import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/validation-C6bFiWSr.js
var $$splitComponentImporter = () => import("./validation-C93-2z34.mjs");
var Route = createFileRoute("/validation")({
	validateSearch: (s) => ({ app: typeof s["app"] === "string" ? s["app"] : void 0 }),
	head: () => ({ meta: [
		{ title: "Validation Results — VeriFlow AI" },
		{
			name: "description",
			content: "Simulated validation checks, findings and recommended actions."
		},
		{
			property: "og:title",
			content: "Validation Results — VeriFlow AI"
		},
		{
			property: "og:description",
			content: "Simulated validation results per application."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
