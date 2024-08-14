/* eslint prefer-const: 0 */
// This is where the stuff that all clients should put their shared data in

export let savedToken = localStorage.getitem("meower:token");
export let savedUsername = localStorage.getitem("meower:username");

export let apiUrl =
	localStorage.getItem("meower:api") || "https://api.meower.org/";
export let wsUrl =
	localStorage.getItem("meower:ws") || "wss://server.meower.org/";
