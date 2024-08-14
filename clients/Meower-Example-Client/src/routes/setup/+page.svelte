<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import type * as mjs from "@meower-media/meower";
	import type { EventEmitter } from "events";
	import { goto } from "$app/navigation";

	let client = writable<mjs.Client & EventEmitter>(undefined);

	// Upon login set the user and stuff and go to home
	let isClient = false;
	let username = "";
	let pswd = "";
	let loginText: string = "";
	let loginStatus: string = "";

	onMount(() => {
		isClient = true;

		(async () => {
			(await import("../../lib/stores")).client.subscribe(c => {
				client.set(c);
			});
			const err = (e: Error) => {
				loginText = e.message;
				loginStatus = e.message.split("Failed to login: ")[1];
			};
			const login = () => {
				loginText = "Logged in!";
				loginStatus = "ok";
				$client.off(".error", err);
				goto("/app");
			};
			$client.on("login", login);
			$client.on(".error", err);
		})();
	});

	function login() {
		loginText = "Logging in..";
		$client.login(username, pswd);
	}

	function skip() {
		loginText = "Continuing without logging in...";
		$client.login("", "");
	}
</script>

<svelte:head>
	<title>Meower - Login</title>
	<meta name="description" content="A social media platform" />
</svelte:head>

{#if isClient && loginStatus != "ok"}
	<div class="login">
		<h1>Meower</h1>
		<form>
			<input
				type="text"
				placeholder="Username"
				bind:value={username}
				class="textinput"
			/>
			<input
				type="password"
				placeholder="Password"
				bind:value={pswd}
				class="textinput"
			/>
			<button on:click={login}>Log in</button>
		</form>

		<button on:click={skip} class="skip"> Skip </button>

		{#if loginText !== null}
			<p>{loginText}</p>
		{/if}
		<small>Meower Example client.</small>
	</div>
{:else if !isClient}
	Loading Page...
{/if}

<style>
	.login {
		display: flex;
		flex-direction: column;
		margin-left: auto;
		margin-right: auto;
		max-width: 500px;
	}
	.skip {
		width: 62px;
		margin-top: 15px;
	}

	button,
	input {
		border: none;
		border-radius: 5px;
		outline: none;
		font-family: Roboto;
		font-weight: 600;
		padding: 1em;
	}

	button {
		background-color: var(--accent-color);
		color: var(--color);
	}
</style>
