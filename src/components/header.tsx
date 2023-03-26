"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { SiDiscord, SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";

export const Header = (props: { isBlog?: boolean }) => {
  return (
    <header
      className={clsx(
        "top-0 z-20 mx-auto flex max-w-7xl items-start justify-between p-5 pt-8 xl:items-center",
        { sticky: !props.isBlog },
      )}
    >
      <motion.div
        initial={props.isBlog ? {} : { opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className="flex items-center"
      >
        <Link href="https://github.com/juliusmarminge">
          <SiGithub
            className="h-10 w-10 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300"
            title="Github"
          />
        </Link>
        <Link href="https://twitter.com/jullerino">
          <SiTwitter
            className="h-10 w-10 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300"
            title="Twitter"
          />
        </Link>
        <Link href="https://www.linkedin.com/in/julius-marminge-b9a12a241/">
          <SiLinkedin
            className="h-10 w-10 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300"
            title="LinkedIn"
          />
        </Link>
        <Link href="https://discord.com/users/136072283444871168">
          <SiDiscord
            className="h-10 w-10 cursor-pointer fill-gray-400 p-2 text-2xl transition-colors hover:fill-gray-300"
            title="Discord"
          />
        </Link>
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, x: 500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className="flex cursor-pointer items-center"
      >
        <SlEnvolope className="header-icon" />
        <span className="hidden text-sm uppercase text-gray-400 md:inline-flex">
          Contact
        </span>
      </motion.div> */}
    </header>
  );
};
