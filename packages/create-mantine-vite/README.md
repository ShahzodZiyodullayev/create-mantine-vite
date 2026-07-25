<img src="https://raw.githubusercontent.com/ShahzodZiyodullayev/create-mantine-vite/main/assets/hero.png" alt="npx create-mantine-vite — production-ready React starter with Feature-Sliced Design" width="100%">

[![npm](https://img.shields.io/npm/v/create-mantine-vite?color=339af0&labelColor=101418)](https://www.npmjs.com/package/create-mantine-vite)
[![downloads](https://img.shields.io/npm/dm/create-mantine-vite?color=339af0&labelColor=101418)](https://www.npmjs.com/package/create-mantine-vite)
[![node](https://img.shields.io/node/v/create-mantine-vite?color=339af0&labelColor=101418)](https://nodejs.org)
[![license](https://img.shields.io/npm/l/create-mantine-vite?color=339af0&labelColor=101418)](https://github.com/ShahzodZiyodullayev/create-mantine-vite/blob/main/LICENSE)

Start a React app with the boring parts already done — auth, server state,
routing, error handling and SEO are wired together and working before you write
a line of code.

```bash
npx create-mantine-vite@latest my-app
cd my-app
yarn dev
```

Open `http://localhost:5173` and you have a running app with a real login page.

> **This is a scaffolding CLI, not a library.** `npm install create-mantine-vite`
> adds nothing to your project — always run it with `npx`, as above.

<img src="https://raw.githubusercontent.com/ShahzodZiyodullayev/create-mantine-vite/main/assets/terminal.png" alt="The CLI prompting for a template, copying it, and installing dependencies" width="560">

## What you get

| Area | What is already wired up |
|---|---|
| **Core** | React 19 · TypeScript 5.8 · Vite 7 |
| **UI** | Mantine 8 — core, hooks, form, modals, notifications, emotion · Font Awesome 6 |
| **Server state** | TanStack Query 5 — caching, invalidation, loading and error states |
| **Client state** | Redux Toolkit 2 — auth session and a global error slice |
| **Routing** | React Router 7 — lazy routes with route-level error boundaries |
| **HTTP** | Axios — `Authorization` header, 401 → logout, abort signal on GET |
| **SEO** | React 19 native metadata, sitemap generation, OG tags, web manifest |
| **Tooling** | ESLint 9 + Prettier, `@/*` path alias, SVG-as-component, bundle visualizer |
| **Examples** | A login flow and a users list, both running against a live API |

Not a starting point you have to finish — a working app you delete from.

## Usage

Pass a project name, or run it bare and answer the prompts:

```bash
npx create-mantine-vite@latest              # asks for template and name
npx create-mantine-vite@latest my-app       # asks for template only
```

| Option | Description |
|---|---|
| `<project-name>` | Directory to create. Also becomes `name` in the generated `package.json`. |
| `--template=<name>` | Skip the template prompt. Currently `mantine-vite`. |
| `--no-install` | Copy the files but skip installing dependencies. |
| `--use-npm` | Install with `npm` instead of `yarn`. |

```bash
npx create-mantine-vite@latest my-app --template=mantine-vite --use-npm
```

Worth knowing:

- Dependencies install with **yarn**, falling back to **npm** automatically if
  yarn is missing or fails.
- If the target directory already exists and is not empty, the CLI asks before
  it deletes anything.
- Your `package.json` starts at `version: 0.1.0` with the template's `private`
  flag removed.

## First run

The example pages talk to [dummyjson.com](https://dummyjson.com), a free public
API, so the login flow works immediately:

```
username: emilys
password: emilyspass
```

To point the app at your own backend, copy `.env.example` to `.env`:

```ini
VITE_BASE_URL=https://api.your-domain.com   # axios baseURL
VITE_SITE_URL=https://your-domain.com       # used by the sitemap at build time
```

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | Dev server with HMR |
| `yarn build` | Type-check, then production build — also emits `dist/sitemap.xml` |
| `yarn preview` | Serve the production build locally |
| `yarn lint` · `yarn lint:fix` | ESLint |
| `yarn format` | Prettier |

## Architecture

The template follows [Feature-Sliced Design](https://feature-sliced.design):
layers may only import downward, which is what stops features from tangling
into each other as the app grows.

```
src/
├── app/         routing, store, providers, layouts
├── pages/       home · login · users · not-found
├── widgets/     header · footer · global-error-notification
├── features/    auth
├── entities/    user
└── shared/      api · lib · model · ui
```

Two state libraries ship together on purpose, with a clear split. TanStack
Query owns anything that lives on the server. Redux Toolkit owns the client
state that does not belong in a query cache: the auth session, and the error
slice that turns an axios interceptor failure into a Mantine notification.
Need only one of them? Delete the other — the boundary is a single provider
in `src/app/providers`.

## Requirements

Node.js **18** or newer. Nothing else. The template ships inside this package,
so scaffolding needs neither `git` nor network access, and every CLI version
produces exactly the template it was released with.

## Contributing

Bugs, template ideas and pull requests are all welcome:

- [Open an issue](https://github.com/ShahzodZiyodullayev/create-mantine-vite/issues)
- [Browse the source](https://github.com/ShahzodZiyodullayev/create-mantine-vite)

## License

MIT © Shahzod Ziyodullayev
