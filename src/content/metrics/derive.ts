import { FUNNEL_ENTRY } from "@/content/metrics/campaign";

/** Every displayed percentage is computed here, never typed as a literal. */

export function spinCompletionRate(): number {
  return FUNNEL_ENTRY.resultViews / FUNNEL_ENTRY.spinCompletions;
}

export function routeCtaRate(): number {
  return FUNNEL_ENTRY.routeCtaClicks / FUNNEL_ENTRY.resultViews;
}

export function rerollRate(): number {
  return FUNNEL_ENTRY.rerolls / FUNNEL_ENTRY.guestbookEntries;
}

export function formatPercent(ratio: number, digits = 1): string {
  return `${(ratio * 100).toFixed(digits)}%`;
}

export function formatInt(n: number): string {
  return n.toLocaleString("en-US");
}
