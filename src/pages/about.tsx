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

        <NextLink
          href="https://github.com/sponsors/juliusmarminge"
          className="group btn btn-primary w-48 gap-2 rounded-lg normal-case"
        >
          <AiOutlineHeart className="text-lg transition-transform group-hover:scale-125 group-hover:text-pink-500" />
          Sponsor me
        </NextLink>

        <h1 className="text-3xl font-bold mt-4">History</h1>
        <ul className="steps steps-vertical" id="history-steps">
          <li data-content="2014" className="step step-primary ">
            <div className="flex flex-col justify-start max-w-xl text-left h-max">
              <span className="text-left font-semibold">1st line of code</span>
              <span>
                I have written code for quite some time now, testing different
                stuff just for the fun of it. I started with Windows Forms
                Application using C++ cause I wanted something that you could
                interact with. Turns out there are far better options for
                this...
              </span>
            </div>
          </li>
          <li data-content="2019" className="step step-primary ">
            <div className="flex flex-col max-w-lg text-left">
              <span className="font-semibold">1st Github Repo</span>
              <span></span>
            </div>
          </li>
          <li data-content="2020" className="step step-primary ">
            1st &quot;Real World&quot; Project
          </li>
        </ul>
      </div>
    </>
  );
};

export default AboutPage;
