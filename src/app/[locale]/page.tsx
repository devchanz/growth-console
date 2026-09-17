import Image from "next/image";
import {
  CAMPAIGN_TOTALS,
  CHALLENGE_RESULT,
  CONSOLE_PROVENANCE,
  SHARE_LOOP_CHANNEL,
} from "@/content/metrics/campaign";
import { formatInt, formatPercent, spinCompletionRate } from "@/content/metrics/derive";

const NAV_ITEMS = [
  { label: "케이스 스터디" },
  { label: "스택" },
  { label: "연락처" },
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
      <div className="text-[0.75rem] font-medium uppercase tracking-[0.06em] text-ink-3">
        {eyebrow}
      </div>
      <div className="num text-[clamp(2.25rem,5.5vw,3.5rem)] leading-[0.95] tracking-[-0.03em] text-ink-1">
        {value}
      </div>
      <div className="prose-ko text-[0.9375rem] leading-snug text-ink-2">{label}</div>
      <div className="mono-src mt-2">{source}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink-1">
      {/* -------------------------------------------------------------- */}
      {/* Nav */}
      {/* -------------------------------------------------------------- */}
      <nav className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-rule-1 bg-surface-1 px-6">
        <span className="text-[0.9375rem] font-semibold text-ink-1">
          김찬주 <span className="font-normal text-ink-3">· 퍼포먼스 · 그로스 마케터</span>
        </span>
        <div className="hidden gap-6 text-[0.875rem] text-ink-2 sm:flex">
          {NAV_ITEMS.map((item) => (
            <span key={item.label}>{item.label}</span>
          ))}
        </div>
        <span className="text-[0.8125rem] font-medium text-signal">KO</span>
      </nav>

      {/* -------------------------------------------------------------- */}
      {/* Hero */}
      {/* -------------------------------------------------------------- */}
      <section className="border-b border-rule-1 px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-[var(--page-max)] grid-cols-1 gap-8 sm:grid-cols-12">
          <div className="sm:col-span-8">
            <h1 className="prose-ko text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.24] tracking-[-0.025em] text-ink-1">
              데이터로 가설을 검증하고,
              <br />
              유저의 진짜 맥락을 짚어내는 마케터입니다
            </h1>
            <p className="prose-ko mt-6 max-w-[var(--measure-ko)] text-[1.0625rem] leading-[1.8] text-ink-2">
              캠페인을 기획·제작·배포하고, 그 결과를 GTM·GA4로 직접 계측해 다음 실행으로
              연결합니다. 크리에이티브 감각과 데이터 근거를 함께 보여주는 것이 이 포트폴리오의
              방식입니다.
            </p>
            <p className="mono-src prose-ko mt-6">
              지금 기준 성과 — {formatInt(CAMPAIGN_TOTALS.users)}명 ·{" "}
              {formatPercent(spinCompletionRate())} 완주율 · 공유채널{" "}
              {SHARE_LOOP_CHANNEL.rankBySessions}위 · {CHALLENGE_RESULT.rank}위/
              {CHALLENGE_RESULT.totalTeams}팀
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* Campaign key visual — craft first, proof second */}
      {/* -------------------------------------------------------------- */}
      <section className="border-b border-rule-1 px-6 py-10">
        <div className="mx-auto max-w-[var(--page-max)]">
          <Image
            src="/images/daejeon-creative-wall.webp"
            alt="오늘 대전 갈래! 캠페인 — 레트로 픽셀 컨셉으로 제작한 대표 소재 3종(초대짱 · 꿈돌이 런닝 · TTS)"
            width={1400}
            height={605}
            className="w-full border border-rule-1"
            priority
          />
          <p className="prose-ko mt-3 text-[0.875rem] text-ink-3">
            &ldquo;오늘 대전 갈래!&rdquo; — 레트로 픽셀 슬롯머신 빅아이디어로 기획·제작한 캠페인
            소재. 14종 중 13종은 팀 공동 제작, 1종 직접 제작.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/* KPI grid — the data proof, secondary to the craft above */}
      {/* -------------------------------------------------------------- */}
      <section className="mx-auto grid max-w-[var(--page-max)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiTile
          eyebrow="유입 · 7일간"
          value={formatInt(CAMPAIGN_TOTALS.users)}
          label={`실사용자 / ${formatInt(CAMPAIGN_TOTALS.sessions)} 세션`}
          source={`GA4 · ${CONSOLE_PROVENANCE.window}`}
        />
        <KpiTile
          eyebrow="퍼널 완주율"
          value={formatPercent(spinCompletionRate())}
          label="스핀 완료 → 결과 확인"
          source={`GA4 · ${CONSOLE_PROVENANCE.window}`}
        />
        <KpiTile
          eyebrow="공유 채널"
          value={`${SHARE_LOOP_CHANNEL.rankBySessions}위`}
          label={`user_share ${SHARE_LOOP_CHANNEL.sessions}세션 · ${SHARE_LOOP_CHANNEL.users}명 — 직접 설계한 바이럴 루프`}
          source={`GA4 · ${CONSOLE_PROVENANCE.window}`}
        />
        <KpiTile
          eyebrow="팀 챌린지"
          value={`${CHALLENGE_RESULT.rank}위 / ${CHALLENGE_RESULT.totalTeams}팀`}
          label="최종 성과 발표 결과"
          source="챌린지 결과 발표"
        />
      </section>

      <footer className="mx-auto max-w-[var(--page-max)] border-t border-rule-1 px-6 py-8 text-[0.8125rem] text-ink-3">
        김찬주 Portfolio · 케이스 스터디·차트·연락처는 다음 단계에서 추가됩니다
      </footer>
    </div>
  );
}
