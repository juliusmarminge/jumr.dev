import { Meta } from "~/lib/blog";
import { blogParams } from "~/lib/zod-params";

const getOGLink = (meta: Meta) =>
  "/api/og-blog?" +
  blogParams.toSearchString({
    title: meta.title,
    description: meta.description,
    date: meta.date,
    slug: meta.url,
  });

const theme = {
  head: ({ meta }: { meta: Meta }) => {
    return (
      <>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={getOGLink(meta)} />
        <meta property="twitter:image" content={getOGLink(meta)} />
        <meta name="keywords" content={meta.tags?.join(",")} />
        <meta name="author" content="Julius Marminge" />
      </>
    );
  },
  footer: (
    <p className="pt-16 text-sm text-stone-500">MIT 2022 © Julius Marminge</p>
  ),
};

export default theme;
