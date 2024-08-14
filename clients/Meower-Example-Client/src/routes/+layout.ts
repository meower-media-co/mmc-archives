import { browser } from "$app/environment";

// it so that it gets served as a static asset in production
export const prerender = false;
export const ssr = false;
export const csr = true;

export async function load(_: { params: any }) {
	if (browser) {
		return { isclient: true };
	} else {
		// ssr
		return null;
	}
}
