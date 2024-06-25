<script lang="ts">
	import {getContext} from "svelte";
	import type CloudLink from "$lib/cloudlink/cloudlink";
	import type {CurrentUser} from "$lib/meower-types";
	import type {Writable} from "svelte/store";
	import {goto} from "$app/navigation";
	import {onMount} from "svelte";
	import type {Chat, ModeRequestReturn} from "$lib/cloudlink/cloudlink-types";

	const cl: CloudLink = getContext("cl");
	const user: Writable<CurrentUser | null> = getContext("user");
	let chats: Chat[] = [];

	onMount(async () => {
		if (!$user) {
			await goto("/login?redirect=/chats");
		}

		const resp: ModeRequestReturn = await cl.modeRequest(
			{
				cmd: "direct",
				val: {
					cmd: "get_chat_list",
					val: {
						page: 1
					}
				}
			},
			"chats"
		);

		if (!resp.ok) {
			alert("Failed to get chat list:" + resp.statuscode);
			throw new Error("Failed to get chat list");
		}

		chats = resp.payload.all_chats;
	});
</script>

<div class="chat_main_div">
	<a href="/chat?id=livechat">
		<div class="chat_div">
			<div class="chat_name">
				<h3>livechat/h3></h3>
			</div>
		</div>
	</a>
</div>

{#each chats as chat}
	<div class="chat_main_div">
		<a href="/chat?id={chat._id}">
			<div class="chat_div">
				<div class="chat_name">
					<h3>{chat.nickname}</h3>
				</div>
			</div>
		</a>
	</div>
{/each}

<style lang="scss">
	.chat_main_div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.chat_div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		border: 1px solid black;
		border-radius: 10px;
		padding: 10px;
		margin: 10px;
	}

	.chat_name {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
</style>
