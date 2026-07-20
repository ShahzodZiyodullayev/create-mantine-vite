<img src="https://raw.githubusercontent.com/ShahzodZiyodullayev/create-mantine-vite/main/assets/hero.png" alt="npx create-mantine-vite" width="100%">

[![npm](https://img.shields.io/npm/v/create-mantine-vite?color=339af0&labelColor=101418)](https://www.npmjs.com/package/create-mantine-vite)
[![downloads](https://img.shields.io/npm/dm/create-mantine-vite?color=339af0&labelColor=101418)](https://www.npmjs.com/package/create-mantine-vite)
[![node](https://img.shields.io/node/v/create-mantine-vite?color=339af0&labelColor=101418)](https://nodejs.org)

> 🇬🇧 [English version](./README.md)

Bitta buyruq bilan **React + Mantine + Vite** loyihasini yarating — FSD arxitekturasi, auth,
TanStack Query va SEO allaqachon sozlangan holda.

## Foydalanish

```bash
npx create-mantine-vite@latest my-app
```

> **`npm install create-mantine-vite` qilmang.** Bu — kutubxona emas, loyiha yaratuvchi CLI.
> Uni dependency sifatida o'rnatish hech narsa bermaydi. Yuqoridagidek `npx` ishlating.

<img src="https://raw.githubusercontent.com/ShahzodZiyodullayev/create-mantine-vite/main/assets/terminal.png" alt="CLI ishlayotgani" width="560">

CLI quyidagilarni bajaradi:

1. Qaysi template kerakligini so'raydi
2. Loyiha nomini so'raydi (yoki argumentdan oladi)
3. Paket ichidagi template'ni `./my-app` papkasiga nusxalaydi
4. `package.json` ichidagi `name` va `version`ni loyihaga moslaydi
5. Paketlarni `yarn` bilan o'rnatadi (ishlamasa `npm`ga o'tadi)

So'ngra:

```bash
cd my-app
yarn dev
```

## Flaglar

| Flag | Tavsif |
|---|---|
| `--no-install` | Template klon qilinadi, paketlar o'rnatilmaydi |
| `--use-npm` | `yarn` o'rniga `npm install` ishlatiladi |

```bash
npx create-mantine-vite@latest my-app --use-npm
npx create-mantine-vite@latest my-app --no-install
```

## Nimalar bor

- **React 19** + **TypeScript 5.8** + **Vite 7**
- **Mantine 8** — core, hooks, form, modals, notifications, emotion
- **Redux Toolkit** — auth state va global error slice
- **TanStack Query 5** — server state boshqaruvi
- **React Router 7** — lazy route'lar + route darajasidagi error boundary
- **FSD arxitektura** — `app / pages / widgets / features / entities / shared`
- **Axios** — `Authorization` header, 401 da logout, GET uchun abort signal
- **SEO tayyor** — React 19 native metadata, `vite-plugin-sitemap`, OG teglar, manifest
- **Ishlaydigan misollar** — `dummyjson.com` asosida login va users ro'yxati

Template bo'yicha to'liq hujjat:
[ShahzodZiyodullayev/create-mantine-vite](https://github.com/ShahzodZiyodullayev/create-mantine-vite/blob/main/README.uz.md)

## Talablar

- Node.js **18** yoki undan yangi

Template paketning o'zi ichida keladi — `git` ham, internet ham shart emas.
Har bir CLI versiyasi doim o'zi bilan chiqarilgan template'ni beradi, ya'ni
`npx create-mantine-vite@1.x` va `@2.x` natijasi takrorlanadigan bo'ladi.

## Litsenziya

MIT — Shahzod Ziyodullayev
