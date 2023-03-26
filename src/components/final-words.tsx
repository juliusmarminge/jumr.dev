"use client";

import React from "react";
import Link from "next/link";
import Cal from "@calcom/embed-react";
import { motion } from "framer-motion";

const FancyLink = (props: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={props.href}
      className="underline decoration-accent-500 decoration-2 underline-offset-4"
    >
      {props.children}
    </Link>
  );
};

export const FinalWords = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative mx-auto flex min-h-[80vh] max-w-full flex-col items-center gap-12 overflow-hidden px-4 text-left md:px-10"
    >
      <h3 className="font-cal text-2xl uppercase tracking-[15px] text-gray-500 md:tracking-[20px]">
        Final Words
      </h3>
      <ul className="list-disc space-y-4 px-4">
        <li className="text-base">
          If you like what you see and would like to sponsor my open source
          work, I am on{" "}
          <FancyLink href="https://github.com/sponsors/juliusmarminge">
            GitHub Sponsors
          </FancyLink>
          .
        </li>
        <li className="text-base">
          This page was built using Next.js, React Server Components, Tailwind
          CSS and Framer Motion - and is open source at{" "}
          <FancyLink href="https://github.com/juliusmarminge/jumr.dev">
            GitHub
          </FancyLink>
          .
        </li>
        <li className="text-base">
          If you didn&apos;t already know, the best way to start your next
          fullstack application is with{" "}
          <FancyLink href="https://create.t3.gg">Create T3 App</FancyLink>.
        </li>
      </ul>
      <div className="w-full space-y-2 text-gray-400" id="calcom">
        <h4 className="text-center font-cal text-xl">
          Wanna chat? Book my Cal!
        </h4>
        <Cal calLink="juliusm" className="w-full" />
      </div>
    </motion.div>
  );
};
