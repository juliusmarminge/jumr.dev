import withMdx from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

import './src/lib/env.mjs';

/** @type {import("next").NextConfig} */
const config = {
  experimental: { appDir: true, mdxRs: true },
  pageExtensions: ['tsx', 'mdx'],
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

export default withMdx({ options: { rehypePlugins: [[rehypePrettyCode]] } })(
  config,
);
