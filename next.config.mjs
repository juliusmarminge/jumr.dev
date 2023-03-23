import withMdx from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import { getHighlighter } from "shiki";

// Validate environment variables
// Blog post articles are validated automatically as
// the `getAllArticles` function is called in `app/page.tsx`
await import("./src/lib/env.mjs");

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  pageExtensions: ["tsx", "mdx"],
  images: {
    remotePatterns: [
      { hostname: "github.com" },
      { hostname: "www.bth.se" },
      { hostname: "user-images.githubusercontent.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "og-image.trpc.io" },
    ],
  },
  redirects: async () => [
    { source: "/blog", destination: "/#blog", permanent: true },
  ],
};

export default withMdx({
  options: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        /** @type {import("rehype-pretty-code").Options} */
        ({
          theme: "github-dark",
          getHighlighter,
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node, id) {
            node.properties.className = ["word"];
            node.properties["data-word-id"] = id;
          },
        }),
      ],
    ],
  },
})(nextConfig);
