import Image from "next/future/image";
import type { Tweet } from "../server/trpc/router/twitter";
import { NextLink } from "./next-link";

import { AiOutlineRetweet } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../server/trpc/router";

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
          <span className="text-sm font-semibold">
            Julius replied to {tweet.author.handle}
          </span>
        </div>
      );
    return null;
  };

  return (
    <NextLink href={`https://twitter.com/${tweet.author.handle}/status/${tweet.id}`}>
      <div className="p-6 rounded-lg bg-base-300 hover:bg-base-200">
        <TweetTypeView />
        <div className="flex items-center justify-between">
          <a
            href={`https://twitter.com/${tweet.author.handle}`}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-3 group">
              <Image
                src={tweet.author.profileImg}
                alt={tweet.author.name}
                width={100}
                height={100}
                className="w-12 h-12 rounded-full"
              />
              <div className="group-hover:underline">
                <p className="font-bold text-sm">{tweet.author.name}</p>
                <p className="text-xs ">@{tweet.author.handle}</p>
              </div>
            </div>
          </a>
          <div className="text-xs">
            <p>{tweet.createdAt}</p>
          </div>
        </div>
        <p className="pt-4 whitespace-pre-wrap text-sm">{tweet.body}</p>
      </div>
    </NextLink>
  );
};

export const TwitterFeed: React.FC<{
  feed: inferProcedureOutput<AppRouter["twitter"]["feed"]>;
}> = ({ feed }) => {
  return (
    <div className="flex flex-col gap-2">
      {feed?.map((tweet) => (
        <TweetComponent key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};
