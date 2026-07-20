# Mantine Vite Template

> 🇬🇧 [English version](./README.md)

FSD arxitekturasi, auth oqimi, TanStack Query va SEO bilan ishga tayyor React + Mantine + Vite shabloni.

## Tezda boshlash

```bash
npx create-mantine-vite my-app
cd my-app
yarn dev
```

## Imkoniyatlar

- **React 19** + **TypeScript 5.8** + **Vite 7**
- **Mantine 8** — core, hooks, form, modals, notifications, emotion
- **Redux Toolkit** — auth holati va global error slice
- **TanStack Query 5** — server state, v5 onError patterni
- **React Router 7** — lazy route'lar + route-level error boundary
- **FSD arxitektura** — `app / pages / widgets / features / entities / shared`
- **Axios** — `Authorization` header, 401 logout, 10s GET abort signal interceptor'lari
- **SEO tayyor** — React 19 native metadata, `vite-plugin-sitemap`, OG teglar, manifest
- **Ishlab chiqilgan misollar** — `dummyjson.com` orqali login oqimi va users ro'yxati

## Loyiha tuzilmasi

```
src/
├── app/                  # routing, store, providers, layoutlar
├── pages/                # sahifa komponentlari (home, login, users, not-found)
├── widgets/              # kompozit UI (header, footer, global-error-notification)
├── features/             # biznes feature'lar (auth)
├── entities/             # domen modellari (user)
└── shared/               # api, lib, model, ui — qayta ishlatiluvchi qismlar
```

## Skriptlar

| Buyruq | Tavsif |
|---|---|
| `yarn dev` | Dev serverni ishga tushirish |
| `yarn build` | Type-check + production build (`dist/sitemap.xml` chiqaradi) |
| `yarn preview` | Production build'ni preview qilish |
| `yarn lint` | ESLint'ni ishga tushirish |
| `yarn lint:fix` | ESLint auto-fix bilan |
| `yarn format` | Prettier'ni ishga tushirish |

## Demo ma'lumotlar

Login forma `dummyjson.com/auth/login`'ga ulangan.

```
username: emilys
password: emilyspass
```

## Moslash

- `public/og-image.png` (1200×630) ni o'zingiznikiga almashtiring.
- `public/favicon.svg` va `public/site.webmanifest` icon'larni almashtiring.
- `index.html`'dagi `<title>`, `<meta>` va OG teglarni yangilang.
- `.env` ichida `VITE_BASE_URL` va `VITE_SITE_URL` ni o'rnating (`.env.example`'ga qarang).
- Yangi route'larni `vite.config.ts`'da `sitemap.dynamicRoutes`'ga qo'shing.
- `dummyjson.com` chaqiriqlarini o'zingizning backend API'ngiz bilan almashtiring.

## Arxitektura izohlari

### Nega Redux va TanStack Query birga?

- **TanStack Query** server state'ni boshqaradi (kesh, fetch, invalidatsiya).
- **Redux Toolkit** Query modelida joylashmaydigan client state'ni boshqaradi: auth ma'lumotlari, Query/axios xatolarini Mantine notification'ga ulaydigan global error slice.

### Xatolarni qayta ishlash: notification yoki ErrorBoundary

Ikki yo'l:

- **Toast (default)** — qayta urinish mumkin xatolar (validatsiya, vaqtinchalik network glitch). `axios → Redux error slice → Mantine notification` orqali oqadi.
- **ErrorBoundary** — sahifani bloklash darajasidagi xatolar (kritik fetch fail, render crash). Komponentlar ixtiyoriy ravishda yoqadi:
  ```tsx
  const { data } = useUsers({ throwOnError: true }); // → eng yaqin <ErrorBoundary>
  ```

`ErrorBoundary` uchta qatlamda: app-level (`withProviders`), route-level (pathless layout route) va siz qo'shgan har qanday explicit boundary.

### SPA'da SEO

Bu shablon client-rendered SPA uchun. Google'ning JS render'i ko'p holatlarda ishlaydi, lekin:
- 404 sahifasi `noindex` belgisi qo'yadi, lekin haqiqiy HTTP 404 status qaytara olmaydi (SPA barcha yo'llar uchun `index.html` beradi).
- Real SSR uchun Next.js yoki `vike` (vite-plugin-ssr) — bu shablon ko'lamidan tashqarida.

`vite-plugin-sitemap` va React 19 native metadata birgalikda SPA uchun mumkin bo'lgan SEO darajasini ta'minlaydi.

## Litsenziya

MIT — Shahzod Ziyodullayev
