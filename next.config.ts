import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// GitHub Pages serves this repo at https://leonabdalla.github.io/site-bronze/.
// Remove `basePath` (set the env var to empty in the workflow) on the day the
// custom domain bronzemetal.com.br is wired up to GitHub Pages.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/site-bronze";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
};

export default withNextIntl(nextConfig);
