<script lang="ts">
	import {getContext} from "svelte";
	import type CloudLink from "$lib/cloudlink/cloudlink";
	import type {CurrentUser} from "$lib/meower-types";
	import type {Writable} from "svelte/store";
	import PostList from "$lib/components/PostList.svelte";

	const cl: CloudLink = getContext("cl");

	const user: Writable<CurrentUser | null> = getContext("user");

	const urlParams = new URLSearchParams(window.location.search);
</script>

<PostList chat={urlParams.get("id") || "livechat"} />
