<script lang="ts">
	import Login from "$lib/ui/Login.svelte";
	import PopupHome from "$lib/components/PopupHome.svelte";
</script>

<PopupHome title="login">
	<svelte:fragment>
		<Login />
		<!-- signup -->
		or <a href="/register"> Sign up </a>
	</svelte:fragment>
</PopupHome>
