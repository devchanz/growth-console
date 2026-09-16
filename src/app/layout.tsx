import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "growth-console",
  description: "김찬주 — 퍼포먼스/그로스 마케터 포트폴리오 (배포 파이프라인 확인용 placeholder)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
