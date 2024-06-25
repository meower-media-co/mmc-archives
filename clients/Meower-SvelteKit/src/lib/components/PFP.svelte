<script lang="ts">
	import Loading from "$lib/ui/Loading.svelte";
	import {apiUrl} from "$lib/urls";
	import type {User} from "$lib/meower-types";
	import {onMount} from "svelte";
	import cacheFetch from "$lib/util/cacheFetch";

	const icons: {
		[index: string]: {default: string};
	} = import.meta.glob("../../assets/avatars/*", {eager: true});

	export let username: string = "";

	// get the user's pfp
	async function getPFPNum(): Promise<String> {
		const res: Response = await cacheFetch(`${apiUrl}/users/${username}`);
		if (!res.ok) return "err";

		const data: User = await res.json();
		return (data.pfp_data - 1).toString();
	}
</script>

<!-- SVG Image from /static/avatars/ -->
{#await getPFPNum()}
	<Loading />
{:then pfp}
	<img
		src={icons[`../../assets/avatars/icon_${pfp}.svg`]?.default ||
			icons[`../../assets/avatars/icon_err.svg`].default}
		alt="{username}'s profile picture"
		width="50px"
	/>
{/await}

<!-- Does it work now? -->
