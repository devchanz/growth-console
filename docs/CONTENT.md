# Content rules

## Numbers — single source, no literals

All campaign numbers live in `src/content/metrics/campaign.ts`. Every percentage shown on the
site is computed in `src/content/metrics/derive.ts` from raw counts — never typed as a literal
string. This is the only way to guarantee the PDF deck and the web site never silently diverge.

### Verified against `scratch_ga4.txt` — do not restate from memory, re-check the source

- **Funnel starts at 299 (landing entries), not 336.** 336 is the 7-day *total users*, a
  different figure from the first funnel step. The PDF deck's step chain (206 spin → 205
  result → 97 route-CTA → 53 guestbook → 31 reroll) is internally consistent and correct; the
  report's alternate framing (299 → 221 intro → 212 Q1 → 210 Q2 → 205 spin → 203 result → 75
  any-second-action, 36.6%) is a **different, OR-condition, non-sequential** calculation for
  the last stage — the report says so explicitly. Pick one canonical chain per chart and label
  which.
- **Channel sessions (instagram 200, user_share 112, threads 83, kakao_chat 61, youtube 52,
  bootcamp_share 38, direct 31) sum to 577, not 658.** Never render as a 100%-stacked bar;
  show absolute sessions with an explicit "기타/미분류 81" row.
- **Instagram per-creative sums don't reconcile with account totals**, and the report says so
  itself: per-post link clicks sum to 68 vs. the account-level 100; per-post profile visits
  sum to 440 vs. account-level 728. These are different Instagram aggregation units and are
  not directly comparable to each other or to GA4 sessions. State this limitation inline
  wherever the per-creative table appears — do not silently pick one number.

## Claims that must never appear on this site

`C:\Users\user\dev\proposal\UNVERIFIED_CLAIMS.md` is the authoritative kill list from the
original research process. Before writing any copy that cites a market/behavioral statistic,
check it against that file.

- **Never cite:** 정보탐색 평균 9.8시간 / 선택지 10개 초과시 41.3% 위임 선호 / 리롤 이탈률 68%
  감소(토스·배민 사례) / 썸트렌드 '랜덤' 언급량 +65%
- **Direction only, no number:** 선택의 역설(Iyengar & Lepper, 2000) / 가변보상 도파민 효과
- **Safe to cite:** 부킹닷컴 한국인 무계획여행 39%(Z세대 60%/밀레니얼 59%, 2023.12 공식
  뉴스룸) / 대전 당일여행 비중 94% / KTX 서울–대전 최단 52분

Also carry the KQ1 self-correction forward as a strength, not a footnote to hide: the original
targeting rationale (20대 여성 = 커플여행/무계획 선호/SNS 차별화) was **disproven by the
author's own cross-tabulation** of the 2025 국민여행조사 raw microdata (N=52,185); the
replacement rationale (실행률 56.9%, 당일치기 61.6%, 직접계획 99.0%) is the one this site should
use. This is one of the three signature moments — see the design spec.

## Bilingual rule

Korean is authored first and is authoritative. English is a **condensed** version for
recruiter scanning, not a literal translation — an English case-study page may compress two
Korean paragraphs into one. Do not "fix" this by re-expanding English copy to match Korean
length; record here if that changes.

## Contact info exposure

Web site: email + GitHub only. The phone number stays in the PDF deck (submitted directly to
recruiters) and is deliberately excluded from this public, crawlable site.
