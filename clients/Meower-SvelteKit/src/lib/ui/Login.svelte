<script lang="ts">
	import type {ModeRequestReturn} from "./../cloudlink/cloudlink-types";
	import {getContext, setContext} from "svelte";
	import type {Writable} from "svelte/store";
	import type Cloudlink from "$lib/cloudlink/cloudlink";
	import cacheFetch from "$lib/util/cacheFetch";
	import type {User, CurrentUser} from "$lib/meower-types";

	const cljs: Cloudlink = getContext("cl");
	const user: Writable<CurrentUser | null> = getContext("user");

	let username: string = "";
	let pswd: string = "";

	async function SubmitCallback() {
		const resp: ModeRequestReturn = await cljs.modeRequest(
			{
				cmd: "direct",
				val: {
					cmd: "authpswd",
					val: {
						username: username,
						pswd: pswd
					}
				}
			},
			"auth"
		);

		if (!resp.ok) {
			throw new Error("Login failed");
		}

		const _username = resp.payload.username;
		const _token = resp.payload.token;

		const profile: User | {error: true; type: string} = await (
			await cacheFetch("https://api.meower.org/users/" + _username)
		).json();

		if (profile.error === true) {
			throw new Error(profile.type);
		}

		user.set({
			...profile,
			username: _username,
			token: _token
		});
	}
</script>

<div>
	<form
		on:submit|preventDefault={async () => {
			await SubmitCallback();
		}}
	>
		<input type="text" bind:value={username} />
		<br />
		<input type="password" bind:value={pswd} />
		<br />
		<input type="submit" value="Login" />
	</form>

	or<a href="/register">register</a>
</div>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
	}

	input {
		margin: 0.3rem;
		font-size: 1.2rem;
	}
</style>
