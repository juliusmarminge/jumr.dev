import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import ProfileImg from "../../public/profile.png";

const Circles = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1],
        scale: [1, 2, 2, 3, 1],
        borderRadius: ["20%", "20%", "50%", "80%", "20%"],
      }}
      transition={{
        duration: 2.5,
      }}
      className="relative flex items-center justify-center"
    >
      <div className="absolute mt-52 h-[200px] w-[200px] animate-ping rounded-full border border-[#333333]" />
      <div className="absolute mt-52 h-[300px] w-[300px] rounded-full border border-[#333333]" />
      <div className="absolute mt-52 h-[500px] w-[500px] rounded-full border border-[#333333]" />
      <div className="absolute mt-52 h-[650px] w-[650px] animate-pulse rounded-full border border-accent-500" />
      <div className="absolute mt-52 h-[800px] w-[800px] rounded-full border border-[#333333]" />
    </motion.div>
  );
};

export const Hero = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8 overflow-hidden text-center">
      <Circles />
      <Image
        src={ProfileImg}
        height={144}
        width={144}
        alt="Profile picture"
        className="relative mx-auto h-36 w-36 rounded-full"
      />
      <div className="z-20">
        <h2 className="pb-2 text-sm uppercase tracking-[15px] text-gray-500">
          Software Engineer
        </h2>
        <h1 className="px-10 text-5xl font-semibold lg:text-6xl">
          Julius Marminge
        </h1>

        <div className="pt-5">
          <Link href="#about">
            <button className="hero-btn">About</button>
          </Link>
          <Link href="#experience">
            <button className="hero-btn">Experience</button>
          </Link>
          {/* <Link href="#projects">
            <button className="hero-btn">Projects</button>
          </Link> */}
          <Link href="#blog">
            <button className="hero-btn">Blog</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
