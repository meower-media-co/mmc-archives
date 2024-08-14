// @ts-nocheck

import MarkdownIt from "markdown-it";
import twemoji from "twemoji";
import { IMAGE_HOST_WHITELIST } from "./imageWhitelist";
import MDHighlight from "markdown-it-highlightjs";
import hljs from "highlight.js";

async function addFancyElements(content: string): Promise<{
	html?: string;
	error?: Error;
	youtubeEmbeds?: Array<{
		title: string;
		author: string;
		thumbnail: string;
		id: number;
		url: string;
	}>;
}> {
	// markdown (which has HTML escaping built-in)
	let renderedContent;
	const youtubeEmbeds = [];

	try {
		const md = new MarkdownIt("default", {
			breaks: true,
			linkify: true,
			typographer: true,
		}).use(MDHighlight, { a: hljs.configure });
		md.linkify.add("@", {
			validate: function (text: string | any[], pos: any) {
				const tail: string = text.slice(pos) as string;

				//@ts-ignore
				return tail.match(/[a-zA-Z0-9-_]{1,20}/gs)[0].length;
			},
			normalize: function (match: { url: string }) {
				match.url = "/users/" + match.url.replace(/^@/, "");
			},
		});
		const tokens = md.parse(
			content
				.replaceAll(/\[([^\]]+?): (https:\/\/[^\]]+?)\]/gs, "")
				.replaceAll(/\*\*\*\*/gs, "\\*\\*\\*\\*"),
			{}
		);
		for (const token of tokens) {
			if (token.children) {
				for (const childToken of token.children) {
					if (childToken.type === "image") {
						const srcPos = childToken.attrs.findIndex(
							(attr: string[]) => attr[0] === "src"
						);
						if (
							!IMAGE_HOST_WHITELIST.some((o: string) =>
								childToken.attrs[srcPos][1]
									.toLowerCase()
									.startsWith(o.toLowerCase())
							)
						) {
							childToken.attrs[srcPos][1] = "about:blank";
						}
					}
					if (childToken.type === "link_open") {
						const href = childToken.attrs.find(
							(attr: string[]) => attr[0] === "href"
						)[1];
						const b64href = decodeURIComponent(btoa(href));
						childToken.attrs.push([
							"onclick",
							`return confirmLink('${b64href}')`,
						]);
					}
				}
			}

			renderedContent = md.renderer.render(tokens, md.options);

			// add quote containers to blockquotes (although, quotes are currently broken)
			renderedContent = renderedContent.replaceAll(
				/<blockquote>(.+?)<\/blockquote>/gms,
				'<div class="quote-container"><blockquote>$1</blockquote></div>'
			);

			const youtubeMatches = [
				...new Set(
					content.match(
						/(\<|)(http|https):\/\/(www.youtube.com\/watch\?v=|youtube.com\/watch\?v=|youtu.be\/)(\S{11})(\>|)?/gm
					)
				),
			];
			for (const watchURL of youtubeMatches) {
				if (watchURL.startsWith("<") && watchURL.endsWith(">"))
					continue;
				const response = await (
					await fetch(`https://youtube.com/oembed?url=${watchURL}`)
				).json();
				youtubeEmbeds.push({
					title: response.title,
					author: response.author_name,
					thumbnail: response.thumbnail_url,
					id: youtubeEmbeds.length,
					url: watchURL,
				});
			}
		}
	} catch (e) {
		// this is to stop any possible XSS attacks by bypassing the markdown lib
		// which is responsible for escaping HTML
		console.error(e);
		return { error: e };
	}

	// twemoji
	renderedContent = twemoji.parse(renderedContent, {
		folder: "svg",
		ext: ".svg",
		size: 20,
	});

	return {
		html: renderedContent,
		youtubeEmbeds,
	};
}
// @ts-check

export default async function parseMarkdown(content: string) {
	// Match image syntax
	// ([title: https://url])
	const iterator = content.matchAll(/\[([^\]]+?): (https:\/\/[^\]]+?)\]/gs);
	const images = [];
	while (true) {
		const result = iterator.next();
		if (result.done) break;

		try {
			new URL(result.value[2]);
		} catch (e) {
			continue;
		}

		if (
			IMAGE_HOST_WHITELIST.some((o: string) =>
				result.value[2].toLowerCase().startsWith(o.toLowerCase())
			)
		) {
			images.push({
				title: result.value[1],
				url: result.value[2],
			});

			if (images.length >= 3) break;
		}
	}

	return {
		images,
		...(await addFancyElements(content)),
	};
}
