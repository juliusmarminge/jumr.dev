// @ts-check
await import("./src/lib/env.mjs");
import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-blog",
  themeConfig: "./theme.config.tsx",
  readingTime: true,
  defaultShowCopyCode: true,
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { hostname: "github.com" },
      { hostname: "www.bth.se" },
      { hostname: "user-images.githubusercontent.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "og-image.trpc.io" },
    ],
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  redirects: async () => [
    { source: "/blog", destination: "/#blog", permanent: true },
  ],
};

export default withNextra(config);
