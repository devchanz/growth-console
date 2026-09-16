# Deploy

No `vercel` or `gh` CLI is installed on this machine — everything below is the
GitHub-dashboard + Vercel-dashboard flow, the same one `daejeon-random-trip` already uses.

## 1. Git identity (once, this repo only)

There is no global `~/.gitconfig` on this machine, so an unset identity makes `git commit`
fail outright:

```bash
cd growth-console
git init -b main
git config user.name  "devchanz"
git config user.email "83643212+devchanz@users.noreply.github.com"
git config core.autocrlf false
```

## 2. GitHub (browser)

github.com/new → owner `devchanz`, name `growth-console`, **Public**, leave README/.gitignore/
license **unchecked** (an initialized remote forces an unrelated-histories merge on first
push).

```bash
git remote add origin https://github.com/devchanz/growth-console.git
git push -u origin main
```

Auth goes through Git Credential Manager's browser popup (already the path used by the
`daejeon-random-trip` repo).

## 3. Vercel (browser)

vercel.com/new → Import Git Repository → `devchanz/growth-console`.

- **Project Name: `devchanz-growth-console`**, not `growth-console` — `*.vercel.app`
  subdomains are unique across all Vercel accounts and `growth-console` is very likely taken;
  Vercel will otherwise hand back a random suffixed URL.
- Framework: Next.js (auto-detected). Root Directory `./`.
- Confirm the build log actually invokes `pnpm` (it reads `packageManager` from
  `package.json`) — if pnpm's release-age gate rejects a package, add a
  `minimumReleaseAgeExclude` entry to `pnpm-workspace.yaml` (daejeon-random-trip hit this
  once), commit, push.

Environment variables (Project → Settings → Environment Variables):

- **Production only:** `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_SITE_URL`
- **Leave Preview unset** for the GTM/GA vars, so preview deployments never pollute the
  property's real data
- `NEXT_PUBLIC_*` values are inlined at **build** time — adding or changing one has no effect
  on an already-running deployment. After any change: Deployments → **⋯** → **Redeploy**.

## 4. GA4 + GTM setup (browser)

1. analytics.google.com → Admin → Create a **new property** for this portfolio site (do not
   reuse the campaign's `daejeon-random-trip` property) → Web data stream for the Vercel URL →
   copy the `G-XXXXXXXXXX` measurement ID
2. Follow `docs/ANALYTICS.md` § GTM container setup
3. Verify with GA4 DebugView and GTM's Tag Assistant preview against the live URL before
   trusting any dashboard number

## 5. Indexing

`src/app/robots.ts` / `src/app/sitemap.ts` gate on `process.env.VERCEL_ENV === 'production'` —
preview deployments must never compete with production in search results.

## Recommended order

Do steps 1–3 on **day one, with the placeholder page**, before writing any real content. That
proves git → push → import → live URL → env var → redeploy end-to-end while there is exactly
one thing that could be wrong. Steps 4–5 can wait until there's a LIVE panel and real pages to
verify against.
