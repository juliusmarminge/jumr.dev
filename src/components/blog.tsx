"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { type Meta } from "~/app/blog/helpers";

const BlogCard = (props: Meta) => {
  return (
    <div className="flex cursor-pointer flex-col rounded-lg border p-4 transition-all hover:scale-105">
      <h4 className="text-center text-lg font-semibold">{props.title}</h4>
      <p className="text-center text-sm uppercase">{props.date}</p>
      <div>
        <Image
          src={props.previewImg}
          alt={props.title}
          className="mx-auto object-cover py-4 md:h-48 xl:h-52"
          height={400}
          width={800}
        />
        <p className="text-sm line-clamp-3 md:text-left">{props.description}</p>
      </div>
    </div>
  );
};

export const Blog = (props: { posts: Meta[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-12 overflow-hidden py-24 px-4 text-left md:px-10"
    >
      <h3 className="font-cal text-2xl uppercase tracking-[15px] text-gray-400 md:tracking-[20px]">
        Latest posts
      </h3>

      <div className="absolute top-1/3 left-0 h-[500px] w-full -skew-y-12 bg-accent-500/10" />

      <div className="flex flex-col gap-8">
        <div className="z-20 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {props.posts.map((post, idx) => (
            <Link key={idx} href={post.slug}>
              <BlogCard {...post} />
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
