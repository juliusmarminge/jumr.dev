import type { Tweet, TwitterProfile } from "../server/trpc/router/twitter";
import { trpc } from "../utils/trpc";
import { Loader } from "./loader";

export const TweetComponent: React.FC<{
  user: TwitterProfile | undefined;
  tweet: Tweet;
}> = ({ user, tweet }) => {
  return (
    <div className="p-2 rounded-md card bg-base-200">
      <p>{tweet.text}</p>
    </div>
  );
};

export const TwitterFeed: React.FC = () => {
  const { data: tweets, isLoading, isError } = trpc.proxy.twitter.feed.useQuery();
  const { data: user } = trpc.proxy.twitter.profile.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-error">No Twitter Feed</div>;

  return (
    <div className="flex flex-col gap-2">
      {tweets?.map((tweet) => (
        <TweetComponent key={tweet.id} tweet={tweet} user={user} />
      ))}
    </div>
  );
};
