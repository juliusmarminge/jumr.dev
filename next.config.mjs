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
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { hostname: "github.com" },
      { hostname: "user-images.githubusercontent.com" },
    ],
  },
};

export default withNextra(config);
