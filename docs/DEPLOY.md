# Deploy

## Why Cloudflare Pages, not Vercel

Originally planned for Vercel (matching `daejeon-random-trip`'s stack), but the personal
Vercel account's Hobby-plan Fast Data Transfer (100 GB/month, **aggregated across every
project in the account, not per-project**) was already over quota from that project's live
traffic when this repo was ready to deploy. A new project on the same account would share the
same exhausted pool. Cloudflare Pages is a clean, separate account with no shared quota, a
much larger free allotment (no metered bandwidth on Pages, request-based free tier only), and
this site is fully static (see below) so it costs nothing in capability.

No `wrangler` CLI is installed on this machine — deployment uses Cloudflare's GitHub-dashboard
integration, the same "push and it deploys" shape the original Vercel plan used.

## Static export

`next.config.ts` sets `output: "export"`. Every route in `[locale]/` is prerendered via
`generateStaticParams()` + `dynamicParams = false`, so there is no server runtime to lose —
`pnpm build` emits a plain `out/` directory of HTML/CSS/JS.

Consequences worth knowing:
- **No `redirects()`/`rewrites()` in `next.config.ts`** — unsupported under static export.
  The `/` → `/ko` redirect instead lives in `public/_redirects` (Cloudflare Pages reads this
  file natively, same syntax as Netlify): `/ /ko 302`.
- **`images.unoptimized: true`** — no Image Optimization API without a server. Images must be
  pre-sized (Pillow, as used throughout the print-deck work) rather than resized on request.
- Route Handlers (`route.ts`) would need to be fully static if ever added — not currently used.

## 1. Git identity (once, this repo only) — unchanged

There is no global `~/.gitconfig` on this machine:

```bash
cd growth-console
git init -b main
git config user.name  "devchanz"
git config user.email "83643212+devchanz@users.noreply.github.com"
git config core.autocrlf false
```

## 2. GitHub (browser) — unchanged

Already done for this project: `github.com/devchanz/growth-console`, pushed.

## 3. Cloudflare Pages (browser)

dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** →
select `devchanz/growth-console`.

Build settings:
- **Framework preset:** Next.js (Static HTML Export) — or set manually:
- **Build command:** `pnpm build`
- **Build output directory:** `out`
- **Root directory:** `/`
- Node version: set `NODE_VERSION=24.19.0` as a build environment variable, or add a
  `.nvmrc` copy of `.node-version` if Cloudflare's build image doesn't read the latter

The default `<project-name>.pages.dev` subdomain is scoped to the Cloudflare account, so
`growth-console.pages.dev` should be available even though the equivalent Vercel subdomain
likely wasn't.

Environment variables (Pages project → Settings → Environment variables):

- **Production:** `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_SITE_URL`
  (`https://growth-console.pages.dev`, or a custom domain once attached)
- **Leave Preview unset** for the GTM/GA vars, so preview deployments never pollute the
  property's real data
- `NEXT_PUBLIC_*` values are inlined at **build** time — same rule as it would've been on
  Vercel. Changing one requires **retriggering a deployment** (Pages → Deployments → Retry
  deployment, or push an empty commit), not just saving the variable.

## 4. GA4 + GTM setup (browser) — unchanged, host-agnostic

1. analytics.google.com → Admin → Create a **new property** for this portfolio site (do not
   reuse the campaign's `daejeon-random-trip` property) → Web data stream for the Pages URL →
   copy the `G-XXXXXXXXXX` measurement ID
2. Follow `docs/ANALYTICS.md` § GTM container setup
3. Verify with GA4 DebugView and GTM's Tag Assistant preview against the live URL before
   trusting any dashboard number

## 5. Indexing

`src/app/robots.ts` / `src/app/sitemap.ts` must gate on a build-time env var rather than
Vercel's `VERCEL_ENV` (which doesn't exist on Cloudflare) — use
`NEXT_PUBLIC_SITE_ENV=production`, set only on the Pages production environment, never on
preview. Preview deployments must not compete with production in search results.

## Recommended order

Same principle as originally planned: prove the whole chain — GitHub push (done) → Cloudflare
Pages import → live `.pages.dev` URL → one env var → redeploy — with the placeholder page,
before any real content lands. Steps 4–5 can wait until there's a LIVE panel and real pages to
verify against.
