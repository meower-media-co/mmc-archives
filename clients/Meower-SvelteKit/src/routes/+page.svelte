<script lang="ts">
	import Popup from "./../lib/ui/Popup.svelte";
	import Ulist from "./../lib/ui/Ulist.svelte";
	import welcome from "$lib/images/svelte-welcome.webp";
	import welcome_fallback from "$lib/images/svelte-welcome.png";

	import {onMount} from "svelte";
	import {linkUrl} from "$lib/urls";

	import {getContext} from "svelte";
	import type {Writable} from "svelte/store";

	import type CloudLink from "$lib/cloudlink/cloudlink";
	import type {Packet} from "$lib/cloudlink/cloudlink-types";

	import type {User, CurrentUser} from "$lib/meower-types";
	import PostList from "$lib/components/PostList.svelte";
	import Login from "$lib/ui/Login.svelte";

	const cl: CloudLink = getContext("cl");
	const user: Writable<CurrentUser | null> = getContext("user");

	let UString: String = "";

	cl.on("ulist", (users: any) => {
		UString = users.val.split(";").join(", ").toString();
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Meower SvelteKit" />
</svelte:head>

<div class="header">
	<h1>Home</h1>

	<Ulist />
</div>

<section>
	<PostList />
</section>

<style lang="scss">
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;

		border-color: var(--orange-button);
		border-style: solid;
		margin-bottom: 12px;
	}

	.header * {
		margin: 12px;
	}
</style>
