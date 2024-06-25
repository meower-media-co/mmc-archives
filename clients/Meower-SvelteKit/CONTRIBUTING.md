# Contributing to Meower SvelteKit

## Branch information

The main branch where development takes place is `develop`. The `main` branch is what you see at https://sveltekit.meower.org, and is merged into for each release.

The Above is currently false, until Meower-SvelteKit 1.0.0 the `develop` branch is production.

Branches are usually named like `username-branch`, where `username` is a short version of your username (like `cst`, `tnix`, et.), and `branch` is the branch name.

## Setting up your development environment

Requirements:

- node.js and npm or some other package manager
- git and some knowledge of it
- Preferably understanding of JavaScript and node.js, among ~~us~~ other things

To clone and run a development server on your machine (that autoupdates when you modify files):

```
git clone https://github.com/meower-media-co/Meower-SvelteKit.git
cd Meower-SvelteKit
npm install
npm run dev
```

(Typically you usually also create a new branch for your work:)

```
git branch person-branch
git checkout person-branch
```

For one-time building:

```
npm run build
```

If your branch is online (not local), it will also be available in built form at `[branchname].meower-sveltekit.pages.dev`. A bot will post a comment about it when creating a PR. (Maybe, not truly set up)
