"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="section-container"
    >
      <h2 className="section-title">About</h2>

      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="md:md-0 relative -mb-20 h-56 w-56 flex-shrink-0 md:h-64 md:w-64 xl:h-[500px] xl:w-[500px]"
      >
        <Image
          src="/alt.png"
          fill
          alt="me on vacation"
          className="rounded-full object-cover md:rounded-lg"
        />
      </motion.div>

      <div className="space-y-10 px-0 md:px-10">
        <h3 className="text-4xl font-semibold">Get to know me!</h3>
        <p className="text-base">
          I&apos;m a software engineer from Sweden. I&apos;m passionate about
          building stuff whether it be developer tools or applications. I&apos;m
          eager to learn new things and will never be afraid of exploring new
          technologies.
        </p>
      </div>
    </motion.div>
  );
};
