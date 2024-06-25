<script lang="ts">
	import type {CurrentUser, PostJSON} from "../meower-types";
	import PFP from "./PFP.svelte";
	import Container from "$lib/ui/Container.svelte";

	import {getContext} from "svelte";
	import SendPacket from "$lib/components/SendPacket.svelte";
	import cacheFetch from "$lib/util/cacheFetch";
	import type CloudLink from "$lib/cloudlink/cloudlink";
	import type {PostListJSON, PostItem} from "$lib/meower-types";
	import type {PostPacket} from "$lib/cloudlink/cloudlink-types";

	import PagedList from "./PagedList.svelte";
	import type {Item, LoadPageReturn} from "./PagedList.svelte";
	import TimeBox from "./TimeBox.svelte";
	import type {Writable} from "svelte/store";
	import {goto} from "$app/navigation";
	import {apiUrl} from "$lib/urls";
	const cl: CloudLink = getContext("cl");
	const user: Writable<CurrentUser | null> = getContext("user");

	let list: undefined | PagedList;
	export let chat = "home";

	async function loadChatPage(page: number): Promise<LoadPageReturn> {
		if (chat == "livechat") return {numPages: 0, result: []};
		if ($user == null) {
			goto(
				`/login?redirect=${encodeURIComponent(
					window.location.pathname + "?id=" + chat
				)}`
			);
			return {
				numPages: 0,
				result: []
			};
		}

		const resp: PostListJSON = await (
			await cacheFetch(`${apiUrl}posts/${chat}?page=${page}&autoget`, {
				headers: {
					token: `${$user?.token}`,
					username: `${$user?.username}`
				},
				mode: "cors"
			})
		).json();

		const result: Item[] = resp.autoget.map((post) => {
			const orginal = JSON.parse(JSON.stringify(post));
			try {
				if (post.u == "Discord" && post.p.includes(": ")) {
					post.u = post.p.split(": ")[0];
					post.p = post.p.split(": ")[1];
				}
			} catch (e) {
				console.error(e);
			}
			return {
				...post,
				id: post.post_id,
				original: orginal
			};
		});
		return {
			numPages: resp.pages,
			result
		};
	}

	async function loadPage(page: number = 1): Promise<LoadPageReturn> {
		if (chat !== "home") return await loadChatPage(page);

		let numPages = 0;
		let path = `home?page=`;
		const resp = await cacheFetch(
			`https://api.meower.org/${path}${page}&autoget`
		);

		if (!resp.ok) {
			throw new Error("Response code is not OK; code is " + resp.status);
		}
		const json: PostListJSON = await resp.json();
		const result: PostItem[] = json.autoget.map((post) => ({
			...post,
			id: post.post_id,
			original: JSON.parse(JSON.stringify(post))
		}));

		result.forEach((packet: PostJSON) => {
			try {
				if (packet.u == "Discord" && packet.p.includes(": ")) {
					packet.u = packet.p.split(": ")[0];
					packet.p = packet.p.split(": ")[1];
				}
			} catch (e) {
				console.error(e);
			}
		});

		return {
			numPages,
			result
		};
	}

	cl.on("direct", (packet: PostPacket) => {
		if (typeof packet.val == "string") {
			packet.val = JSON.parse(packet.val);
		}

		if (!packet.val.hasOwnProperty("post_origin")) return;
		if (packet.val.post_origin !== chat) return;
		var original = JSON.parse(JSON.stringify(packet.val));

		try {
			if (packet.val.u == "Discord" && packet.val.p.includes(": ")) {
				packet.val.u = packet.val.p.split(": ")[0];
				packet.val.p = packet.val.p.split(": ")[1];
			}
		} catch (e) {
			console.error(e);
		}

		if (list)
			list.addItem({
				...packet.val,
				id: packet.val.post_id,
				original: original
			});
	});
</script>

<div class="layout">
	<SendPacket {chat} />
	<PagedList bind:this={list} {loadPage}>
		<Container slot="item" let:item={post}>
			<div class="post-author">
				<PFP username={post.u} />
				<h2>{post.u}</h2>
			</div>
			<TimeBox date={post.t.e} />
			<p>{post.p}</p>
		</Container>
	</PagedList>
</div>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		gap: 0.5em;

		* {
			width: 100%;
		}
	}
	.post-author {
		display: flex;
		align-items: center;
		gap: 0.25em;
		h2 {
			font-size: 200%;
			margin: 0;
		}
	}
</style>
