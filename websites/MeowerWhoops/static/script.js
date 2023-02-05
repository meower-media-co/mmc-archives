window.EventEmitter = class EventEmitter {
	constructor() {
		this.callbacks = {}
	}

	on(event, cb) {
		if (!this.callbacks[event]) this.callbacks[event] = [];
		this.callbacks[event].push(cb)
	}

	emit(event, data) {
		let cbs = this.callbacks[event]
		if (cbs) {
			cbs.forEach(cb => cb(data))
		}
	}
}

class CloudlinkJS {
	constructor(server) {
		var ws = new WebSocket(server);
		var events = new EventEmitter()
		this.events = events
		this.ws = ws

		ws.onopen = function () {
			events.emit('opened');
		};

		ws.onmessage = function (e) {
			let data = JSON.parse(e.data)
			if (data.cmd === 'ds') ws.close();
			events.emit('data', data);
		}

		ws.onclose = function () {
			events.emit('closed');
		};

		ws.onerror = function (e) {
			events.emit('error', e);
		};
	}
	send(data) {
		this.ws.send(JSON.stringify(data))
	}
	on(event, cb) {
		return this.events.on(event, cb);
	}
	disconnect() {
		this.ws.close()
	}
}

export default CloudlinkJS;