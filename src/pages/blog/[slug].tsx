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
      <article className="py-8">
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <p className="text-sm text-slate-600">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </p>
        </div>
        <main className="prose-lg prose-invert prose-indigo prose-a:text-indigo-400 prose-a:opacity-90 prose-a:transition-opacity hover:prose-a:opacity-100">
          <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
        </main>
      </article>
    </>
  );
};

export default PostLayout;
