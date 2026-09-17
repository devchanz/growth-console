import localFont from "next/font/local";

/**
 * Wanted Sans Variable (SIL OFL 1.1) — verified against the actual font file
 * (fontTools cmap inspection) to cover all 11,172 modern Hangul syllables,
 * not a KS X 1001 2,350-character subset. See docs/DECISIONS.md.
 *
 * Not Pretendard: Pretendard is the correct "safe" choice and precisely why
 * it's wrong here — it's the default face of Korean product design in 2026.
 */
export const wantedSans = localFont({
  src: "./fonts/WantedSansVariable.woff2",
  variable: "--font-sans-ko",
  weight: "400 1000",
  display: "swap",
});

/**
 * Commit Mono (SIL OFL 1.1) — chosen over JetBrains Mono (the dev-portfolio
 * default) and Geist Mono (the Next.js default). True tabular figures,
 * unambiguous slashed zero. Static weights only (no variable build
 * published), 400/700 is enough — mono is never used for long-form emphasis.
 */
export const commitMono = localFont({
  src: [
    { path: "./fonts/CommitMono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/CommitMono-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});
