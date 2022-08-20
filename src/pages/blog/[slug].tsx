import { allPosts, Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import Head from "next/head";

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="mx-auto max-w-2xl py-16">
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <p className="text-sm text-slate-600">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </p>
        </div>
        <div
          className="cl-post-body"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </article>
    </>
  );
};

export default PostLayout;
