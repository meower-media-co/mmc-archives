import meower from "./index";
import { default as cacheFetch } from "./cacheFetch";
import type CloudlinkClient from "@williamhorning/cloudlink";
import type { PrivateUser } from "./types";

export default async function handleSubmit(
	e: SubmitEvent,
	type: "password" | "register",
	cl: CloudlinkClient,
	user: PrivateUser | null,
	Meower: meower
) {
	let form = new FormData(e.target as HTMLFormElement);
	let resp = await fetch(`${Meower.apiopts.apiBaseUrl}/v1/auth/${type}`, {
		method: "POST",
		body: JSON.stringify({
			username: form.get("username"),
			password: form.get("password"),
			child: false,
		}),
	});
	if (!resp.ok) {
		alert(`Login/Signup failed: ${resp.status} ${resp.statusText}`);
		throw new Error("Signup failed");
	}
	let dat2 = await resp.json();
	let profile: PrivateUser | { error: true; code: Number; message: String } =
		await (
			await cacheFetch(`${Meower.apiopts.apiBaseUrl}/v1/me/profile`, {
				headers: {
					Authorization: `${dat2["access_token"]}`,
				},
			})
		).json();

	if (profile.hasOwnProperty("error")) {
		window.location.reload();
	}
	// @ts-ignore 2339 - types messed up
	if (cl.status == 1) {
		cl.send({
			cmd: "authenticate",
			val: dat2["access_token"],
		});
	} else {
		cl.on("open", () => {
			cl.send({
				cmd: "authenticate",
				val: dat2["access_token"],
			});
		});
	}

	//@ts-ignore
	user.set({
		...profile,
		token: dat2["access_token"] as string,
	});
}
