import { type NextPage } from "next";
import Head from "next/head";

const AboutPage: NextPage = () => {
  return (
    <>
      <Head key="about">
        <title>About Me</title>
      </Head>
      <div className="p-8 card roundex-box bg-base-200">
        <h1 className="text-3xl font-bold">
          About
        </h1>
        <p className="py-2">
          I am a Software Engineer and open source contributor living in Sweden. If you would like to support my work, I accept donations on GitHub Sponsor.
        </p>
        <iframe
          src="https://github.com/sponsors/juliusmarminge/button"
          title="Sponsor juliusmarminge"
          height="35"
          width="116"
        ></iframe>
      </div>
    </>
  );
};

export default AboutPage;
