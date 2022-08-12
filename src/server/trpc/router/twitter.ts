import { t } from "../utils";
import { z, ZodError } from "zod";
import Client from "twitter-api-sdk";
import { env } from "../../../env/server.mjs";
import { TRPCError } from "@trpc/server";

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
    }).format(new Date(str))
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
    const parsedFeed = z.object({ id: z.string() }).array().safeParse(feed.data);
    if (!parsedFeed.success) return console.log("failed");

    const formattedFeed: any[] = [];
    for (const { id } of parsedFeed.data) {
      const tweet = await client.tweets.findTweetById(id, {
        "tweet.fields": ["created_at"],
        expansions: ["referenced_tweets.id", "referenced_tweets.id.author_id"],
        "user.fields": ["name", "profile_image_url", "username"],
      });

      const referencedTweet = tweet.data?.referenced_tweets?.shift();
      const originalTweet = tweet.includes?.tweets?.find(
        (t) => t.id === referencedTweet?.id
      );
      const author = tweet.includes?.users?.find(
        (u) => u.id === originalTweet?.author_id
      );

      formattedFeed.push({
        id,
        body: originalTweet?.text,
        createdAt: tweet.data?.created_at,
        type: referencedTweet?.type,
        author: {
          profileImg: author?.profile_image_url,
          name: author?.name,
          handle: author?.username,
        },
      });
    }
    try {
      const parsedFormatted = FormattedFeedValidator.array().parse(formattedFeed);
      return parsedFormatted;
    } catch (e) {
      if (e instanceof ZodError) throw e;
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
});
