"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";
import { SiDiscord, SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";
import { SlEnvolope } from "react-icons/sl";

export const Header = (props: { animate?: boolean }) => {
  const { animate = true } = props;

  return (
    <header className="sticky top-0 z-50 mx-auto flex max-w-7xl items-start justify-between bg-stone-800 p-5 pt-8 xl:items-center">
      <motion.div
        {...(animate && {
          initial: { opacity: 0, x: -500 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 1.5 },
        })}
        className="flex items-center"
      >
        <Link href="/#hero">
          <FaHome
            className="h-10 w-10 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300"
            title="Go home"
          />
        </Link>

        <a href="https://github.com/juliusmarminge">
          <SiGithub
            className="h-10 w-10 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300"
            title="Github"
          />
        </a>
        <a href="https://twitter.com/jullerino">
          <SiTwitter
            className="h-10 w-10 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300"
            title="Twitter"
          />
        </a>
        <a href="https://www.linkedin.com/in/julius-marminge-b9a12a241/">
          <SiLinkedin
            className="h-10 w-10 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300"
            title="LinkedIn"
          />
        </a>
        <a href="https://discord.com/users/136072283444871168">
          <SiDiscord
            className="h-10 w-10 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300"
            title="Discord"
          />
        </a>
      </motion.div>

      <motion.div
        {...(animate && {
          initial: { opacity: 0, x: 500 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 1.5 },
        })}
        className="flex items-center"
      >
        <Link
          href="/#final-words"
          className="group flex cursor-pointer items-center"
        >
          <SlEnvolope className="h-10 w-10 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors group-hover:fill-gray-300" />
          <span className="hidden font-cal text-sm uppercase text-gray-400 group-hover:text-gray-300 md:inline-flex">
            Contact
          </span>
        </Link>
      </motion.div>
    </header>
  );
};
