// @ts-check
await import('./src/lib/env.mjs');

/** @type {import("next").NextConfig} */
const config = {
  experimental: { appDir: true },
  images: {
    remotePatterns: [
      { hostname: 'github.com' },
      { hostname: 'www.bth.se' },
      { hostname: 'user-images.githubusercontent.com' },
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'og-image.trpc.io' },
    ],
  },
  redirects: async () => [
    { source: '/blog', destination: '/#blog', permanent: true },
  ],
};

export default config;
