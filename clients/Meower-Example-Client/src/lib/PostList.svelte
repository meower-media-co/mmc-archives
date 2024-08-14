<script lang="ts">
	import { client } from "$lib/stores";
	import { onMount } from "svelte";
	import Send from "../assets/images/Send.svg";
	import { Post as PostWrapper } from "@meower-media/meower/dist/typeWrappers";
	import Post from "./Post.svelte";

	export let loggedin = false;

	let posts: PostWrapper[] = [];
	onMount(async () => {
		loggedin = !(
			$client.user === null || typeof $client.user === "undefined"
		);

		const req = await $client.api.posts.get("home", 1);
		if (req.body.error) {
			console.error(req.body.error);
			return;
		}

		posts = await Promise.all(
			req.body.autoget.map(async post => {
				const wrapper = new PostWrapper(post, $client);
				await wrapper.finish();
				return wrapper;
			})
		);

		$client.on("post", async (post: PostWrapper) => {
			posts.unshift(post);
			posts = posts;
		});
	});
</script>

<div class="PostList">
	<div class="message">
		{#if loggedin}
			<input placeholder="Meow meow?" />
		{:else}
			<input placeholder="You need to login to send messages." disabled />
		{/if}
		<button class="send">
			<img src={Send} alt="Send" />
		</button>
	</div>

	{#each posts as post}
		<Post {post} />
	{/each}
</div>

<style>
	.message {
		display: inline-flex;
		width: 82%;
	}
	.message input {
		width: 90%;
		height: 3em;
		margin-right: 1em;
	}
	.message .send {
		position: relative;
		width: 10%;
		height: 3rem;
	}

	@media (max-width: 600px) {
		.message {
			position: relative;
			width: 95%;
			left: 2%;
		}

		.message .send {
			width: 15%;
			margin-right: 0.5em;
		}

		.message input {
			width: 85%;
		}

		.PostList {
			width: 100%;
		}
	}
</style>
