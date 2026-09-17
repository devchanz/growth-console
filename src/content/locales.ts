/**
 * Single source of the locale set. While this stays `['ko']`, nothing is
 * required to be translated. The day it widens to `['ko', 'en']`,
 * `tsc --noEmit` enumerates every `Localized<T>` value missing an `en` key —
 * that's the entire mechanism, see docs/DECISIONS.md ADR-001/002.
 */
export const LOCALES = ["ko"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ko";

export type Localized<T = string> = Readonly<Record<Locale, T>>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
