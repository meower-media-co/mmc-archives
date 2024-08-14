<script lang="ts">
	import type { Post } from "@meower-media/meower/dist/typeWrappers";
	import parseMarkdown from "./parseMarkdown";
	import { onMount } from "svelte";
	type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

	export let post: Post;
	let data: string | UnwrapPromise<ReturnType<typeof parseMarkdown>> =
		post.content;

	onMount(() => {
		(async () => {
			data = await parseMarkdown(post.content);
		})();
	});

	console.log(post);
</script>

<div class="post">
	<div class="top">
		<img
			src={post.user.avatar_url}
			alt={`${post.user.name}'s profile picture"`}
			class="pfp"
		/>
		<h2 class="name">{post.user.name}</h2>
	</div>
	<div class="content">
		{#if typeof data === "string"}
			{data}
		{:else}
			{@html data.html}
		{/if}
	</div>
</div>

<style>
	.post {
		background-color: #2a2a2a !important;

		width: 82%;
		padding: 0.5em;
		text-align: left;
		border-radius: 1rem;
		margin-top: 25px;
	}
	.name {
		font-size: 35px;
		position: relative;
		left: 15px;
		bottom: 30px;
	}
	.pfp {
		width: 65px;
		height: 65px;
		border-radius: 8px;
		box-shadow: 0px 5px 2px 1px var(--hov-accent-color);
	}
	.top {
		width: fit-content;
		position: relative;
		left: 2%;
		display: flex;
		margin-bottom: 0px;
	}
	:global(.content) {
		display: block;

		max-width: 100%;
		overflow-wrap: break-all;
		word-break: break-word;
		font-size: 26px;
		position: relative;
		margin-top: 0px;
	}

	/* .buttons {
        position: relative;
        left: 5px;
        justify-content: 15px;
        background-color: none;
    }

    .buttons > button {
        background: none;
    }

    .buttons > button > img {
        width: 2em;
        height: 2em;
    } */

	@media (max-width: 600px) {
		.post {
			position: relative;
			padding: 0px;
			width: 95%;
			align-self: center;
			left: 2%;
		}

		.content {
			margin: 5px;
			margin-top: 0px;
		}
	}

	:global(.content * code) {
		display: inline-block;
		max-width: 100% !important;
		overflow: scroll;
		padding: 5px;
	}

	:global(.emoji) {
		height: 1em;
		width: 1em;
		vertical-align: -0.1em;
	}

	:global(.content a) {
		color: var(--link-accent-color);
	}
</style>
