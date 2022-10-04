import { format, parseISO } from "date-fns";
import Head from "next/head";

import { allPosts, Post } from "@/contentlayer/generated";
import { NextLink } from "~/components/next-link";

export const getStaticProps = () => {
  return { props: { posts: allPosts } };
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <NextLink href={post.url}>
      <div className="flex flex-col rounded-lg bg-base-300 p-8 hover:bg-base-200">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p className="italic">{format(parseISO(post.date), "yyyy-MM-dd")}</p>
        </div>
        <p className="text-opacity-80">{post.description}</p>
      </div>
    </NextLink>
  );
};

const BlogPage = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="italic text-warning">
            This blog is under construction.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
