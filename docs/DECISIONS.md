# Decisions

Format: decision, then why, then what it rules out. Add new ADRs at the bottom.

## ADR-001 — Content as typed TS modules, not MDX or JSON

MDX would add a second toolchain (`@next/mdx` + remark/rehype) for ~8 A4-pages worth of copy
across 4 cases, gives zero type-checking on chart props embedded in prose, and doubles the
bilingual-drift problem (nothing flags an `en` MDX file that's fallen behind `ko`). JSON has no
compile-time safety and no discriminated unions. Typed TS modules, imported by Server
Components, let `Localized<T> = Record<Locale, T>` force the compiler to enumerate every
missing translation the moment `LOCALES` is widened — and only the rendered locale's strings
ever reach the RSC payload.

## ADR-002 — `[locale]` dynamic segment, not middleware negotiation, not a client toggle

The App Router has no built-in i18n (`next.config`'s `i18n` key is Pages-Router-only and is
silently ignored under `app/`). A client-side language toggle over one bundle means no
shareable `/en` URL, a wrong `<html lang>` for one language always, and both locales' strings
in every payload. Accept-Language auto-redirect middleware breaks shared links (a recruiter
forwards a `/ko` link to an English-speaking colleague and they land on `/en` instead of what
was sent) and adds a proxy hop to every request — deliberately not used. `/` does redirect to
`/ko`, but with a **307**, not 308: a permanent redirect would be cached by browsers
indefinitely and trap the choice of default locale.

## ADR-003 — Charts are hand-rolled SVG, not a charting library

Five bespoke charts (two — funnel, slope — don't exist as stock chart types anyway) over tiny
fixed datasets don't amortize a library. More decisively: Chart.js is canvas (nothing in the
HTML, invisible to crawlers/screen readers, blank until JS runs) and Recharts'
`ResponsiveContainer` measures the DOM so it renders nothing server-side — a visible chart
pop-in on a site whose entire premise is "this is a measurement instrument" is a self-inflicted
wound. Only `d3-scale`/`d3-shape`/`d3-array` are used, for geometry math at build time, in a
Server Component; the client-side half receives pre-computed pixel coordinates and handles
pointer interaction only.

## ADR-004 — GTM is the analytics mode; the GA-only fallback has a known event-drop bug

Verified against `@next/third-parties`' `google/ga.js`: `<GoogleAnalytics>` defines
`gtag(){ dataLayer.push(arguments) }`, and `gtag.js` only interprets pushes shaped like an
`arguments` object. A plain `dataLayer.push({event: 'x', ...})` — the shape every custom event
in this codebase uses — is silently ignored in GA-only mode. `src/lib/analytics/dispatch.ts`
therefore branches explicitly: GTM mode pushes the plain object (GTM's own listener handles
it correctly), GA mode calls `sendGAEvent('event', name, params)` instead. GTM is the intended
production path; GA-only exists purely as a deploy-time rollback lever (unset one env var,
redeploy) and both are exercised in Playwright QA (`scripts/qa/shoot.py`) so this doesn't
regress silently a second time.

## ADR-005 — No PII, ever; the LIVE panel reads only what the visitor can already see

Carried over from the daejeon-random-trip project's own privacy stance. No free text fields
feed analytics. The LIVE telemetry panel (dwell time, scroll depth, events fired) reads a
client-side event bus and `performance`/`IntersectionObserver` APIs only — no IP, geolocation,
referrer, or UA string is ever surfaced, and nothing it computes is sent anywhere beyond the
same GTM events already firing for everyone. If `navigator.doNotTrack`/GPC is set, it renders
collapsed and muted rather than tracking anyway and just hiding the UI.

## ADR-006 — Chart colors reference CSS custom properties only, never literal hex in components

The data palette (`--color-series-1..5`) and every UI accent are validated with the `dataviz`
skill's `scripts/validate_palette.js` against the exact surface colors this project renders on
(`#F4F3EC` light, `#101210` dark) — not the skill's own defaults. Any chart or component that
hardcodes a hex bypasses that validation invisibly the next time a surface token changes.
Re-run the validator whenever any hex in the palette or either surface changes.
