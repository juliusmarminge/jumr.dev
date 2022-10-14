import type { NextPage } from "next";
import Image from "next/future/image";
import Head from "next/head";
import superjson from "superjson";
import { TwitterFeed } from "~/components/twitter-feed";
import { trpc } from "~/utils/trpc";

import { createProxySSGHelpers } from "@trpc/react/ssg";

import ProfilePic from "../../public/images/profile.png";
import { appRouter } from "../server/trpc/router";

/*const TwitterFeed = dynamic(
  async () => (await import("../components/twitter-feed")).TwitterFeed,
  { ssr: false },
);*/

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });

  await ssg.twitter.feed.fetch();
  return { props: { trpcState: ssg.dehydrate() }, revalidate: 86400 };
};

const HomePage: NextPage = () => {
  const { data: twitterFeed } = trpc.twitter.feed.useQuery();
  if (!twitterFeed) {
    // unreachable
    return null;
  }
  return (
    <>
      <Head key="home">
        <title>Julius Marminge - SWE</title>
      </Head>
      <div className="flex flex-col gap-4 lg:max-h-[80vh] lg:flex-row">
        <div className="rounded-box flex justify-center bg-base-200 lg:w-1/2 lg:items-center">
          <div className="hero-content max-w-3xl flex-col lg:items-center">
            <div className="avatar">
              <div className="mask mask-squircle aspect-square w-48">
                <Image src={ProfilePic} alt="profile pic" placeholder="blur" />
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold">Julius Marminge</h1>
              <h2 className="pt-2 text-sm font-semibold">
                Software Engineering student @ BTH - Sweden
              </h2>
              <h2 className="py-1 text-sm font-semibold">
                Open Source Contributor & Maintainer
              </h2>
              <h2 className="b"></h2>
              <p className="py-2">Passionate about tech, especially new one.</p>
              <p className="text-sm italic text-warning">
                This site is under construction
              </p>
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal" />
        <div className="flex-1 overflow-y-scroll">
          <h1 className="py-4 text-2xl font-bold">My Twitter Feed</h1>
          <TwitterFeed feed={twitterFeed} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
