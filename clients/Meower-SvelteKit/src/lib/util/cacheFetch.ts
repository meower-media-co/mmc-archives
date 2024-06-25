const cache: {
	[index: string]: Response;
} = {};

/**
 * Create a Response whose .json() and .text() functions can be
 * called multiple times.
 */
function createReusableResponse(resp: Response): Response {
	const ogText = resp.text;

	let cachedText: string | undefined;
	async function getText() {
		if (cachedText !== undefined) return cachedText;
		const text = await ogText.call(resp);
		cachedText = text;
		return text;
	}

	resp.json = async function () {
		return JSON.parse(await getText());
	};
	resp.text = async function () {
		return await getText();
	};

	return resp;
}

export default async function (
	url: string,
	options?: RequestInit
): Promise<Response> {
	if (cache[url]) {
		return cache[url];
	} else {
		const resp = createReusableResponse(await fetch(url, options));
		return (cache[url] = resp);
	}
}
