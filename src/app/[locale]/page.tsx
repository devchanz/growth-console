import {
  CAMPAIGN_TOTALS,
  CHALLENGE_RESULT,
  CONSOLE_PROVENANCE,
  SHARE_LOOP_CHANNEL,
} from "@/content/metrics/campaign";
import { formatInt, formatPercent, spinCompletionRate } from "@/content/metrics/derive";

const NAV_ITEMS = [
  { n: "01", label: "CONSOLE" },
  { n: "02", label: "CASES" },
  { n: "03", label: "STACK" },
  { n: "04", label: "CONTACT" },
];

function KpiTile({
  eyebrow,
  value,
  label,
  source,
}: {
  eyebrow: string;
  value: string;
  label: string;
  source: string;
}) {
  return (
    <div className="flex flex-col gap-3 border border-rule-1 p-6 pb-4">
      <div className="mono-meta">{eyebrow}</div>
      <div className="num text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] tracking-[-0.04em] text-ink-1">
        {value}
      </div>
      <div className="text-[0.9375rem] leading-snug text-ink-2 prose-ko">{label}</div>
      <div className="mono-meta mt-2 normal-case">{source}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div data-plane="console" className="min-h-screen bg-paper text-ink-1">
      {/* -------------------------------------------------------------- */}
      {/* Nav — a status bar, not a header */}
      {/* -------------------------------------------------------------- */}
      <nav className="sticky top-0 z-10 flex h-11 items-center justify-between border-b border-rule-1 bg-surface-1 px-6 mono-meta">
        <span className="text-ink-1 normal-case tracking-normal">
          김찬주 <span className="text-ink-3">· PERFORMANCE · GROWTH</span>
        </span>
        <div className="hidden gap-6 sm:flex">
          {NAV_ITEMS.map((item) => (
            <span key={item.n}>
              {item.n} {item.label}
            </span>
          ))}
        </div>
        <span className="text-signal">KO</span>
      </nav>

      {/* -------------------------------------------------------------- */}
      {/* Identity plate */}
      {/* -------------------------------------------------------------- */}
      <section className="graph-paper border-b border-rule-1 px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-[var(--page-max)] grid-cols-1 gap-10 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <h1 className="prose-ko text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.14] tracking-[-0.03em] text-ink-1">
              측정할 수 없으면
              <br />
              개선할 수 없다
            </h1>
            <p className="prose-ko mt-6 max-w-[var(--measure-ko)] text-[1.125rem] leading-[1.8] text-ink-2">
              트래킹을 직접 심는 퍼포먼스/그로스 마케터 김찬주입니다. GTM 이벤트 설계부터 GA4 풀트래킹,
              Data Studio 대시보드 구축까지 — 이 사이트도 그 방식 그대로 계측되고 있습니다.
            </p>
          </div>
          <div className="sm:col-span-5 sm:justify-self-end">
            <div className="mono-meta mb-2">SYSTEM STATUS</div>
            <dl className="border border-rule-1 divide-y divide-rule-1 text-[0.8125rem]">
              {[
                ["SOURCE", CONSOLE_PROVENANCE.property],
                ["WINDOW", CONSOLE_PROVENANCE.window],
                ["USERS", formatInt(CAMPAIGN_TOTALS.users)],
                ["SESSIONS", formatInt(CAMPAIGN_TOTALS.sessions)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
                  <dt className="mono-meta">{k}</dt>
                  <dd className="num text-ink-1">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* KPI grid — full-bleed ruled cells, the spine of the page */}
      {/* -------------------------------------------------------------- */}
      <section className="mx-auto grid max-w-[var(--page-max)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiTile
          eyebrow="USERS · 7D"
          value={formatInt(CAMPAIGN_TOTALS.users)}
          label={`실사용자 / ${formatInt(CAMPAIGN_TOTALS.sessions)} 세션`}
          source={`SRC GA4 · ${CONSOLE_PROVENANCE.window}`}
        />
        <KpiTile
          eyebrow="SPIN → RESULT"
          value={formatPercent(spinCompletionRate())}
          label="스핀 완료 → 결과 확인 완주율"
          source={`SRC GA4 · ${CONSOLE_PROVENANCE.window}`}
        />
        <KpiTile
          eyebrow="ACQUISITION"
          value={`채널 ${SHARE_LOOP_CHANNEL.rankBySessions}위`}
          label={`user_share ${SHARE_LOOP_CHANNEL.sessions}세션 · ${SHARE_LOOP_CHANNEL.users}명 — 자체 바이럴 루프 유입`}
          source={`SRC GA4 · ${CONSOLE_PROVENANCE.window}`}
        />
        <KpiTile
          eyebrow="CHALLENGE"
          value={`${CHALLENGE_RESULT.rank}위 / ${CHALLENGE_RESULT.totalTeams}팀`}
          label="팀 프로젝트 챌린지 최종 성과"
          source="SRC 챌린지 결과 발표"
        />
      </section>

      <footer className="mx-auto max-w-[var(--page-max)] border-t border-rule-1 px-6 py-8 mono-meta">
        growth-console · design system in progress (Phase 1) · charts, case studies, LIVE panel next
      </footer>
    </div>
  );
}
