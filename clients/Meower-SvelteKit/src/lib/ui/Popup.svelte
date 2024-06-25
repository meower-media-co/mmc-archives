<script lang="ts">
	export let title: string;
</script>

<div class="popup">
	<div class="popup-internal">
		{#if title}
			<h2>{title}</h2>
		{/if}
		<div class="popup-content">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	h2 {
		color: orange;
		text-align: center;
	}

	.popup-internal {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
	}

	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.popup-content {
		background-color: white;
		padding: 1em;
		border-radius: 0.5em;
		box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.5);
	}
</style>
