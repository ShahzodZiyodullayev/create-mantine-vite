# create-mantine-vite

Scaffold a production-ready **React + Mantine + Vite** project in one command.

```bash
npx create-mantine-vite@latest my-app
cd my-app
yarn dev
```

> This is a scaffolding CLI, not a library — do not `npm install` it.

## What you get

- **React 19** + **TypeScript 5.8** + **Vite 7**
- **Mantine 8** — core, hooks, form, modals, notifications, emotion
- **Redux Toolkit** — auth state and global error slice
- **TanStack Query 5** — server state with cache and invalidation
- **React Router 7** — lazy routes + route-level error boundaries
- **FSD architecture** — `app / pages / widgets / features / entities / shared`
- **Axios** — interceptors with `Authorization` header, 401 logout, GET abort signal
- **SEO ready** — React 19 native metadata, `vite-plugin-sitemap`, OG tags, manifest
- **Worked examples** — login flow + users list using `dummyjson.com`

## Repository layout

This is a monorepo. The template ships **inside** the published npm package, so
each CLI version always produces the exact template it was released with — and
scaffolding needs neither `git` nor network access.

```
packages/create-mantine-vite/        # the published npm package
├── bin/cli.js                       # the CLI
└── templates/
    └── mantine-vite/                # the starter template itself
```

| Path | Docs |
|---|---|
| `packages/create-mantine-vite` | [CLI usage and flags](./packages/create-mantine-vite/README.md) |
| `packages/create-mantine-vite/templates/mantine-vite` | [Template guide](./packages/create-mantine-vite/templates/mantine-vite/README.md) · [O'zbekcha](./packages/create-mantine-vite/templates/mantine-vite/README.uz.md) |

## Development

```bash
yarn install                 # install workspace dependencies
yarn template:dev            # run the template as a live app
yarn template:build          # type-check + production build
yarn cli:try demo --template=mantine-vite   # scaffold from local source
```

Adding a template: create `packages/create-mantine-vite/templates/<name>/` and
append an entry to the `TEMPLATES` registry in `bin/cli.js`. Store its
`.gitignore` as `_gitignore` — npm consumes a packaged `.gitignore` as ignore
rules and strips it from the tarball; the CLI restores the real name on copy.

## License

MIT — Shahzod Ziyodullayev
