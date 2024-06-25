<script lang="ts">
	import {goto} from "$app/navigation";
	import type CloudLink from "$lib/cloudlink/cloudlink";
	import type {ModeRequestReturn} from "$lib/cloudlink/cloudlink-types";
	import PopupHome from "$lib/components/PopupHome.svelte";
	import type {CurrentUser} from "$lib/meower-types";
	import {apiUrl} from "$lib/urls";
	import {getContext} from "svelte";
	import type {Writable} from "svelte/store";
	const cl: CloudLink = getContext("cl");
	const user: Writable<CurrentUser | null> = getContext("user");

	let username = "";
	let pswd = "";
	let agree = false;
	async function RegisterCallback() {
		if (!agree) {
			alert("You must agree to the terms of service!");
		}

		const resp: ModeRequestReturn = await cl.modeRequest(
			{
				cmd: "direct",
				val: {
					cmd: "gen_account",
					val: {
						username: username,
						pswd: pswd
					}
				}
			},
			"auth"
		);

		if (!resp.ok) {
			alert("Signup failed:" + resp.statuscode);
			throw new Error("Signup failed");
		}

		const _username = resp.payload.username;
		const _token = resp.payload.token;

		const profile = await (await fetch(`${apiUrl}/users/${_username}`)).json();

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

<PopupHome title="signup">
	<svelte:fragment slot="content">
		<form
			on:submit={async () => {
				await RegisterCallback();
			}}
		>
			<input type="text" bind:value={username} />
			<br />
			<input type="password" bind:value={pswd} />
			<br />
			<!-- Agree to TOS -->
			<p>
				<input type="checkbox" bind:checked={agree} /> I agree to the
				<a href="https://meower.org/legal">Terms of Service</a>
			</p>
			<br />
			<button type="submit">Sign up</button>
		</form>
	</svelte:fragment>
</PopupHome>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
	}

	input {
		margin: 0.3rem;
		font-size: 1.2rem;
	}

	input[type="checkbox"] {
		display: inline;
		float: left;
	}

	p {
		text-align: center;

		display: block;
	}
</style>
