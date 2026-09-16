<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

- `src/content/*` = copy + data only. No JSX, no formatting logic.
- `src/lib/analytics/*` = event dispatch only. No UI.
- `src/components/charts/*` = presentation only, receives pre-computed geometry as props —
  never imports `d3-*` into a `'use client'` file (see `docs/DECISIONS.md` ADR-003).
- Every number shown on the site must trace back to `src/content/metrics/campaign.ts` +
  `derive.ts`. No literal percentages in JSX. See `docs/CONTENT.md` for the specific
  discrepancies to watch for when porting numbers from source documents.
- Before citing any market/behavioral statistic, check it against
  `C:\Users\user\dev\proposal\UNVERIFIED_CLAIMS.md`.
- No hardcoded hex colors in components — reference `--color-*` tokens only
  (`docs/DECISIONS.md` ADR-006). Re-run the `dataviz` skill's palette validator if any token or
  surface color changes.
- Gate before every commit: `git diff --check` → `pnpm lint` → `pnpm typecheck` → `pnpm build`.
