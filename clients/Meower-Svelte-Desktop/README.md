# Meower Svelte Desktop

A desktop version of Meower [Svelte](https://svelte.dev) made with [Tauri](https://tauri.app).

Please do not commit directly to the desktop branch! Only commit to desktop-dev and create a new pull request whenever there's a new version of Meower Svelte or when there's a high-priority bug fix.

## Developing

Requirements:
- node.js and npm or some other package manager
- git (optional, for cloning the repo)
- Preferably understanding of JavaScript, node.js, and Tauri, among ~~us~~ other things

To clone and run a development server on your machine (that autoupdates when you modify files):

```
git clone -b desktop https://github.com/meower-media-co/Meower-Svelte-Desktop
cd Meower-Svelte-Desktop
npm install
npm run tauri dev
```

For one-time building:

```
npm run tauri build
```

(Note: A GitHub Action will usually do this for you when you push to the repo.)

------

Relevant bit of information from the original readme:

> ## Recommended IDE Setup
> [VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).
