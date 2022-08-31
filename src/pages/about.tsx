import { type NextPage } from "next";
import Head from "next/head";
import { AiOutlineHeart } from "react-icons/ai";

import { NextLink } from "../components/next-link";

const AboutPage: NextPage = () => {
  return (
    <>
      <Head key="about">
        <title>About Me</title>
      </Head>
      <div className="p-8">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="py-2">
          I am a Software Engineer and open source contributor living in Sweden.
          If you would like to support my work, I accept donations on GitHub
          Sponsor.
        </p>

        <p>hello</p>
        <NextLink
          href="https://github.com/sponsors/juliusmarminge"
          className="group btn btn-accent w-48 gap-2 rounded-lg normal-case"
        >
          <AiOutlineHeart className="text-lg transition-transform group-hover:scale-125 group-hover:text-pink-500" />
          Sponsor me
        </NextLink>
      </div>
    </>
  );
};

export default AboutPage;
