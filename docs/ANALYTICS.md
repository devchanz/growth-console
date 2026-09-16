# Analytics

## Mode

`src/lib/analytics/dispatch.ts` picks one mode at build time from env vars (see ADR-004):

1. `NEXT_PUBLIC_GTM_ID` set → GTM mode (production default)
2. else `NEXT_PUBLIC_GA_MEASUREMENT_ID` set → GA-only mode (rollback lever)
3. neither → off — `trackEvent` still feeds the internal bus (so the LIVE panel works in local
   dev), just never reaches a script

## Event taxonomy

| Event | Params | Fires |
|---|---|---|
| `console_view` | — | Once per tab session (sessionStorage-claimed), on `/[locale]` |
| `locale_switch` | `locale_to` | Language toggle click |
| `kpi_tile_click` | `metric_id, case_slug` | KPI tile drill-down |
| `case_view` | `case_slug, entry` (`kpi\|nav\|direct\|related`) | Case page load |
| `chapter_view` | `case_slug, chapter_id` | IntersectionObserver, once per chapter |
| `chart_view` | `chart_id` | IntersectionObserver, once per chart |
| `chart_pin` | `chart_id, datum_id` | Explicit click/tap on a chart mark — not hover |
| `scroll_depth` | `page_id, depth_bucket` (25\|50\|75\|100) | Threshold crossed |
| `dwell_milestone` | `page_id, seconds_bucket` (15\|30\|60\|180) | Time-on-page threshold, paused while tab hidden |
| `live_panel_toggle` | `state` (`open\|closed`) | LIVE panel expand/collapse |
| `outbound_click` | `destination` (`live_demo\|github\|pdf\|email`), `case_slug?` | External link click |
| `pdf_download` | `variant` | PDF deck link click |
| `contact_click` | `method` (`email\|github`) | Contact link click |

Deliberately excluded: `chart_hover` — fires continuously and would drown the property; `pin`
is the actual intent signal.

Param whitelist (enforced in `dispatch.ts`): `metric_id, case_slug, chapter_id, chart_id,
datum_id, locale_to, entry, depth_bucket, seconds_bucket, page_id, destination, method, state,
variant`. UTM parameters are attached automatically from `sessionStorage`, matching the pattern
in `daejeon-random-trip/src/lib/attribution`.

## GTM container setup (manual, browser)

1. tagmanager.google.com → new **Web** container → note the `GTM-XXXXXXX` ID
2. One **GA4 Configuration** tag, firing on **All Pages**, using the GA4 measurement ID from
   the property created for this site (not the campaign's property)
3. One **Custom Event** trigger per event name above
4. One **Data Layer Variable** per param key in the whitelist
5. GA4 **Event** tags mapping the trigger → its params
6. **Publish the container** — an unpublished container fires nothing in production, and GTM's
   own debug preview can make it look like it's working when it isn't

## Local verification

`NEXT_PUBLIC_ANALYTICS_DEBUG=1` makes the dispatcher also append every event to
`window.__events` and `console.debug` it — this is what `scripts/qa/shoot.py` asserts against
instead of relying on a screenshot.
