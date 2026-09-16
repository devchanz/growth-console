import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages hosts this as a fully static site (no Vercel-specific
  // runtime, no server functions). `[locale]` routes are prerendered via
  // generateStaticParams()+dynamicParams=false so this loses nothing.
  // The `/` -> `/ko` redirect can't live in next.config (redirects() isn't
  // supported under `output: 'export'`) — it's done via public/_redirects
  // instead, which Cloudflare Pages reads natively. See docs/DEPLOY.md.
  output: "export",
  images: {
    // No Vercel/Cloudflare Image Optimization API in static export.
    // Pre-sized WebP assets (per docs/CONTENT.md image guidance) instead.
    unoptimized: true,
  },
};

export default nextConfig;
