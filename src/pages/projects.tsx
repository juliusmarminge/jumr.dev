import { InferGetStaticPropsType, type NextPage } from "next";
import { z } from "zod";
import Head from "next/head";
import React from "react";
import { AiOutlineStar, AiOutlineGithub } from "react-icons/ai";
import { SiTypescript } from "react-icons/si";
import Image from "next/future/image";
import { NextLink } from "../components/next-link";

const REPOS = {
  personal: [
    { name: "juliusmarminge/stocks", img: "stocks.png" },
    { name: "juliusmarminge/pathfinding-visualizer", img: "pfv.png" },
    { name: "juliusmarminge/sorting-visualizer", img: "sv.png" },
  ],
  oss: [
    { name: "t3-oss/create-t3-app", img: "ct3a.png" },
    { name: "trpc/trpc", img: "trpc.png" },
  ],
} as const;

const ProjectSection: React.FC<{
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => {
  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold py-1">{title}</h2>
      <p className="text-md pb-4">{description}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{children}</div>
    </div>
  );
};

const LanguageIcon: React.FC<{ language: string }> = ({ language }) => {
  if (language.toLowerCase() === "typescript") {
    return <SiTypescript className="text-blue-500 text-lg" />;
  }
  // TODO: Add more languages
  return null;
};

const ProjectCard: React.FC<{ repo: Repo }> = ({ repo }) => {
  return (
    <div className="p-4 bg-base-300 hover:bg-base-200 rounded-lg ">
      <h3 className="text-xl font-bold">{repo.name}</h3>
      <p className="text-md">{repo.description}</p>
      <NextLink href={repo.homepage}>
        <h4>Check it out!</h4>
        <Image
          src={`/images/previews/${repo.img}`}
          alt="Preview"
          height={720}
          width={1280}
          className="w-full aspect-video"
        />
      </NextLink>

      <div className="flex justify-between">
        <div className="flex py-4 items-center gap-4">
          <div className="flex items-center gap-1">
            <AiOutlineStar className="text-yellow-500 text-lg" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <LanguageIcon language={repo.language} />
            <span>{repo.language}</span>
          </div>
        </div>
        <div className="flex items-center">
          <NextLink href={repo.html_url} className="btn btn-ghost">
            <AiOutlineGithub className="text-3xl" />
          </NextLink>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  repos,
}) => {
  return (
    <>
      <Head key="projects">
        <title>Projects</title>
      </Head>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <ProjectSection
          title="Personal"
          description=" These are some projects that I have built on my spare time as hobby
            projects."
        >
          {repos.personal.map((repo) => (
            <ProjectCard key={repo.name} repo={repo} />
          ))}
        </ProjectSection>
        <ProjectSection
          title="Open Source"
          description="These are some Open Source projets I often contribute to. Some I even maintain."
        >
          {repos.oss.map((repo) => (
            <ProjectCard key={repo.name} repo={repo} />
          ))}
        </ProjectSection>
      </div>
    </>
  );
};

export default ProjectsPage;

// This is the shape from the Github API
const RepoValidator = z.object({
  name: z.string(),
  full_name: z.string(),
  description: z.string(),
  html_url: z.string().url(),
  homepage: z.string().url(),
  language: z.string(),
  stargazers_count: z.number(),
});
// then we add the preview image to that shape
type Repo = z.infer<typeof RepoValidator> & { img: string };

export const getStaticProps = async () => {
  let repos: Record<keyof typeof REPOS, Repo[]> = { personal: [], oss: [] };

  if (process.env.NODE_ENV === "development") {
    // to prevent rate-limiting during dev
    repos.personal.push(
      {
        name: "stocks",
        full_name: "juliusmarminge/stocks",
        description: "A stock market simulator",
        html_url: "https://github.com/juliusmarminge/stocks",
        homepage: "https://stocks.jumr.dev",
        language: "TypeScript",
        stargazers_count: 42069,
        img: "stocks.png",
      },
      {
        name: "pathfinding-visualizer",
        full_name: "juliusmarminge/pathfinding-visualizer",
        description: "A pathfinding visualizer",
        html_url: "https://github.com/juliusmarminge/pathfinding-visualizer",
        homepage: "https://pfv.jumr.dev",
        language: "TypeScript",
        stargazers_count: 19,
        img: "pfv.png",
      },
      {
        name: "sorting-visualizer",
        full_name: "juliusmarminge/sorting-visualizer",
        description: "A sorting visualizer",
        html_url: "https://github.com/juliusmarminge/sorting-visualizer",
        homepage: "https://sv.jumr.dev",
        language: "TypeScript",
        stargazers_count: 0,
        img: "sv.png",
      }
    );
    return { props: { repos } };
  }

  for (const repo of REPOS.personal) {
    const repoRes = await (
      await fetch(`https://api.github.com/repos/${repo.name}`)
    ).json();
    const validated = RepoValidator.safeParse(repoRes);
    if (validated.success) {
      repos.personal.push({ ...validated.data, img: repo.img });
    }
  }

  for (const repo of REPOS.oss) {
    const repoRes = await (
      await fetch(`https://api.github.com/repos/${repo.name}`)
    ).json();
    const validated = RepoValidator.safeParse(repoRes);
    if (validated.success) {
      repos.oss.push({ ...validated.data, img: repo.img });
    }
  }

  return {
    props: {
      repos,
    },
    revalidate: 86400,
  };
};
