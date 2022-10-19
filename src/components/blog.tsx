import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/future/image";
import Link from "next/link";
import { type Post } from "~/contentlayer/generated";

const BlogCard: React.FC<Post> = (props) => {
  return (
    <div className="flex cursor-pointer flex-col rounded-lg border p-4">
      <h4 className="text-center text-lg font-semibold">{props.title}</h4>
      <p className="text-center text-sm uppercase">
        {format(parseISO(props.date), "LLLL d, yyyy")}
      </p>
      <div>
        <Image
          height={500}
          width={500}
          src={props.previewImg}
          alt={props.title}
          className="mx-auto aspect-square h-28 py-4 md:h-36 xl:h-48"
        />
        <p className="text-sm md:text-left">{props.description}</p>
      </div>
    </div>
  );
};

export const Blog: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="section-container"
    >
      <h3 className="section-title">Latest posts</h3>

      <div className="absolute top-1/3 left-0 h-[500px] w-full -skew-y-12 bg-accent-500/10" />

      <div className="flex flex-col gap-8">
        <div className="z-20 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.slice(0, 5).map((post, idx) => (
            <Link key={idx} href={post.url}>
              <a>
                <BlogCard {...post} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
