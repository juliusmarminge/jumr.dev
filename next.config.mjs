// @ts-check

import nextra from "nextra";
const withNextra = nextra({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: "github.com" },
      { hostname: "user-images.githubusercontent.com" },
    ],
  },
};

export default withNextra(config);
