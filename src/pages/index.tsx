import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/future/image";
import dynamic from "next/dynamic";

const TwitterFeed = dynamic(
  () => import("../components/twitter-feed").then((m) => m.TwitterFeed),
  { ssr: false }
);
import { appRouter } from "../server/trpc/router";
import { Suspense } from "react";

export const getStaticProps = async () => {
  const caller = appRouter.createCaller({});
  const twitterFeed = await caller.twitter.feed();
  return { props: { twitterFeed }, revalidate: 3600 };
};

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  twitterFeed,
}) => {
  return (
    <>
      <Head key="home">
        <title>Julius Marminge - SWE</title>
      </Head>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-base-200 rounded-box lg:w-1/2">
          <div className="flex-col max-w-3xl hero-content ">
            <div className="avatar">
              <div className="w-48 aspect-square mask mask-squircle">
                <Image
                  src="/images/profile.png"
                  alt="profile pic"
                  width={200}
                  height={200}
                />
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold">Julius Marminge</h1>
              <h2 className="py-2 text-sm font-semibold">
                Software Engineering student @ BTH - Sweden
              </h2>
              <p className="py-2">Passionate about tech, especially new one.</p>
              <p className="text-sm italic text-warning">
                This site is under construction
              </p>
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold py-4">My Twitter Feed</h1>
          <TwitterFeed feed={twitterFeed} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
