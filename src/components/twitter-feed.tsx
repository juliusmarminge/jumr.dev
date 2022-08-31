import { inferProcedureOutput } from "@trpc/server";
import Image from "next/future/image";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsReply } from "react-icons/bs";

import { AppRouter } from "../server/trpc/router";
import type { Tweet } from "../server/trpc/router/twitter";
import { NextLink } from "./next-link";

export const TweetComponent: React.FC<{
  tweet: Tweet;
}> = ({ tweet }) => {
  const TweetTypeView = () => {
    if (tweet.type === "retweeted")
      return (
        <div className="flex items-center gap-2 py-2">
          <AiOutlineRetweet className="text-lg" />
          <span className="text-sm font-semibold">Julius retweeted</span>
        </div>
      );
    if (tweet.type === "reply")
      return (
        <div className="flex items-center gap-2 py-2">
          <BsReply className="text-lg" />
          <span className="text-sm font-semibold">Julius replied</span>
        </div>
      );
    return null;
  };

  return (
    <NextLink
      href={`https://twitter.com/${tweet.author.handle}/status/${tweet.id}`}
    >
      <div className="rounded-lg bg-base-300 p-6 hover:bg-base-200">
        <TweetTypeView />
        <div className="flex items-center justify-between">
          <a
            href={`https://twitter.com/${tweet.author.handle}`}
            className="cursor-pointer"
          >
            <div className="group flex items-center gap-3">
              <Image
                src={tweet.author.profileImg}
                alt={tweet.author.name}
                width={100}
                height={100}
                className="h-12 w-12 rounded-full"
              />
              <div className="group-hover:underline">
                <p className="text-sm font-bold">{tweet.author.name}</p>
                <p className="text-xs ">@{tweet.author.handle}</p>
              </div>
            </div>
          </a>
          <div className="text-xs">
            <p>{tweet.createdAt}</p>
          </div>
        </div>
        <p className="whitespace-pre-wrap pt-4 text-sm">{tweet.body}</p>
      </div>
    </NextLink>
  );
};

export const TwitterFeed: React.FC<{
  feed: inferProcedureOutput<AppRouter["twitter"]["feed"]>;
}> = ({ feed }) => {
  return (
    <div className="flex flex-col gap-2">
      {feed.map((tweet) => (
        <TweetComponent key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};
