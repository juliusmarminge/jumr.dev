import { allPosts, Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useMDXComponent } from "next-contentlayer/hooks";

import { components } from "~/components/mdx";

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
      <article className="py-8">
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <p className="text-sm text-slate-600">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </p>
        </div>
        <main className="prose mx-auto max-w-6xl">
          <MDXContent components={components} />
        </main>
      </article>
    </>
  );
};

export default PostLayout;
