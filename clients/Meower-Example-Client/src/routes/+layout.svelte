<script lang="ts">
	import "./styles.css";
	import Topbar from "$lib/Topbar.svelte";
</script>

<div class="app">
	<main>
		<Topbar />
		<slot />
	</main>
</div>

<style>
	.app {
		color: var(--color);

		height: fit-content;
	}

	main {
		position: relative;
	}
	@media (min-width: 1025px) {
		main {
			transform: translate(-50%, 0);
			width: 50%;
			left: 50%;
		}
	}
</style>
