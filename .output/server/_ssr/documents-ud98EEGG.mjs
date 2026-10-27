import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-ud98EEGG.js
var $$splitComponentImporter = () => import("./documents-DgPQwrWw.mjs");
var Route = createFileRoute("/documents")({
	validateSearch: (s) => ({ app: typeof s["app"] === "string" ? s["app"] : void 0 }),
	head: () => ({ meta: [
		{ title: "Document Verification — VeriFlow AI" },
		{
			name: "description",
			content: "Attach PDF, PNG and JPG documents to applications."
		},
		{
			property: "og:title",
			content: "Document Verification — VeriFlow AI"
		},
		{
			property: "og:description",
			content: "Attach and track application documents."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
