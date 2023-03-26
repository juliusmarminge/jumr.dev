"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative mx-auto flex min-h-[80vh] max-w-full flex-col items-center gap-12 overflow-hidden px-4 text-left md:px-10"
    >
      <h2 className="font-cal text-2xl uppercase tracking-[15px] text-gray-500 md:tracking-[20px]">
        About
      </h2>

      <div className="flex flex-col items-center md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="md:md-0 relative -mb-20 h-56 w-56 flex-shrink-0 md:h-72 md:w-72 xl:h-[500px] xl:w-[500px]"
        >
          <Image
            src="/alt.png"
            fill
            alt="me on vacation"
            className="rounded-full object-cover md:rounded-lg"
          />
        </motion.div>

        <div className="space-y-10 px-0 py-24 md:px-10 md:py-0">
          <p className="text-base">
            I&apos;m a software engineer from Sweden. I&apos;m passionate about
            building stuff whether it be developer tools or applications.
            I&apos;m eager to learn new things and will never be afraid of
            exploring new technologies.
          </p>
          <p className="text-base">
            Wanna chat?{" "}
            <a href="#final-words" className="text-accent-500">
              Book my Cal.com
            </a>
            !
          </p>
        </div>
      </div>
    </motion.div>
  );
};
