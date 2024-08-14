// This is where the stuff that all clients should put their shared data in
import * as mjs from "@meower-media/meower";
import { writable } from "svelte/store";
import type { EventEmitter } from "events";

//@ts-ignore-error: EventEmitter is not defined in the type definitions
export const client = writable<mjs.Client & EventEmitter>(new mjs.Client());

// trying to keep the websocket alive
export const _ws = writable<WebSocket | null>(null);
client.subscribe(value => {
	value.onLogin(() => {
		if (!value.ws) return;
		_ws.set(value.ws.ws);
	});
});
