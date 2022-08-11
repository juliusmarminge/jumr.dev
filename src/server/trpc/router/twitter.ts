import { t } from "../utils";
import { z } from "zod";
import { feedUrl, profileUrl } from "../../../constants";

export const TweetValidator = z.array(
  z.object({
    id: z.string(),
    text: z.string(),
  })
);
export type Tweet = z.infer<typeof TweetValidator>[number];

export const TwitterProfileValidator = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  //image: z.string().url(),
});
export type TwitterProfile = z.infer<typeof TwitterProfileValidator>;

export const fetchTwitterApi = async (endpoint: string) => {
  return (
    await fetch(endpoint, {
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
    })
  ).json();
};

export const twitterRouter = t.router({
  feed: t.procedure.query(async () => {
    const tweets = await fetchTwitterApi(feedUrl);
    return TweetValidator.parse(tweets.data);
  }),
  profile: t.procedure.query(async () => {
    const profile = await fetchTwitterApi(profileUrl);
    return TwitterProfileValidator.parse(profile.data);
  }),
});
