/**
 * Thanks Alex for the DX-helper
 * @link https://github.com/trpc/trpc/blob/main/www/og-image/utils/zodParams.ts
 **/

import { z } from "zod";

type Primitives = string | number | boolean | null;
type JsonValue = Primitives | JsonValue[] | { [key: string]: JsonValue };

const jsonStr = z.string().transform((str, ctx) => {
  try {
    return JSON.parse(str) as JsonValue;
  } catch (error) {
    ctx.addIssue({ code: "custom", message: "Needs to be JSON" });
  }
});

function zodParams<TType>(schema: z.ZodType<TType>) {
  const querySchema = z.object({
    input: jsonStr.pipe(schema),
  });
  return {
    decodeRequest: (req: Request) => {
      const url = new URL(req.url);
      const obj = Object.fromEntries(url.searchParams.entries());

      return querySchema.safeParse(obj);
    },
    toSearchString: (obj: (typeof schema)["_input"]) => {
      schema.parse(obj);
      return `input=${encodeURIComponent(JSON.stringify(obj))}`;
    },
  };
}

export const strToFmtDate = z
  .string()
  .transform((d) => new Date(d))
  .pipe(z.date())
  .transform((d) =>
    Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d),
  );

export const blogParams = zodParams(
  z.object({
    title: z.string(),
    description: z.string(),
    date: strToFmtDate,
    readingTime: z.number(),
    slug: z.string(),
  }),
);
