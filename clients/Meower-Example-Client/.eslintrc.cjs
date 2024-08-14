module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:svelte/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: {
					// Specify a parser for each lang.
					ts: "@typescript-eslint/parser",
					js: "espree",
					typescript: "@typescript-eslint/parser",
				},
			},
		},
		{
			files: ["*.ts"],
			parser: "@typescript-eslint/parser",
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"svelte/no-at-html-tags": "off",
		// blocks while (true) { ... } loops
		"no-constant-condition": "off",
		// regex stuff i dont understand, and catches <a />
		"no-useless-escape": "off",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_",
			},
		],
		// empty catch blocks are fine
		"no-empty": "off",

		// spaces for minor indentation, tabs for major indentation
		"no-mixed-spaces-and-tabs": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/ban-types": 1,
		"@typescript-eslint/ban-ts-comment": "off",
	},
	ignorePatterns: ["dist/", "node_modules/", ".husky/", "scripts/*"],
};
