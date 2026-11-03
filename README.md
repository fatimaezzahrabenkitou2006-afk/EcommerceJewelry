# Ecommerce Jewelry

Next.js App Router with TypeScript, Tailwind CSS, and a customizable UI toolkit.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000. On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`.

## UI toolkit

- shadcn/ui with Base UI: 28 components in `src/components/ui`
- Lucide React icons and Simple Icons for social brands
- Motion (`motion/react`) for animation
- React Hook Form, Zod, and Hook Form resolvers for validated forms
- Sonner for toast notifications

Use the installed components for all controls and Lucide for icons. Customize them to suit the store's visual identity. Persistent user preferences are recorded in `AGENTS.md`.

Add another component with `npx shadcn@latest add <component>`.

## Checks

```sh
npm run lint
npx tsc --noEmit
npm run build
```

## Reference homepage

The French homepage recreates `Éclat Joaillerie — Lumière Éternelle.png` as responsive HTML and components. Desktop sections follow the 846 × 1860 reference proportions. Below 600 px, the layout adapts for touch screens.

The 32 photographic assets in `public/images/eclat` are extracted from the supplied reference, preserving the original jewelry and models. Recreate them with `node scripts/extract-reference-assets.mjs`. Their resolution is limited by the supplied screenshot; original source photographs would improve large-screen sharpness.

Search, category browsing, product previews, favorites, the shopping bag, hero slide controls, and FAQ accordions work locally. Newsletter confirmation is a frontend demonstration. Accounts, checkout, newsletter delivery, and legal/service content require production integrations and approved business details.

## Navigation and collections

The header, mobile menu, category cards, gift occasions, and footer link to dedicated App Router pages. Thirty destination definitions in `src/lib/routes.ts` share the original ivory, champagne, gold, and brown visual language. Catalogs support category filters, price sorting, and three display modes: classic grid, spacious grid, and detailed list. Maison, collections, inspiration, and gift pages use distinct editorial layouts. Product selections remain available while navigating between pages through the shared shopping provider.

The homepage carousel uses exactly two reference photographs with changing text. It advances every 10 seconds, blends images over 1.8 seconds, and combines a slow zoom with staggered text entrances. Hover, keyboard focus, and the pause control stop automatic progression; reduced-motion preferences disable automatic movement. Contact forms prepare an email in the visitor’s mail application and do not claim to send messages from a backend.

Run browser checks with `npx playwright test`. Chrome must be installed locally (or set `PLAYWRIGHT_CHROME_PATH` to its executable).
