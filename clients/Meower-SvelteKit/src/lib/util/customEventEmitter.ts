// typescript moment

export default class CustomEventEmitter {
	private events: {
		[any: string]: {
			event: string;
			cb: Function;
		};
	} = {};
	private numevents: number = 1;

	constructor() {}

	clearEvents() {
		this.events = {};
		this.numevents = 1;
	}

	on(event: string, cb: Function): any {
		this.numevents++;
		const numevents = (this.numevents - 1).toString();

		this.events[numevents] = {
			event,
			cb
		};
		return numevents;
	}

	/**
	 * Remove an event listener with its ID.
	 */
	off(id: any) {
		if (!this.events[id])
			throw new Error("Tried to remove nonexistent event listener");
		delete this.events[id];
	}

	/**
	 * Listen for an event, then remove it once it fires the first time.
	 *
	 * @param {string} event
	 * @param {function} cb
	 * @returns {any} An event ID that can be used to remove the listener before it fires.
	 */
	once(event: string, cb: Function): any {
		const id = this.on(event, (/** @type {any} */ data: any) => {
			cb(data);
			this.off(id);
		});
		return id;
	}

	/**
	 * Emit an event, with optional data. Pretty self-explanatory.
	 */
	emit(event: string, data?: any) {
		Object.values(this.events).forEach((e) => {
			if (e.event === event) e.cb(data);
		});
	}
}
