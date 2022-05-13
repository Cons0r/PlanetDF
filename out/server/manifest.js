export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		entry: {"file":"start-92ebd851.js","js":["start-92ebd851.js","chunks/index-151c6cec.js","chunks/index-3d7e81ac.js"],"css":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "200",
				pattern: /^\/200\/?$/,
				names: [],
				types: [],
				load: () => import('./entries/endpoints/200/index.ts.js')
			},
			{
				type: 'page',
				id: "auth/link",
				pattern: /^\/auth\/link\/?$/,
				names: [],
				types: [],
				path: "/auth/link",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "auth/login",
				pattern: /^\/auth\/login\/?$/,
				names: [],
				types: [],
				path: "/auth/login",
				shadow: () => import('./entries/endpoints/auth/login/index.ts.js'),
				a: [0,4],
				b: [1]
			},
			{
				type: 'page',
				id: "auth/register",
				pattern: /^\/auth\/register\/?$/,
				names: [],
				types: [],
				path: "/auth/register",
				shadow: () => import('./entries/endpoints/auth/register/index.ts.js'),
				a: [0,5],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
