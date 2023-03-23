"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { BiLinkExternal } from "react-icons/bi";

import CT3TPreview from "../../public/images/ct3t.png";
import PFVPreview from "../../public/images/pfv.png";
import StocksPreview from "../../public/images/stocks.png";
import SVPreview from "../../public/images/sv.png";

interface ProjectProps {
  img: string | StaticImageData;
  title: string;
  description: string[];
  previewLink: string;
  githubLink: string;
}

const ProjectCard: React.FC<ProjectProps> = (props) => {
  return (
    <div className="flex h-[85vh] w-full flex-shrink-0 snap-start flex-col items-center justify-start space-y-5 p-20 md:p-40">
      <motion.div
        initial={{ opacity: 0, y: -300 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Image
          src={props.img}
          alt={props.title}
          className="mx-auto aspect-video w-full"
        />
      </motion.div>
      <div className="max-w-6xl px-0">
        <h4 className="py-4 text-center text-4xl font-semibold">
          {props.title}
        </h4>
        {props.description.map((desc, idx) => (
          <p
            key={`desc-${idx}`}
            className="py-2 text-center text-lg md:text-left"
          >
            {desc}
          </p>
        ))}
        <div className="flex flex-row justify-center space-x-5 py-5 md:justify-start">
          <a
            href={props.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-stone-900 py-3 px-4 text-lg font-semibold text-accent-500 hover:bg-stone-900/70"
          >
            Preview
            <BiLinkExternal />
          </a>
          <a
            href={props.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-stone-900 py-3 px-4 text-lg font-semibold text-accent-500 hover:bg-stone-900/70"
          >
            GitHub
            <BiLinkExternal />
          </a>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const projects: ProjectProps[] = [
    {
      img: CT3TPreview,
      title: "Create T3 Turbo",
      description: [
        "Create T3 Turbo is a clean and simple starter repo using the T3 Stack along with Expo React Native. " +
          "It uses the T3 Stack, but has separated all the pieces out to make use of Turborepo caching, " +
          "and to enable the tRPC API and Prisma Client to be reused for multiple applications.",
        "It comes with two applications; a Next.js for the web, and a Expo React Native for mobile, " +
          "but can be easily extended to include more to suit your needs.",
      ],
      previewLink: "https://create-t3-turbo.vercel.app/",
      githubLink: "https://github.com/t3-oss/create-t3-turbo",
    },
    {
      img: StocksPreview,
      title: "Stocks",
      description: [
        "A web app where you can track all your stock purchases at one place.",
        "I started building this app since I wanted a single place where I " +
          "could track all my stock purchases, since they are spread around " +
          "different apps and websites.",
        "This app is a work in progress and I tend to work a bit on it when I have time." +
          "It's currently very basic, but I plan to add more features in the future.",
      ],
      previewLink: "https://stocks.jumr.dev/",
      githubLink: "https://github.com/juliusmarminge/stocks",
    },
    {
      img: PFVPreview,
      title: "Pathfinding Visualizer",
      description: [
        "A simple visualizer of different pathfinding algorithms.",
        "This project was created to help me understand how pathfinding algorithms work, and to help me learn React. " +
          "It was initially wrote using class components and `create-react-app`, " +
          "but I have since rewritten it using functional components and Vite. " +
          "I've been meaning to add more algorithms, but it's not a priority I have at the moment.",
      ],
      previewLink: "https://pfv.jumr.dev/",
      githubLink: "https://github.com/juliusmarminge/pathfinding-visualizer",
    },
    {
      img: SVPreview,
      title: "Sorting Visualizer",
      description: [
        "Visualizer for visualizing sorting algorithms." +
          "Very similar to the Pathfinding Visualizer, but for sorting algorithms. ",
      ],
      previewLink: "https://sv.jumr.dev/",
      githubLink: "https://github.com/juliusmarminge/sorting-visualizer",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="section-container"
    >
      <h3 className="section-title">Projects</h3>

      <div className="absolute  top-1/3 left-0 h-[500px] w-full -skew-y-12 bg-accent-500/10" />

      <div className="relative z-20 flex w-full snap-x snap-mandatory overflow-x-scroll overflow-y-hidden scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-accent-500/80">
        {projects.map((project, idx) => (
          <ProjectCard key={`project-card-${idx}`} {...project} />
        ))}
      </div>
    </motion.div>
  );
};
