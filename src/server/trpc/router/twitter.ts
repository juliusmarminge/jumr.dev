// FIXME: proper type definitions for twitter
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRPCError } from "@trpc/server";
import Client from "twitter-api-sdk";
import { z } from "zod";

import { env } from "../../../env/server.mjs";
import { t } from "../utils";

const twitterId = "3557533403";
const client = new Client(env.TWITTER_BEARER_TOKEN);

const FormattedFeedValidator = z.object({
  id: z.string(),
  body: z.string(),
  // FIXME: Send back Date instead
  createdAt: z.string().transform((str) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
    }).format(new Date(str)),
  ),
  type: z
    .enum(["retweeted", "quoted", "replied_to"])
    .transform((arg) => (arg === "replied_to" ? "reply" : arg)),
  author: z.object({
    profileImg: z.string().url(),
    name: z.string(),
    handle: z.string(),
  }),
});

export type Tweet = z.infer<typeof FormattedFeedValidator>;

export const twitterRouter = t.router({
  feed: t.procedure.query(async () => {
    const feed = await client.tweets.usersIdTweets(twitterId);
    const parsedFeed = z
      .object({ id: z.string() })
      .array()
      .safeParse(feed.data);
    if (!parsedFeed.success) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }

    const formattedFeed: any[] = [];
    for (const { id } of parsedFeed.data) {
      const tweet = await client.tweets.findTweetById(id, {
        "tweet.fields": ["created_at"],
        expansions: ["referenced_tweets.id", "referenced_tweets.id.author_id"],
        "user.fields": ["name", "profile_image_url", "username"],
      });

      const referencedTweet = tweet.data?.referenced_tweets?.shift();

      let author: any;
      let originalTweet: any;
      if (referencedTweet?.type === "replied_to") {
        // the reply
        author = tweet.includes?.users?.find(
          (u) => u.id === tweet.data?.author_id,
        );
        originalTweet = tweet.data;
      } else if (referencedTweet?.type === "retweeted") {
        // the original tweet
        originalTweet = tweet.includes?.tweets?.find(
          (t) => t.id === referencedTweet.id,
        );
        author = tweet.includes?.users?.find(
          (u) => u.id === originalTweet?.author_id,
        );
      } else {
        continue;
      }

      formattedFeed.push({
        id,
        body: originalTweet?.text,
        createdAt: originalTweet?.created_at,
        type: referencedTweet.type,
        author: {
          profileImg: author?.profile_image_url,
          name: author?.name,
          handle: author?.username,
        },
      });
    }
    try {
      const parsedFormatted =
        FormattedFeedValidator.array().parse(formattedFeed);
      return parsedFormatted;
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve twitter feed",
      });
    }
  }),
});
