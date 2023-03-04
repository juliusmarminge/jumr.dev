import { useRouter } from 'next/router';

// import { CommentSection } from "~/components/blog-comments";
import type { Meta } from '~/lib/blog';
import { blogParams } from '~/lib/zod-params';

const getOGLink = (meta: Meta, url: string) =>
  '/api/og-blog?' +
  blogParams.toSearchString({
    title: meta.title,
    description: meta.description,
    date: meta.date,
    readingTime: meta.readingTime,
    slug: url,
  });

const theme = {
  head: (opts: { meta: Meta }) => {
    const meta = opts.meta;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useRouter();
    return (
      <>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={getOGLink(meta, pathname)} />
        <meta property="twitter:image" content={getOGLink(meta, pathname)} />
        <meta name="keywords" content={meta.tags?.join(',')} />
        <meta name="author" content="Julius Marminge" />
      </>
    );
  },
  footer: (
    <>
      {/* <CommentSection /> */}
      <p className="pt-16 text-sm text-stone-500">MIT 2023 © Julius Marminge</p>
    </>
  ),
};

export default theme;
