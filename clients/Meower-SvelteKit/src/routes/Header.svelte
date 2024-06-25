<script lang="ts">
	import {linkUrl} from "$lib/urls";
	import type {User} from "$lib/meower-types";
	import {page} from "$app/stores"; // Do we need the page store?
	import logo from "$lib/images/svelte-logo.svg";
	import github from "$lib/images/github.svg";
	import type CloudLink from "$lib/cloudlink/cloudlink";

	import {getContext} from "svelte";
	import type {Writable} from "svelte/store";

	var user: Writable<User | null> = getContext("user");
	const cl: CloudLink = getContext("cl");

	function logout() {
		user.set(null);
		cl.disconnect();
		cl.connect(linkUrl);
	}
</script>

<header>
	<div class="corner">
		<nav>
			<ul>
				<li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
					<a href="/">Home</a>
				</li>
				{#if $user}
					<li
						aria-current={$page.url.pathname === "/chats" ? "page" : undefined}
					>
						<a href="/chats">Chats</a>
					</li>
				{/if}
				<li aria-current={$page.url.pathname === "/about" ? "page" : undefined}>
					<a href="/changelog">ChangeLog</a>
				</li>

				{#if !$user}
					<li
						aria-current={$page.url.pathname === "/login" ? "page" : undefined}
						class="side-right"
					>
						<a href="/login?redirect=/">Login</a>
					</li>
				{:else}
					<li class="side-right">
						<a
							href="/"
							on:click|preventDefault={function () {
								logout();
								return 0;
							}}>Logout</a
						>
					</li>
				{/if}
			</ul>
		</nav>
	</div>
</header>

<style lang="scss">
	header {
		background: var(--orange-button);
		color: var(--white);
		padding: 1rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		margin-left: 1rem;
	}

	li {
		display: inline-block;
		margin-right: 1em;
	}

	.side-right {
		float: right;
	}

	a {
		color: #fff;
		text-decoration: none;
	}
</style>
