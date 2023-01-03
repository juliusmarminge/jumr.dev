import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

import { api } from "~/lib/api";

export const CommentSection = () => {
  const comments = [
    {
      id: "1",
      text: "Great post!!!",
      author: "Theo Browne",
      handle: "t3dotgg",
      authorImg: "https://github.com/t3dotgg.png",
      date: "2022-12-13",
      likes: 10,
    },
    {
      id: "1",
      text: "Great post2!!!",
      author: "Alex / KATT",
      handle: "katt",
      authorImg: "https://github.com/katt.png",
      date: "2022-12-13",
      likes: 5,
    },
    {
      id: "1",
      text: "Great post3!!!",
      author: "Trash",
      handle: "bautistaaa",
      authorImg: "https://github.com/bautistaaa.png",
      date: "2022-12-13",
      likes: 69,
    },
  ]; // useComments();

  const session = useSession();
  const [text, setText] = useState("");

  const { data } = api.github.getDiscussionBySlug.useQuery({
    slug: "blog-t3-turbo",
  });

  return (
    <div>
      <h2>Questions? Leave a comment below!</h2>
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

interface CommentProps {
  id: string;
  text: string;
  author: string;
  handle: string;
  authorImg: string;
  date: string;
  likes: number;
}

const Comment = (props: CommentProps) => {
  const likeComment = () => {};
  const replyToComment = () => {};

  const session = useSession();
  const [isCreatingReply, setIsCreatingReply] = useState(false);

  return (
    <div className="nx-not-prose flex space-x-2 py-2">
      <Link href={`https://github.com/${props.handle}`}>
        <Image
          src={props.authorImg}
          alt={props.author}
          width={40}
          height={40}
          className="m-0 h-10 w-10 rounded-full"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex gap-2">
          <Link
            href={`https://github.com/${props.handle}`}
            className="text-sm font-bold"
          >
            {props.author}
          </Link>
          <span className="text-sm text-stone-500">{props.date}</span>
        </div>

        <p className="text-sm">{props.text}</p>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm">
            <button
              title="Login to like this comment"
              className="btn-disabled-tooltip flex items-center gap-1 rounded-full p-2 text-sm disabled:cursor-not-allowed hover:bg-stone-700"
              disabled={!session.data}
            >
              <FaThumbsUp className="text-lg" onClick={() => likeComment()} />
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
      </div>
    </div>
  );
};
