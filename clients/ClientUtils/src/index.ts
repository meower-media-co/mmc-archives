import CloudlinkClient from "@williamhorning/cloudlink";
import type { PrivateUser, MeowerOpts } from "./types";

export default class meower {
	#client: CloudlinkClient;
	apiopts: ApiOpts = new ApiOpts();
	options: MeowerOpts;
	user: PrivateUser | null = null;
	constructor(options: MeowerOpts) {
		this.options = options;
		this.#client = new CloudlinkClient({
			url: this.apiopts.cloudlink4Url,
			log: this.options.log,
		});
	}
}

export class ApiOpts {
	constructor() {}
	get cloudlink4Url() {
		return localStorage.getItem("meower_linkurl") || "ws://127.0.0.1:3001";
	}
	set cloudlink4Url(url: string) {
		localStorage.setItem("meower_linkurl", url);
	}
	get apiBaseUrl() {
		return localStorage.getItem("meower_apiurl") || "http://127.0.0.1:3000";
	}
	set apiBaseUrl(url: string) {
		localStorage.setItem("meower_apiurl", url);
	}
}

export function handle32bitdate(dat: number, hour12: boolean = false) {
	let date = new Date(dat * 1000);
	return {
		date,
		timestamp: date.getTime(),
		// @ts-ignore
		text: date.toLocaleString(hour12 ? "en-US" : "en-GB"),
		iso: date.toISOString(),
	};
}

export * as cacheFetch from "./cacheFetch";
export * from "./login";
