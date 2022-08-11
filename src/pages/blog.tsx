import { type NextPage } from "next";
import Head from "next/head";

const BlogPage: NextPage = () => {
  return (
    <>
      <Head key="blog">
        <title>Blog</title>
      </Head>
      <div className="p-8 card roundex-box bg-base-200">
        <h1 className="text-3xl font-bold">
          Blog
        </h1>
        <p className="py-2">
          Coming soon...
        </p>
      </div>
    </>
  );
};

export default BlogPage;
