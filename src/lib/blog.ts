import { globby } from "globby";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";

import { strToFmtDate } from "./zod-params";

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
  const blogDir = join(process.cwd(), "src/pages/blog");
  const filenames = await globby("*.mdx", {
    cwd: blogDir,
    absolute: false,
  });

  const articles = await Promise.all(
    filenames.map((file) => readMeta(blogDir, file)),
  );

  return articles.sort((a, b) => b.date.localeCompare(a.date));
}

/** Read the frontmatter of the file */
async function readMeta(dir: string, file: string) {
  const raw = await readFile(join(dir, file), "utf8");
  const [fm] = raw.split("---").slice(1, 2);

  const parsed = fm
    ?.split("\n")
    .filter(Boolean)
    .map((l) => l.split(": "));

  const $meta = meta.parse(Object.fromEntries(parsed ?? []));
  const slug = "/blog/" + file.replace(/\.mdx?$/, "");

  return Object.assign($meta, { slug });
}

export type Meta = Awaited<ReturnType<typeof readMeta>>;
