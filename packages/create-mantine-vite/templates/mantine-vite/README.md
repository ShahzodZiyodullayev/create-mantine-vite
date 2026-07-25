# Mantine Vite Template

Production-ready React + Mantine + Vite starter with FSD architecture, auth flow, TanStack Query, and SEO out of the box.

## Quick start

```bash
npx create-mantine-vite my-app
cd my-app
yarn dev
```

## Features

- **React 19** + **TypeScript 5.8** + **Vite 7**
- **Mantine 8** — core, hooks, form, modals, notifications, emotion
- **Redux Toolkit** — auth state and global error slice
- **TanStack Query 5** — server state with v5 onError pattern
- **React Router 7** — lazy routes + route-level error boundaries
- **FSD architecture** — `app / pages / widgets / features / entities / shared`
- **Axios** — interceptors with `Authorization` header, 401 logout, 10s GET abort signal
- **SEO ready** — React 19 native metadata, `vite-plugin-sitemap`, OG tags, manifest
- **Worked examples** — login flow + users list using `dummyjson.com`

## Project structure

```
src/
├── app/                  # routing, store, providers, layouts
├── pages/                # route components (home, login, users, not-found)
├── widgets/              # composite UI (header, footer, global-error-notification)
├── features/             # business features (auth)
├── entities/             # domain models (user)
└── shared/               # api, lib, model, ui — reusable building blocks
```

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | Start the dev server |
| `yarn build` | Type-check + production build (emits `dist/sitemap.xml`) |
| `yarn preview` | Preview the production build |
| `yarn lint` | Run ESLint |
| `yarn lint:fix` | Run ESLint with auto-fix |
| `yarn format` | Run Prettier |

## Demo credentials

The login form is wired to `dummyjson.com/auth/login`.

```
username: emilys
password: emilyspass
```

## Customize

- Replace `public/og-image.png` (1200×630) with your own.
- Replace `public/favicon.svg` and `public/site.webmanifest` icon.
- Update `<title>`, `<meta>`, and OG tags in `index.html`.
- Set `VITE_BASE_URL` and `VITE_SITE_URL` in `.env` (see `.env.example`).
- Add new routes to `vite.config.ts` `sitemap.dynamicRoutes`.
- Replace `dummyjson.com` calls with your backend API.

## Architecture notes

### Why both Redux and TanStack Query?

- **TanStack Query** owns server state (cache, fetching, invalidation).
- **Redux Toolkit** owns client state that doesn't fit Query's model: auth credentials, the global error slice that bridges Query/axios errors to Mantine notifications.

### Error handling: notification vs ErrorBoundary

Two pathways:

- **Toast (default)** — recoverable errors (validation, transient network glitches). Errors flow `axios → Redux error slice → Mantine notification`.
- **ErrorBoundary** — page-blocking errors (critical fetch fail, render crash). Components opt in:
  ```tsx
  const { data } = useUsers({ throwOnError: true }); // → nearest <ErrorBoundary>
  ```

Three layers of `ErrorBoundary` exist: app-level (`withProviders`), route-level (pathless layout route), and any explicit boundary you add.

### SEO in a SPA

This template targets client-rendered SPAs. Google's JS rendering handles most cases, but:
- The 404 page sets `noindex` but cannot return a real HTTP 404 status (SPAs serve `index.html` for all paths).
- For true SSR, look at Next.js or `vike` (vite-plugin-ssr) — outside this template's scope.

The `vite-plugin-sitemap` and React 19 native metadata together handle the SPA-feasible SEO layer.

## License

MIT — Shahzod Ziyodullayev
