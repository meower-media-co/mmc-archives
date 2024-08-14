<script lang="ts">
	import LoginAlert from "$lib/LoginAlert.svelte";
	import PostList from "$lib/PostList.svelte";

	let loggedin = false;
</script>

<!-- <img src={NotImplemented} width="75%" alt="Placeholder"> -->

<svelte:head>
	<title>Meower - App</title>
	<meta name="description" content="A social media platform" />
</svelte:head>

<div class="home">
	{#if !loggedin}
		<LoginAlert />
	{/if}

	<PostList {loggedin} />
</div>
