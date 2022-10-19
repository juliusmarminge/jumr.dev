import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";

import { allPosts, Post } from "~/contentlayer/generated";
import { components } from "~/components/mdx";
import { Header } from "~/components/header";
import { FaHome } from "react-icons/fa";

export function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === params?.slug,
  );

  return {
    props: {
      post,
    },
  };
};

const PostLayout: React.FC<{ post: Post }> = ({ post }) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Header isBlog />
      <article className="mx-auto max-w-7xl p-5">
        <div className="relative mb-6 text-center">
          <Link href="/#blog">
            <a className="absolute left-0 top-1 flex h-max items-center gap-1 font-semibold text-stone-300 hover:text-stone-400">
              <FaHome className="text-3xl" />
            </a>
          </Link>
          <h1 className="mx-auto mb-1 max-w-xs text-3xl font-bold text-stone-300 md:max-w-2xl">
            {post.title}
          </h1>
          <p className="text-sm text-stone-400">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </p>
        </div>

        <main className="prose prose-yellow mx-auto max-w-7xl">
          <MDXContent components={components} />
        </main>
      </article>
    </>
  );
};

export default PostLayout;
