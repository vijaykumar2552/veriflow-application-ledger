import { _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rules-CzrBDrYl.js
var RULES = [
	{
		id: "R-001",
		title: "Mandatory field completeness",
		category: "Data Quality",
		description: "All mandatory form fields must be filled before validation.",
		severity: "Low"
	},
	{
		id: "R-002",
		title: "Reference number format",
		category: "Data Quality",
		description: "Reference number should follow the department's prefix/city/serial format.",
		severity: "Medium"
	},
	{
		id: "R-003",
		title: "Applicant identity proof",
		category: "Identity",
		description: "At least one government-issued identity document must be attached.",
		severity: "High"
	},
	{
		id: "R-004",
		title: "Document set completeness",
		category: "Documents",
		description: "All documents listed for the application type should be present.",
		severity: "Medium"
	},
	{
		id: "R-005",
		title: "Address proof recency",
		category: "Documents",
		description: "Address proof should be dated within the last 3 months.",
		severity: "Medium"
	},
	{
		id: "R-006",
		title: "Name consistency",
		category: "Identity",
		description: "Applicant name should match across the form and all documents.",
		severity: "High"
	},
	{
		id: "R-007",
		title: "Document validity period",
		category: "Documents",
		description: "Certificates and licences must not be expired on the submission date.",
		severity: "High"
	},
	{
		id: "R-008",
		title: "Environmental NOC",
		category: "Compliance",
		description: "Pollution clearance applications should include a local body NOC.",
		severity: "Critical"
	},
	{
		id: "R-009",
		title: "Food handling premises",
		category: "Compliance",
		description: "Food safety applications should declare premises layout and water source.",
		severity: "Medium"
	},
	{
		id: "R-010",
		title: "Signature presence",
		category: "Documents",
		description: "Declarations should bear the applicant's signature.",
		severity: "Low"
	}
];
var $$splitComponentImporter = () => import("./rules-DgmH1aZX.mjs");
var Route = createFileRoute("/rules")({
	validateSearch: (search) => ({ q: typeof search["q"] === "string" ? search["q"] : "" }),
	head: () => ({ meta: [
		{ title: "Regulatory Rules — VeriFlow AI" },
		{
			name: "description",
			content: "Illustrative demo validation rules used by the prototype."
		},
		{
			property: "og:title",
			content: "Regulatory Rules — VeriFlow AI"
		},
		{
			property: "og:description",
			content: "Illustrative demo rule library."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as n, RULES as t };
