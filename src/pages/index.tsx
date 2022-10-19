import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FaArrowAltCircleUp } from "react-icons/fa";

import { About } from "../components/about";
import { Blog } from "../components/blog";
import { ExperienceSection } from "../components/experience";
import { FinalWords } from "../components/final-words";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { Projects } from "../components/projects";

const Home: NextPage = () => {
  return (
    <div className="scrollbar-accent z-0 h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll scroll-smooth text-white">
      <Head>
        <title>🇸🇪 Julius | SWE | OSS</title>
      </Head>

      <Header />

      <section id="hero" className="snap-start">
        <Hero />
      </section>

      <section id="about" className="snap-center">
        <About />
      </section>

      <section id="blog" className="snap-start">
        <Blog />
      </section>

      <section id="experience" className="snap-center">
        <ExperienceSection />
      </section>

      <section id="projects" className="snap-start">
        <Projects />
      </section>

      <section id="final-words" className="snap-start">
        <FinalWords />
      </section>

      <footer className="sticky bottom-5 z-[1000] w-full">
        <div className="flex items-center justify-center">
          <Link href="#hero">
            <FaArrowAltCircleUp className="h-10 w-10 cursor-pointer fill-gray-400 transition-colors duration-200 hover:fill-gray-300" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
