import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/content/locales";
import { wantedSans, commitMono } from "@/app/fonts";
import "./globals.css";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export const metadata: Metadata = {
  title: "김찬주 — growth-console",
  description:
    "김찬주 — 퍼포먼스/그로스 마케터 포트폴리오. 실제 GA4 데이터를 계측 콘솔 형태로 보여줍니다.",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = (await params) as { locale: Locale };
  return (
    <html lang={locale} className={`${wantedSans.variable} ${commitMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
