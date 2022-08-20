/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const { env } = require("./src/env/server.mjs");
const { withContentlayer } = require("next-contentlayer");

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

const config = defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: true,
      remotePatterns: [{ hostname: "pbs.twimg.com" }],
    },
  },
});

export default withContentlayer(config);
