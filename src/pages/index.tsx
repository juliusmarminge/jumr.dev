import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FaArrowAltCircleUp } from "react-icons/fa";

import { About } from "~/components/about";
import { Blog } from "~/components/blog";
import { ExperienceSection } from "~/components/experience";
import { FinalWords } from "~/components/final-words";
import { Header } from "~/components/header";
import { Hero } from "~/components/hero";
import { Projects } from "~/components/projects";
import { type Post, allPosts } from "~/contentlayer/generated";

export const getStaticProps = () => {
  return { props: { posts: allPosts } };
};

const Home: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className="scrollbar-accent z-0 h-screen overflow-x-hidden overflow-y-scroll scroll-smooth text-white">
      <Head>
        <title>🇸🇪 Julius | SWE | OSS</title>
      </Head>

      <Header />

      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="blog">
        <Blog posts={posts} />
      </section>

      <section id="experience">
        <ExperienceSection />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="final-words">
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
