// taken from https://github.com/meower-media-co/Meower-Svelte/blob/develop/src/lib/cloudlink.js
// ts or js? we may never know
// yeah, if it has the types built in
// also, can i replace this with my modified version with some extra features and types?
// (though the types are jsdoc, but i can probably make it into ts)
// gotta fix everything

/**
 * @file A JavaScript client for CloudLink (Turbo) servers.
 */

// @todo cl4

/**
 * @license
 * Parts of this file are Copyright (c) 2021-2022 William Horning
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import CustomEventEmitter from "../util/customEventEmitter";
import sleep from "../util/sleep";
import {apiUrl} from "../urls";
import type {
	Packet,
	ListenerPacket,
	ModePacket,
	SendListenerReturn,
	ModeRequestReturn,
	Options
} from "./cloudlink-types";

export default class CloudLink extends CustomEventEmitter {
	ip: string | null = null;
	logging: boolean = true;

	autoReconnect: boolean = true;
	private reconnectTimeout: number = 5000;
	private reconnectBackoff: number = 1;

	private intentionalDisconnect: boolean = false;

	ws: WebSocket | null = null;

	/**
	 * The URL the client last connected to.
	 */
	serverUrl: null | string | URL = null;

	/**
	 * Check if the client is connected or not.
	 */
	get connected(): boolean {
		return !!(this.ws && this.ws.readyState === WebSocket.OPEN);
	}

	constructor(
		options: Options = {
			logging: true,
			connect: undefined
		}
	) {
		super();

		this.logging = options?.logging ?? true;
		if (options?.connect) {
			this.connect(options.connect);
		}
	}

	/**
	 * Internal special formatted console function.
	 */
	_console(type: "log" | "warn" | "error", label: string, ...values: any[]) {
		if (!this.logging) return;

		const actualLog = "%o".repeat(values.length);

		if (globalThis.document) {
			console[type](
				`%cCLJS%c${label}%c ${actualLog}`,
				"background:#0fbd8c;color:white;font-weight:bold;border-radius:4px 0 0 4px;padding:0 3px;display:inline-block",
				"background:#000;color:white;font-weight:bold;border-radius:0 4px 4px 0;padding:0 3px;display:inline-block",
				"",
				...values
			);
		} else {
			console[type](`[CLJS | ${label}]`, ...values);
		}
	}
	/**
	 * Special formatted console log function.
	 */
	log(label: string, ...values: any[]) {
		this._console.apply(this, ["log", label, ...values]);
	}
	/**
	 * Special formatted console warn function.
	 */
	warn(label: string, ...values: any[]) {
		this._console.apply(this, ["warn", label, ...values]);
	}
	/**
	 * Special formatted console error function.
	 */
	error(label: string, ...values: any[]) {
		this._console.apply(this, ["error", label, ...values]);
	}

	/**
	 * Disconnects if the client is already connected, then connects to a server.
	 */
	connect(server: string | URL): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
					this.log("connection", "already connected, disconnecting...");
					this.intentionalDisconnect = true;
					this.disconnect(1000);
				}

				this.serverUrl = server;
				this.ws = new WebSocket(server);
				this.emit("connectionstart");
				this.ws.addEventListener("message", (socketdata) => {
					const data = JSON.parse(socketdata.data.toString());

					const logData = JSON.parse(socketdata.data.toString());
					// Censor token
					if (logData.val && logData.val.payload && logData.val.payload.token) {
						logData.val.payload.token = "[redacted]";
					}
					this.log("< incoming", logData);

					this.emit("packet", data);
					this.emit(data.cmd, data);
					if (data.listener) {
						this.emit("__listener_" + data.listener, data);
					}
				});
				this.ws.addEventListener("close", (e) => {
					this.log(
						"connection",
						"disconnected with code ",
						e.code,
						" and reason",
						e.reason
					);
					this.emit("disconnect", e);
					this.handleDisconnect();
				});
				this.ws.addEventListener("error", (e) => {
					this.error("connection", "error:", e);
					this.emit("error", e);
					this.handleDisconnect();
				});
				this.ws.addEventListener("open", async () => {
					try {
						this.log("connection", "connected to websockets");

						const _ip = globalThis.localStorage
							? globalThis.localStorage.getItem("meower_ip")
							: null;
						if (_ip || _ip === "") {
							this.ip = _ip;
						} else {
							this.ip = await (await fetch(apiUrl + "ip")).text();
						}

						this.send({
							cmd: "direct",
							val: {
								cmd: "ip",
								val: this.ip
							}
						});

						await sleep(100);

						this.send({
							cmd: "direct",
							val: {cmd: "type", val: "js"}
						});

						let req;
						try {
							req = await this.sendRequest({
								cmd: "direct",
								val: "meower",
								listener: "send_tkey"
							});
							if (!req.ok) throw req.statuscode;
							const pingInterval = setInterval(() => {
								this.send({
									cmd: "ping",
									val: ""
								});
							}, 10000);

							if (this.ws)
								this.ws.addEventListener("close", () => {
									clearInterval(pingInterval);
								});
							resolve();
							this.log("connection", "successfully connected");
						} catch (e) {
							this.error("connection", "error connecting; error:", e);
							reject(e);
						}
						this.emit("connected");
						this.handleConnect();
					} catch (e) {
						this.error("connection", "error connecting:", e);
						this.disconnect();
						reject(e);
					}
				});
			} catch (e) {
				reject(e);
			}
		});
	}

	/**
	 * Runs when the client has connected.
	 */
	handleConnect() {
		this.reconnectBackoff = 1;
	}

	/**
	 * Runs when the client has disconnected or ran into an error connecting.
	 */
	handleDisconnect(e?: Error) {
		if (this.intentionalDisconnect || !this.autoReconnect) {
			this.emit("disconnected", e);
			return;
		}

		// Reconnect
		if (this.reconnectTimeout > 0) {
			this.reconnectBackoff += 1;
			if (this.reconnectBackoff > 3) {
				this.error("Could not reconnect");
				this.emit("disconnected", e);
				return;
			}
			this.emit("reconnecting");
			setTimeout(() => {
				if (this.serverUrl) this.connect(this.serverUrl);
			}, this.reconnectTimeout * this.reconnectBackoff);
		}
	}

	/**
	 * Send a packet through the link.
	 *
	 * @param {object} data
	 *
	 * @param {string} data.cmd
	 * @param {string | object} data.val
	 * @param {string} [data.listener]
	 */
	send(data: any) {
		if (!this.connected) {
			// throw new Error("Not connected; use link.connect(server) to connect");
			this.warn("warn", "not connected");
			return;
		}

		const logData = structuredClone(data);
		// Censor password and IP
		if (logData.val && logData.val.val && logData.val.val.pswd) {
			logData.val.val.pswd = "[redacted]";
		}
		if (logData.val && logData.val.cmd && logData.val.cmd === "ip") {
			logData.val.val = "[redacted]";
		}
		this.log("> outgoing", logData);

		// @ts-ignore
		this.ws.send(JSON.stringify(data));
	}

	/**
	 * Listen for packets with specific listeners.
	 */
	onListener(listener: string, cb: Function): any {
		return this.on("__listener_" + listener, cb);
	}

	/**
	 * Send a packet through the link with a required
	 * listener, and wait for a response.
	 */
	sendListener(data: ListenerPacket): Promise<SendListenerReturn> {
		return new Promise((resolve, reject) => {
			this.send(data);

			let packets: Packet[] = [];
			let returnVal: SendListenerReturn = {
				packets,
				statuscode: null,
				ok: false
			};

			const timer = setTimeout(() => {
				returnVal.ok = false;
				returnVal.statuscode = "E:099 | Timed out";
				resolve(returnVal);
			}, 10000);
			const ev = this.on("__listener_" + data.listener, (cmd: Packet) => {
				if (cmd.cmd === "statuscode") {
					returnVal.statuscode = cmd.val.toString();
					returnVal.ok = returnVal.statuscode === "I:100 | OK";

					this.off(ev);
					clearTimeout(timer);

					resolve(returnVal);
				} else if (cmd.cmd === "direct") {
					packets.push(cmd);
				}
			});
		});
	}

	/**
	 * Send a packet through the link,
	 * and wait for a response.
	 */
	sendRequest(data: Packet): Promise<SendListenerReturn> {
		return this.sendListener({
			...data,
			listener: Date.now() + "_" + Math.random()
		});
	}

	/**
	 * Send a packet through the link,
	 * and wait for packets with a `val.mode`.
	 */
	async modeRequest(data: Packet, mode: string): Promise<ModeRequestReturn> {
		let payload: Object | undefined;

		const ev = this.on("packet", (packet: ModePacket) => {
			if (packet?.val?.mode !== mode) return;
			payload = packet.val.payload;
		});
		const resp = await this.sendRequest(data);
		this.off(ev);

		if (!payload) throw new Error("Could not get response");

		return {
			payload,
			statuscode: resp.statuscode,
			ok: resp.ok
		};
	}

	/**
	 * Disconnect from the server.
	 */
	disconnect(code?: number, reason?: string) {
		if (!this.connected || !this.ws) {
			return;
		}
		this.intentionalDisconnect = true;
		this.ws.close(code, reason);
	}
}
