import type { Localized } from "@/content/locales";

/**
 * Every number the console home's KPI grid shows, verified against
 * `scratch_ga4.txt` directly (see docs/CONTENT.md for the specific
 * discrepancies already caught: the funnel starts at 299, not 336; channel
 * sessions sum to 577, not 658). This file holds raw counts only — no
 * prose, no computed percentages. See derive.ts for the math.
 *
 * This is a first, partial slice (console home only) — the full funnel,
 * channel, and creative tables land with the case-study content migration.
 */

export interface Provenance {
  readonly source: "ga4";
  readonly property: string;
  readonly window: string;
  readonly definition: Localized;
}

export const CONSOLE_PROVENANCE: Provenance = {
  source: "ga4",
  property: "daejeon-random-trip.vercel.app",
  window: "2026-09-04~2026-09-10",
  definition: {
    ko: "무료 채널 홍보 집행 기간(7일) GA4 실측치. 이 포트폴리오 사이트가 아니라 캠페인 사이트의 데이터.",
  },
};

export const CAMPAIGN_TOTALS = {
  users: 336,
  sessions: 658,
  newUsers: 331,
} as const;

export const FUNNEL_ENTRY = {
  // 첫 퍼널 단계는 299(랜딩 진입) — 336은 기간 전체 총사용자수이지 퍼널 1단계가 아니다.
  landingEntries: 299,
  spinCompletions: 206,
  resultViews: 205,
  routeCtaClicks: 97,
  guestbookEntries: 53,
  rerolls: 31,
} as const;

export const SHARE_LOOP_CHANNEL = {
  name: "user_share",
  sessions: 112,
  users: 58,
  rankBySessions: 2,
  topChannelName: "instagram",
  topChannelSessions: 200,
} as const;

export const CHALLENGE_RESULT = {
  rank: 2,
  totalTeams: 6,
} as const;

export const CREATIVE_DECOUPLING_HEADLINE = {
  reachLeaderName: "타슈",
  reachLeaderViews: 9218,
  reachLeaderClickConversion: 0.0023,
  convLeaderName: "초대짱",
  convLeaderViews: 210,
  convLeaderClickConversion: 0.0429,
} as const;
