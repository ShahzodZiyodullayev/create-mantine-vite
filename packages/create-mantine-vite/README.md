<img src="https://raw.githubusercontent.com/ShahzodZiyodullayev/create-mantine-vite/main/assets/hero.png" alt="npx create-mantine-vite — production-ready React starter with Feature-Sliced Design" width="100%">

[![npm](https://img.shields.io/npm/v/create-mantine-vite?color=339af0&labelColor=101418)](https://www.npmjs.com/package/create-mantine-vite)
[![downloads](https://img.shields.io/npm/dm/create-mantine-vite?color=339af0&labelColor=101418)](https://www.npmjs.com/package/create-mantine-vite)
[![node](https://img.shields.io/node/v/create-mantine-vite?color=339af0&labelColor=101418)](https://nodejs.org)
[![license](https://img.shields.io/npm/l/create-mantine-vite?color=339af0&labelColor=101418)](https://github.com/ShahzodZiyodullayev/create-mantine-vite/blob/main/LICENSE)

> 🇺🇿 [O'zbekcha versiyasi](https://github.com/ShahzodZiyodullayev/create-mantine-vite/blob/main/packages/create-mantine-vite/README.uz.md)

Scaffold a React + Mantine + Vite project that already has the parts you would
otherwise spend a day wiring up: auth, server state, routing, error handling,
and SEO.

```bash
npx create-mantine-vite@latest my-app
cd my-app
yarn dev
```

> **This is a scaffolding CLI, not a library.** `npm install create-mantine-vite`
> does nothing useful — use `npx` as shown above.

<img src="https://raw.githubusercontent.com/ShahzodZiyodullayev/create-mantine-vite/main/assets/terminal.png" alt="The CLI prompting for a template and scaffolding a project" width="560">

## What you get

- **React 19** · **TypeScript 5.8** · **Vite 7**
- **Mantine 8** — core, hooks, form, modals, notifications, emotion
- **TanStack Query 5** — server state, caching, invalidation
- **Redux Toolkit** — auth session and the global error slice
- **React Router 7** — lazy routes with route-level error boundaries
- **Axios** — `Authorization` header, 401 logout, GET abort signal
- **SEO** — React 19 native metadata, sitemap generation, OG tags, manifest
- **Working examples** — login flow and a users list against `dummyjson.com`

## Architecture

The template follows [Feature-Sliced Design](https://feature-sliced.design).
Layers may only import downward, which keeps features independent as the app grows.

```
src/
├── app/         routing, store, providers, layouts
├── pages/       route components
├── widgets/     composite UI blocks
├── features/    business features
├── entities/    domain models
└── shared/      api, lib, model, ui
```

Two state libraries are present on purpose: TanStack Query owns server state,
Redux Toolkit owns the client state that does not fit it — the auth session and
the error slice that bridges axios failures to Mantine notifications.

## Options

| Flag | Description |
|---|---|
| `--template=<name>` | Pick a template without the prompt. Currently `mantine-vite`. |
| `--no-install` | Copy the template but skip dependency installation |
| `--use-npm` | Use `npm install` instead of `yarn install` |

```bash
npx create-mantine-vite@latest my-app --template=mantine-vite --use-npm
```

## Requirements

Node.js **18** or newer. Nothing else — the template ships inside this package,
so scaffolding needs neither `git` nor network access, and every CLI version
produces the exact template it was released with.

## License

MIT — Shahzod Ziyodullayev
