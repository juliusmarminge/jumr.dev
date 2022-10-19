import React from "react";

import { motion } from "framer-motion";
import Link from "next/link";

const FancyLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  return (
    <Link href={href}>
      <a className="underline decoration-accent-500 decoration-2 underline-offset-4">
        {children}
      </a>
    </Link>
  );
};

export const FinalWords = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative mx-auto flex h-screen max-w-full flex-col items-center justify-evenly overflow-hidden px-10 text-left md:flex-row"
    >
      <h3 className="section-title">Final Words</h3>

      <ul className="list-disc space-y-4">
        <li className="text-base">
          If you like what you see and would like to sponsor my open source
          work, I am on{" "}
          <FancyLink href="https://github.com/sponsors/juliusmarminge">
            GitHub Sponsors
          </FancyLink>
          .
        </li>
        <li className="text-base">
          This page was built using Next.js and Tailwind CSS and is open source
          at{" "}
          <FancyLink href="https://github.com/juliusmarminge/jumr.dev">
            GitHub
          </FancyLink>
          .
        </li>
      </ul>
    </motion.div>
  );
};
