<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	let isclient = false;

	onMount(() => {
		isclient = true;
		goto("/setup");
	});
</script>

<svelte:head>
	<title>Meower</title>
	<meta name="description" content="Meower media platform" />
</svelte:head>

{#if !isclient}
	Loading...
{:else}
	Still Loading...
{/if}
