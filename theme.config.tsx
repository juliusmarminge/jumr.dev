import { Meta } from "~/lib/blog";

const theme = {
  head: ({ meta }: { meta: Meta }) => {
    return (
      <>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta name="keywords" content={meta.tags?.join(",")} />
        <meta name="author" content="Julius Marminge" />
      </>
    );
  },
  navs: [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Blog",
      url: "/blog",
    },
  ],
  footer: (
    <p className="pt-16 text-sm text-stone-500">MIT 2022 © Julius Marminge</p>
  ),
};

export default theme;
