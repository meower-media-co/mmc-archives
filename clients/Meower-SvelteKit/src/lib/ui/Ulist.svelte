<script lang="ts">
	import {getContext} from "svelte";
	import type CloudLink from "$lib/cloudlink/cloudlink";
	import type {UlistPacket} from "$lib/cloudlink/cloudlink-types";
	import type {CurrentUser} from "$lib/meower-types";
	import type {Writable} from "svelte/store";

	const cl: CloudLink = getContext("cl");
	var UString: String = "";
	cl.on("ulist", (users: UlistPacket) => {
		UString = users.val.split(";").join(", ").toString();
		UString = UString.substring(0, UString.length - 2);
	});

	const user: Writable<CurrentUser | null> = getContext("user");

	user.subscribe((user) => {
		cl.send({cmd: "direct", val: {cmd: "get_ulist", val: ""}});
	});
</script>

<ulist class="userlist">
	<p style="">
		There are currently {UString.split(", ").length} users online ({UString}).
	</p>
</ulist>

<style lang="scss">
	.userlist {
		margin-bottom: 0.5em;
		text-align: center;
		align-items: center;
		justify-content: center;
	}
</style>
