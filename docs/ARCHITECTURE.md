# Architecture

## Routing

`src/app/[locale]/...` — the App Router has no built-in i18n; `[locale]` is a plain dynamic
segment (`ko` first, `en` later), `layout.tsx` inside it is the **root** layout and owns
`<html lang>`. `generateStaticParams()` + `dynamicParams = false` prerenders every locale.
`/` redirects to `/ko` (307, not permanent — see `docs/DECISIONS.md`).

Routes:
- `/[locale]` — console home (KPI grid, decoupling plot, case index)
- `/[locale]/case/[slug]` — case study detail (`daejeon` is a 5-chapter flagship; the other
  three are single-chapter)
- `/[locale]/privacy`

## Content model

`src/content/` — typed TypeScript modules, not MDX/JSON (rationale in DECISIONS.md).

- `locales.ts` — `LOCALES` tuple + the `Localized<T>` type that makes the compiler enumerate
  missing translations when a locale is added
- `profile.ts`, `ui.ts` — identity + UI chrome strings
- `metrics/campaign.ts` — the one place raw GA4 numbers live, each with a `provenance` record
  (source/window/definition); `metrics/derive.ts` computes every displayed percentage
- `cases/*.ts` — one module per case study; `CaseBlock` is a discriminated union
  (`prose | bullets | apsr | chart | steps | figure | callout`) so narrative and charts
  interleave in one ordered array

Source of truth for porting: `C:\Users\user\dev\proposal\포트폴리오\portfolio-data.js` and
`scratch_ga4.txt` (see CONTENT.md for the numbers that need care).

## Charts

`src/components/charts/` — hand-rolled SVG, not a charting library (rationale in
DECISIONS.md). Each chart is a Server Component (`geometry.ts` runs `d3-scale`/`d3-shape` at
build time and emits static SVG) wrapped by a thin `'use client'` `ChartInteraction` that
receives already-computed pixel coordinates — d3 itself never ships to the browser.

## Analytics

`src/lib/analytics/` — `events.ts` (name/param whitelist), `dispatch.ts` (branches on
GTM/GA/off — see DECISIONS.md for why this branch has to exist), `index.ts`. The LIVE panel
(`src/components/live/`) subscribes to the same internal event bus, independent of whether a
GTM/GA script is present, so it keeps working with ad-blockers or declined consent.

## Design tokens

`src/app/globals.css` — Tailwind 4 CSS-first config, `@theme inline` mapping `:root` values.
No `tailwind.config.js`. Full token rationale in `docs/DECISIONS.md` and the design spec this
project was built from.
