# create-mantine-vite

> 🇺🇿 [O'zbekcha versiyasi](./README.uz.md)

Scaffold a production-ready **React + Mantine + Vite** project with FSD architecture, auth flow, TanStack Query, and SEO — in one command.

## Usage

```bash
npx create-mantine-vite@latest my-app
```

> **Do not run `npm install create-mantine-vite`.** This is a scaffolding CLI, not a
> library — installing it as a dependency does nothing. Use `npx` as shown above.

The CLI will:

1. Ask which template to use
2. Ask for a project name (or take it from the argument)
3. Copy the bundled template into `./my-app`
4. Set `name` and `version` in `package.json` for your project
5. Install dependencies with `yarn` (falls back to `npm`)

Then:

```bash
cd my-app
yarn dev
```

## Options

| Flag | Description |
|---|---|
| `--no-install` | Clone the template but skip dependency installation |
| `--use-npm` | Use `npm install` instead of `yarn install` |

```bash
npx create-mantine-vite@latest my-app --use-npm
npx create-mantine-vite@latest my-app --no-install
```

## What you get

- **React 19** + **TypeScript 5.8** + **Vite 7**
- **Mantine 8** — core, hooks, form, modals, notifications, emotion
- **Redux Toolkit** — auth state and global error slice
- **TanStack Query 5** — server state management
- **React Router 7** — lazy routes + route-level error boundaries
- **FSD architecture** — `app / pages / widgets / features / entities / shared`
- **Axios** — interceptors with `Authorization` header, 401 logout, GET abort signal
- **SEO ready** — React 19 native metadata, `vite-plugin-sitemap`, OG tags, manifest
- **Worked examples** — login flow + users list using `dummyjson.com`

Full template documentation:
[ShahzodZiyodullayev/create-mantine-vite](https://github.com/ShahzodZiyodullayev/create-mantine-vite#readme)

## Requirements

- Node.js **18** or newer

The template ships inside this package, so scaffolding needs no `git` and no
network access. Each CLI version always produces the exact template it was
released with — `npx create-mantine-vite@1.x` and `@2.x` are reproducible.

## License

MIT — Shahzod Ziyodullayev
