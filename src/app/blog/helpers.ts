import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { type Metadata } from "next";
import { globby } from "globby";
import { z } from "zod";

import { blogParams, strToFmtDate } from "../../lib/zod-params";

const meta = z.object({
  title: z.string(),
  description: z.string(),
  date: strToFmtDate,
  updatedAt: strToFmtDate.optional(),
  previewImg: z.string(),
  tags: z.array(z.string()).optional(),
  readingTime: z.coerce.number(),
});

/** Read all files in the blog directory */
export async function getAllArticles() {
  const blogDir = join(process.cwd(), "src/app/blog");
  const filenames = await globby("**/*.mdx", {
    cwd: blogDir,
    absolute: false,
  });
  const articles = await Promise.all(
    filenames.map((file) => readMeta(blogDir, file)),
  );

  // Articles from other sources
  articles.push({
    title: "Writing a tiny tRPC client ↗",
    date: "JANUARY 17, 2023",
    description:
      "Ever wondered how tRPC works? Maybe you want to start contributing to the project but you're frightened by the internals? The aim of this post is to familiarize you with the internals of tRPC by writing a minimal client that covers the big parts of how tRPC works.",
    readingTime: 12,
    previewImg:
      "https://og-image.trpc.io/api/blog?input=%7B%22title%22%3A%22Writing%20a%20tiny%20tRPC%20client%22%2C%22description%22%3A%22Ever%20wondered%20how%20tRPC%20works%3F%20Maybe%20you%20want%20to%20start%20contributing%20to%20the%20project%20but%20you're%20frightened%20by%20the%20internals%3F%20The%20aim%20of%20this%20post%20is%20to%20familiarize%20you%20with%20the%20internals%20of%20tRPC%20by%20writing%20a%20minimal%20client%20that%20covers%20the%20big%20parts%20of%20how%20tRPC%20works.%22%2C%22authorName%22%3A%22Julius%20Marminge%22%2C%22authorTitle%22%3A%22tRPC%20Core%20Team%20Member%22%2C%22authorImg%22%3A%22https%3A%2F%2Fgithub.com%2Fjuliusmarminge.png%22%2C%22date%22%3A%222023-01-17T00%3A00%3A00.000Z%22%2C%22readingTimeInMinutes%22%3A11.04%7D",
    slug: "https://trpc.io/blog/tinyrpc-client",
  });

  return articles.sort((a, b) => b.date.localeCompare(a.date));
}

/** Read the frontmatter of the file */
async function readMeta(dir: string, file: string) {
  const raw = await readFile(join(dir, file), "utf8");

  const metadataRegex = /export const metadata = mdHelper\(({[\s\S]+?})\);/;
  const metadataMatch = raw.match(metadataRegex);

  const metadata = metadataMatch?.[1];
  const jsonified = metadata
    ?.replace(/(\w+):/g, '"$1":') // wrap keys in quotes
    .replace(/\n/g, "") // remove newlines
    .replace(/,}$/, "}"); // remove trailing comma
  const $meta = meta.parse(JSON.parse(jsonified ?? "{}"));
  const slug = "/blog/" + file.replace(/\page.mdx?$/, "");

  return { ...$meta, slug };
}

export type Meta = Awaited<ReturnType<typeof readMeta>>;

const getOGLink = (meta: Meta) =>
  "/api/og-blog?" +
  blogParams.toSearchString({
    title: meta.title,
    description: meta.description,
    date: meta.date,
    readingTime: meta.readingTime,
    slug: meta.slug,
  });

export const mdHelper = (meta: Meta): Metadata => ({
  ...meta,
  openGraph: {
    images: [{ url: getOGLink(meta) }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: getOGLink(meta) }],
  },
});
