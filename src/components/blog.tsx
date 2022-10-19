import { motion } from "framer-motion";
import Image from "next/future/image";
import Link from "next/link";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  img: string;
}
const BlogCard: React.FC<BlogPost> = (props) => {
  return (
    <div className="flex cursor-pointer flex-col rounded-lg border p-4">
      <h4 className="text-center text-lg font-semibold">{props.title}</h4>
      <p className="text-center text-sm uppercase">{props.date}</p>
      <div>
        <Image
          height={500}
          width={500}
          src={props.img}
          alt={props.title}
          className="mx-auto aspect-square h-28 py-4 md:h-36 xl:h-48"
        />
        <p className="text-sm md:text-left">{props.description}</p>
      </div>
    </div>
  );
};

export const Blog = () => {
  const previewPosts: BlogPost[] = [
    {
      slug: "t3-turbo",
      title: "Migrating your T3 App into a Turborepo",
      date: "Jun 16 2022",
      img: "https://user-images.githubusercontent.com/51714798/193696098-5ea53aa5-826f-411d-b694-b27f6a1d2421.png",
      description:
        "Detailed walkthrough on how to migrate your T3 App into a Turborepo. We'll also add an Expo React Native Application to the mix.",
    },
    {
      slug: "t3-turbo",
      title: "Migrating your T3 App into a Turborepo",
      date: "Jun 16 2022",
      img: "https://user-images.githubusercontent.com/51714798/193696098-5ea53aa5-826f-411d-b694-b27f6a1d2421.png",
      description:
        "Detailed walkthrough on how to migrate your T3 App into a Turborepo. We'll also add an Expo React Native Application to the mix.",
    },
    {
      slug: "t3-turbo",
      title: "Migrating your T3 App into a Turborepo",
      date: "Jun 16 2022",
      img: "https://user-images.githubusercontent.com/51714798/193696098-5ea53aa5-826f-411d-b694-b27f6a1d2421.png",
      description:
        "Detailed walkthrough on how to migrate your T3 App into a Turborepo. We'll also add an Expo React Native Application to the mix.",
    },
    {
      slug: "t3-turbo",
      title: "Migrating your T3 App into a Turborepo",
      date: "Jun 16 2022",
      img: "https://user-images.githubusercontent.com/51714798/193696098-5ea53aa5-826f-411d-b694-b27f6a1d2421.png",
      description:
        "Detailed walkthrough on how to migrate your T3 App into a Turborepo. We'll also add an Expo React Native Application to the mix.",
    },
  ];
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
          {previewPosts.slice(0, 5).map((post, idx) => (
            <Link key={idx} href={`/blog/${post.slug}`}>
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
