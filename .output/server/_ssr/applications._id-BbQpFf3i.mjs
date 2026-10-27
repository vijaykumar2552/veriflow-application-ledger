import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/applications._id-BbQpFf3i.js
var $$splitComponentImporter = () => import("./applications._id-DlbgAc8e.mjs");
var Route = createFileRoute("/applications/$id")({
	head: ({ params }) => ({ meta: [
		{ title: `${params.id} — VeriFlow AI` },
		{
			name: "description",
			content: "Application details, documents and simulated validation summary."
		},
		{
			property: "og:title",
			content: `${params.id} — VeriFlow AI`
		},
		{
			property: "og:description",
			content: "Application detail view."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
