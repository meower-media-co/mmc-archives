// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Config} */
const config = {
	plugins: ["prettier-plugin-svelte"],
	overrides: [
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
			},
		},
	],
	trailingComma: "es5",
	tabWidth: 4,
	useTabs: true,
	quoteProps: "consistent",
	semi: true,
	singleQuote: false,
	arrowParens: "avoid",
};

module.exports = config;
