// taken from https://github.com/meower-media-co/Meower-Svelte/blob/develop/src/lib/sleep.js

/**
 * @file ZZZzzz...
 */

/**
 * Sleep for a certain amount of milliseconds.
 */
export default function (ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}
