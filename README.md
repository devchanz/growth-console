# growth-console

김찬주 — 퍼포먼스/그로스 마케터 웹 포트폴리오. "오늘 대전 갈래!" 캠페인의 실제 GA4 데이터를 KPI
타일·차트로 노출하고, 이 사이트 자체에도 GTM을 심어 방문자 세션을 LIVE 패널로 보여주는
"계측 콘솔(RULED PLANE)" 컨셉의 사이트.

인쇄용 PDF 덱(`C:\Users\user\dev\proposal\포트폴리오`)과 역할을 분담한다 — PDF는 스캔용 요약,
이 사이트는 깊이 보고 싶은 사람을 위한 상세 버전.

## 스택

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 (CSS-first, `@theme inline`,
config 파일 없음) · `@next/third-parties` (GTM/GA4) · pnpm

`C:\Users\user\dev\daejeon-random-trip` (본인이 만든 실제 배포 프로젝트)의 스택·버전·패턴을
그대로 따른다.

## 개발

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm build
```

## 배포

완전 정적 사이트(`next.config.ts`의 `output: "export"`)로 빌드해 **Cloudflare Pages**에 배포한다
(원래 Vercel 계획이었으나 기존 계정의 Fast Data Transfer 한도 초과로 전환 — 이유는 `docs/DEPLOY.md`
참고). GitHub(`devchanz/growth-console`) push → Cloudflare Pages GitHub 연동이 자동 배포.
`wrangler`/`gh` CLI 없이 대시보드 연동만 사용.

`NEXT_PUBLIC_*` 환경변수는 빌드 타임에 인라인되므로, 값을 바꾸면 재배포가 필요하다.

## 문서

- `docs/ARCHITECTURE.md` — 라우팅·콘텐츠 모델·차트 구조
- `docs/DECISIONS.md` — 주요 설계 결정과 이유
- `docs/CONTENT.md` — 콘텐츠 정확성 가드레일, 한/영 번역 원칙
- `docs/ANALYTICS.md` — 이벤트 택소노미, GTM 설정
- `docs/DEPLOY.md` — GitHub/Vercel/GA4/GTM 수동 설정 절차
