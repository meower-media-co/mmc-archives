<!--
	Formatted date display with hover text.
	Mostly taken straight from Appel Level Database.
-->
<script lang="ts">
	// 32-bit UTC time (1 is 1 second instead of 1 millisecond)
	export let date: number = 0;
	let text: string = "if you see this, then something went very wrong";
	let title: string = "";
	$: {
		const _date = new Date(date * 1000);
		text = _date.toLocaleString();
		title = `Time is in your local timezone (UTC+${-(
			_date.getTimezoneOffset() / 60
		)}).
12-hour time: ${_date.toLocaleString([], {hourCycle: "h11"})}
24-hour time: ${_date.toLocaleString([], {hourCycle: "h23"})}
ISO: ${_date.toISOString()}`;
	}
</script>

<span {title} class="date">
	{text}
</span>

<style>
	.date {
		font-style: italic;
		cursor: help;
	}
</style>
