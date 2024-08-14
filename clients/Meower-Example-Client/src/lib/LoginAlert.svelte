<script>
	import { goto } from "$app/navigation";
</script>

<aside class="sidebar">
	<h2>You're not logged in!</h2>
	<button
		on:click={() => {
			goto("/setup");
		}}
		class="redirectbutton">Login</button
	>
	<button class="redirectbutton">Create</button>
	<p>more stuff goes here?</p>
</aside>

<style>
	aside {
		float: right;
		color: var(--accent-color-white);
		text-align: center;
		position: absolute;
		width: 20%;
		left: 90%;
		height: 275px;
		background-color: var(--background-sidebar);
		padding: 1em;
		border-radius: 1em;
	}

	button {
		margin-left: 5px;
		margin-right: 5px;
	}

	@media screen and (max-width: 600px) {
		aside {
			display: none;
		}
	}
</style>
