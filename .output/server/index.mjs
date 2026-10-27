globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"18f-NOccwGCEBv8wqKo+rN43vZgdUqI\"",
		"mtime": "2026-10-27T17:47:57.519Z",
		"size": 399,
		"path": "../public/favicon.svg"
	},
	"/assets/applications.index-B1JfsAdR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103f-NeLpY3pvKjuryPN+SQNSm7NAlmE\"",
		"mtime": "2026-10-27T18:27:21.834Z",
		"size": 4159,
		"path": "../public/assets/applications.index-B1JfsAdR.js"
	},
	"/assets/applications._id-tOaQVNjW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"121d-IWbOyt+ZwoIMqLbbs/H5Yox/orU\"",
		"mtime": "2026-10-27T18:27:21.834Z",
		"size": 4637,
		"path": "../public/assets/applications._id-tOaQVNjW.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-27T16:50:48.388Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/applications._id-B4LNj8Oi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f1-QO/5jb4UPsyooZRdg+bPwVEJzrc\"",
		"mtime": "2026-10-27T18:27:21.834Z",
		"size": 1265,
		"path": "../public/assets/applications._id-B4LNj8Oi.js"
	},
	"/assets/audit-mz3yU7Ds.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a8-FsWwhObQrECvCTDNKQJmQMEmreY\"",
		"mtime": "2026-10-27T18:27:21.834Z",
		"size": 1960,
		"path": "../public/assets/audit-mz3yU7Ds.js"
	},
	"/assets/button-D6_7mtrg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7ae-iwf/FCum3fjXrBlEw+fR81zg32U\"",
		"mtime": "2026-10-27T18:27:21.836Z",
		"size": 1966,
		"path": "../public/assets/button-D6_7mtrg.js"
	},
	"/assets/dist-8OZU9KfN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21d1-vCF/47Qo8vp2vfXbyllTs01VhI4\"",
		"mtime": "2026-10-27T18:27:21.836Z",
		"size": 8657,
		"path": "../public/assets/dist-8OZU9KfN.js"
	},
	"/assets/AppPicker-eDrfcx5H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"231-fovjeSAvWYrP3gPm7yFJzYly+NM\"",
		"mtime": "2026-10-27T18:27:21.809Z",
		"size": 561,
		"path": "../public/assets/AppPicker-eDrfcx5H.js"
	},
	"/assets/dist-DnSZTdCP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c3c-YwDlG8bNAg0IjM7djFuG63/rr1E\"",
		"mtime": "2026-10-27T18:27:21.838Z",
		"size": 3132,
		"path": "../public/assets/dist-DnSZTdCP.js"
	},
	"/assets/dist-D1N262Gf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e5e-+ST7NxMNP67gZl386Qo9kkQSiec\"",
		"mtime": "2026-10-27T18:27:21.838Z",
		"size": 11870,
		"path": "../public/assets/dist-D1N262Gf.js"
	},
	"/assets/dist-DovOKpzy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8306-PO+Ncmb6KTI7+DWl1NeE1gpbFtM\"",
		"mtime": "2026-10-27T18:27:21.838Z",
		"size": 33542,
		"path": "../public/assets/dist-DovOKpzy.js"
	},
	"/assets/documents-1z5lEV6E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"496-wSF/4E22Ss+n95Vs+XyfrHtMURw\"",
		"mtime": "2026-10-27T18:27:21.840Z",
		"size": 1174,
		"path": "../public/assets/documents-1z5lEV6E.js"
	},
	"/assets/dist-eTt46ybZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1467-hV1ZwX6jkpDclj4L3o2kyYKIn6o\"",
		"mtime": "2026-10-27T18:27:21.838Z",
		"size": 5223,
		"path": "../public/assets/dist-eTt46ybZ.js"
	},
	"/assets/dialog-BmxsI0Tz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82b-22YG7U7hjHnGHbHiurmR96v2/O4\"",
		"mtime": "2026-10-27T18:27:21.836Z",
		"size": 2091,
		"path": "../public/assets/dialog-BmxsI0Tz.js"
	},
	"/assets/documents-B-Q9pYJr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1814-94Cee35IRnqMFNRZYj+etZ5iFng\"",
		"mtime": "2026-10-27T18:27:21.841Z",
		"size": 6164,
		"path": "../public/assets/documents-B-Q9pYJr.js"
	},
	"/assets/file-text-D-UVDfE2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"176-PZOwp2iguKPNvXmFaV5myqWY2X0\"",
		"mtime": "2026-10-27T18:27:21.843Z",
		"size": 374,
		"path": "../public/assets/file-text-D-UVDfE2.js"
	},
	"/assets/label-CxiWdgGS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a8-+b47a8aZchSjYGtOBVixnzujEjI\"",
		"mtime": "2026-10-27T18:27:21.844Z",
		"size": 680,
		"path": "../public/assets/label-CxiWdgGS.js"
	},
	"/assets/input-BSqT5IxG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"246-P7h1KlFtVQXh3yfRJk9Oc9JV6wc\"",
		"mtime": "2026-10-27T18:27:21.843Z",
		"size": 582,
		"path": "../public/assets/input-BSqT5IxG.js"
	},
	"/assets/es2015-CHiNkUzH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5acf-6H9oGvexUsVQfDilPWgiWBze/LQ\"",
		"mtime": "2026-10-27T18:27:21.841Z",
		"size": 23247,
		"path": "../public/assets/es2015-CHiNkUzH.js"
	},
	"/assets/link-CNqHU-Uc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c24-RlFfWoHYvRL0gq89awZEParHTr8\"",
		"mtime": "2026-10-27T18:27:21.847Z",
		"size": 11300,
		"path": "../public/assets/link-CNqHU-Uc.js"
	},
	"/assets/NewApplicationDialog-Bk0nQfAm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e04-X9eVdjJyQA2saos3xpyIntJ3P0I\"",
		"mtime": "2026-10-27T18:27:21.832Z",
		"size": 3588,
		"path": "../public/assets/NewApplicationDialog-Bk0nQfAm.js"
	},
	"/assets/preload-helper-CK-A-Fs3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1613-9bKCtW97fGtzs9m/0fnP+rSwC9s\"",
		"mtime": "2026-10-27T18:27:21.849Z",
		"size": 5651,
		"path": "../public/assets/preload-helper-CK-A-Fs3.js"
	},
	"/assets/reports-BY_GcPGk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f6-k9r3hlyNUKvMMprQcXeJ/AzSWeI\"",
		"mtime": "2026-10-27T18:27:21.851Z",
		"size": 1014,
		"path": "../public/assets/reports-BY_GcPGk.js"
	},
	"/assets/index-Dry9L0Tf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c928-RXedANQcTzIxdft7oSrG9md8iag\"",
		"mtime": "2026-10-27T18:27:21.807Z",
		"size": 379176,
		"path": "../public/assets/index-Dry9L0Tf.js"
	},
	"/assets/reports-CsZ3Xr27.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cf8-/zCdOQ5zHSJr9Wc9qjSb7DZ8/Tg\"",
		"mtime": "2026-10-27T18:27:21.853Z",
		"size": 7416,
		"path": "../public/assets/reports-CsZ3Xr27.js"
	},
	"/assets/review-3Vb45mTh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1415-sBv4T+jxvTBYI34JQ/4HSwbP6NE\"",
		"mtime": "2026-10-27T18:27:21.853Z",
		"size": 5141,
		"path": "../public/assets/review-3Vb45mTh.js"
	},
	"/assets/rules-DJAb3ZaF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"269a-QSvPQUra6RlXYYgsfQ6qie876Yo\"",
		"mtime": "2026-10-27T18:27:21.857Z",
		"size": 9882,
		"path": "../public/assets/rules-DJAb3ZaF.js"
	},
	"/assets/rules-qTBCyWoE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b4-VwUiekWpP8Mnv78+y80rARm3JKc\"",
		"mtime": "2026-10-27T18:27:21.858Z",
		"size": 2484,
		"path": "../public/assets/rules-qTBCyWoE.js"
	},
	"/assets/search-CjaWe6OA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3-py48//qTuMC4vpU4+fJIjVUYJ3E\"",
		"mtime": "2026-10-27T18:27:21.859Z",
		"size": 163,
		"path": "../public/assets/search-CjaWe6OA.js"
	},
	"/assets/select--GxU8-xd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c01b-Sc0OlujNb312D1gax/ZVOSN4UZc\"",
		"mtime": "2026-10-27T18:27:21.859Z",
		"size": 49179,
		"path": "../public/assets/select--GxU8-xd.js"
	},
	"/assets/settings-QkwoPOJ1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a18-OdpN0esupzWiAuv5G6Jn0uvubvk\"",
		"mtime": "2026-10-27T18:27:21.861Z",
		"size": 6680,
		"path": "../public/assets/settings-QkwoPOJ1.js"
	},
	"/assets/shared-CMf9ujnG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8e-I/yuhJaMrhy19D28UAR9LcHrQvw\"",
		"mtime": "2026-10-27T18:27:21.861Z",
		"size": 2702,
		"path": "../public/assets/shared-CMf9ujnG.js"
	},
	"/assets/store-B516fgyb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd6-0DfZJGAIZcB1S5L3i7wi2jJl6Bk\"",
		"mtime": "2026-10-27T18:27:21.863Z",
		"size": 7382,
		"path": "../public/assets/store-B516fgyb.js"
	},
	"/assets/shield-check-XZsnicNy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-/PkA+JffyM06pkQnjf5vx6utbMA\"",
		"mtime": "2026-10-27T18:27:21.863Z",
		"size": 309,
		"path": "../public/assets/shield-check-XZsnicNy.js"
	},
	"/assets/table-B7ZCuCMp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68d-vGsSWRifZl59EABqPrXBK9GLGpk\"",
		"mtime": "2026-10-27T18:27:21.865Z",
		"size": 1677,
		"path": "../public/assets/table-B7ZCuCMp.js"
	},
	"/assets/styles-B10JrBzv.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"db8d-VVpttGqPU5HQEW6xramXmaqBfN0\"",
		"mtime": "2026-10-27T18:27:21.883Z",
		"size": 56205,
		"path": "../public/assets/styles-B10JrBzv.css"
	},
	"/assets/textarea-B8BpEDmU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e0-wgKul5kOEjCp/J7DVOSMYiwvUpQ\"",
		"mtime": "2026-10-27T18:27:21.867Z",
		"size": 480,
		"path": "../public/assets/textarea-B8BpEDmU.js"
	},
	"/assets/theme-config-DWyG2iqx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"390-a+KbzcUzzRCTUeT3ZOrsufOjyjg\"",
		"mtime": "2026-10-27T18:27:21.869Z",
		"size": 912,
		"path": "../public/assets/theme-config-DWyG2iqx.js"
	},
	"/assets/routes-BNP-dcTB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62291-VCZ+11zifM4FnSfJ4ypx5aga8o0\"",
		"mtime": "2026-10-27T18:27:21.855Z",
		"size": 402065,
		"path": "../public/assets/routes-BNP-dcTB.js"
	},
	"/assets/triangle-alert-DwvrLq36.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-jvPbdgsPzLNFQjs7XLPih94h+RU\"",
		"mtime": "2026-10-27T18:27:21.871Z",
		"size": 254,
		"path": "../public/assets/triangle-alert-DwvrLq36.js"
	},
	"/assets/useNavigate-DDvI3LZa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9-COm0JFAOW+z7FOI2tZCDdSBOcXM\"",
		"mtime": "2026-10-27T18:27:21.875Z",
		"size": 217,
		"path": "../public/assets/useNavigate-DDvI3LZa.js"
	},
	"/assets/upload-BtnpjCbu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db-sZsoV9nMzwqzVLkg0fa3TtmJavc\"",
		"mtime": "2026-10-27T18:27:21.873Z",
		"size": 219,
		"path": "../public/assets/upload-BtnpjCbu.js"
	},
	"/assets/utils-DD_aFkVP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9353-RbQ1eb9ipTEfQUj1A/mI2N9xf/Q\"",
		"mtime": "2026-10-27T18:27:21.877Z",
		"size": 37715,
		"path": "../public/assets/utils-DD_aFkVP.js"
	},
	"/assets/user-check-BUrUui8p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"324-6dwKrGZLSsj2jhQ6JDItHz5O74c\"",
		"mtime": "2026-10-27T18:27:21.875Z",
		"size": 804,
		"path": "../public/assets/user-check-BUrUui8p.js"
	},
	"/assets/validation-ClW1xTNZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"595-nZGLMExPjDfH9d2KSBI7XwSg4uQ\"",
		"mtime": "2026-10-27T18:27:21.877Z",
		"size": 1429,
		"path": "../public/assets/validation-ClW1xTNZ.js"
	},
	"/assets/validation-CvImi0un.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2451-pIYeXF1DxjtuyIs+SUrvn8nOtXk\"",
		"mtime": "2026-10-27T18:27:21.879Z",
		"size": 9297,
		"path": "../public/assets/validation-CvImi0un.js"
	},
	"/assets/x-B-dgCXVt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-vaI95+MehTXHVPwZNB/CqUY0FN0\"",
		"mtime": "2026-10-27T18:27:21.881Z",
		"size": 143,
		"path": "../public/assets/x-B-dgCXVt.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_JKqNN5 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_JKqNN5
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
