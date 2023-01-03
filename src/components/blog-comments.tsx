import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

import { api, RouterOutputs } from "~/lib/api";

type Discussion = RouterOutputs["github"]["getDiscussionBySlug"];
type Comment = Discussion["comments"][number];

export const CommentSection = () => {
  const session = useSession();
  const [text, setText] = useState("");

  const { data: discussion } = api.github.getDiscussionBySlug.useQuery({
    repo: "tkdodo/blog-comments",
    slug: "blog/2022-in-review",
  });
  const comments = discussion?.comments ?? [];

  if (!discussion) return "Loading comments...";

  return (
    <div>
      <h2>Questions? Leave a comment below!</h2>
      <p>
        View full discussion <Link href={discussion.url}>on GitHub</Link>.
      </p>
      <div className="flex flex-col gap-3">
        <textarea
          className="rounded-md border-b-2 border-stone-200 p-2"
          placeholder="Leave a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex items-center justify-end gap-2">
          {!!text.length && (
            <button
              className="rounded-full py-2 px-3 text-sm font-medium hover:bg-stone-700"
              disabled={!session.data || !text.length}
              onClick={() => setText("")}
            >
              Cancel
            </button>
          )}
          {session.data ? (
            <button
              className="rounded-full bg-blue-500 py-2 px-3 text-sm font-medium text-stone-100 disabled:bg-stone-800 hover:bg-blue-400 disabled:hover:bg-stone-800"
              disabled={!text.length}
              onClick={() => {}}
            >
              Comment
            </button>
          ) : (
            <button
              className="rounded-full bg-blue-500 py-2 px-3 text-sm font-medium text-stone-800  hover:bg-blue-400 "
              onClick={() => void signIn("github")}
            >
              Sign In to Comment
            </button>
          )}
        </div>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

const Comment = (props: Comment) => {
  const utils = api.useContext();
  const { mutate: likeComment } = api.github.likeComment.useMutation({
    onSettled: () => utils.github.getDiscussionBySlug.invalidate(),
  });
  const replyToComment = () => {};

  const session = useSession();
  const [isCreatingReply, setIsCreatingReply] = useState(false);

  console.log(props);

  return (
    <div className="nx-not-prose flex space-x-2 py-2">
      <Link href={props.author.url} className="relative h-10 w-10">
        <Image
          src={props.author.avatarUrl}
          alt={props.author.login}
          fill
          className="m-0 rounded-full"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex gap-2">
          <Link href={props.author.url} className="text-sm font-bold">
            {props.author.login}
          </Link>
          <span className="text-sm text-stone-500">{props.createdAt}</span>
        </div>

        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: props.bodyHTML }}
        />

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm">
            <button
              title="Login to like this comment"
              className="btn-disabled-tooltip flex items-center gap-1 rounded-full p-2 text-sm disabled:cursor-not-allowed hover:bg-stone-700"
              disabled={!session.data || !props.viewerCanUpvote}
            >
              <FaThumbsUp
                className={clsx(
                  "text-lg",
                  props.viewerHasUpvoted && "text-blue-500",
                )}
                onClick={() => likeComment({ id: props.id })}
              />
            </button>
            {props.likes}
          </div>

          <button
            title="Login to reply to this comment"
            className="btn-disabled-tooltip rounded-full py-1 px-2 text-sm hover:bg-stone-700"
            disabled={!session.data}
            onClick={() => setIsCreatingReply(true)}
          >
            Reply
          </button>
        </div>

        {isCreatingReply && (
          <div className="flex flex-col gap-2">
            <textarea
              className="rounded-md border-b-2 border-stone-200 p-2"
              placeholder="Leave a reply..."
            />
            <div className="flex items-center justify-end">
              <button
                className="rounded-full py-1 px-2 text-sm font-medium hover:bg-stone-700"
                onClick={() => setIsCreatingReply(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-blue-500 py-1 px-2 text-sm font-medium text-stone-800 hover:bg-blue-400"
                onClick={() => replyToComment()}
              >
                Reply
              </button>
            </div>
          </div>
        )}

        {props.replies?.map((reply) => (
          <Comment key={reply.id} {...reply} replies={null} />
        ))}
      </div>
    </div>
  );
};