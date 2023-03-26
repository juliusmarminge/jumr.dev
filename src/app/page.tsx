import Link from "next/link";
import { FaArrowAltCircleUp } from "react-icons/fa";

// import { Projects } from "~/components/projects";
import { getAllArticles } from "~/lib/blog";
import { About } from "~/components/about";
import { Blog } from "~/components/blog";
import { ExperienceSection } from "~/components/experience";
import { FinalWords } from "~/components/final-words";
import { Header } from "~/components/header";
import { Hero } from "~/components/hero";

export default async function Home() {
  const posts = await getAllArticles();

  return (
    <div className="z-0 overflow-x-hidden text-white">
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

      {/* <section id="projects">
        <Projects />
      </section> */}

      <section id="final-words">
        <FinalWords />
      </section>
    </div>
  );
}
