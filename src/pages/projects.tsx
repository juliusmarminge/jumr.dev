import { InferGetStaticPropsType, type NextPage } from "next";
import { z } from "zod";
import Head from "next/head";
import React from "react";
import { AiOutlineStar, AiOutlineGithub } from "react-icons/ai";
import { SiTypescript } from "react-icons/si";
import Image, { StaticImageData } from "next/image";

import { NextLink } from "~/components/next-link";
import StocksPreview from "../../public/images/stocks.png";
import PfvPreview from "../../public/images/pfv.png";
import SvPreview from "../../public/images/sv.png";
import CT3APreview from "../../public/images/ct3a.png";
import TRPCPreview from "../../public/images/trpc.png";
import CT3TPreview from "../../public/images/ct3t.png";

const REPOS = {
  personal: [
    { name: "juliusmarminge/stocks", img: StocksPreview },
    { name: "juliusmarminge/pathfinding-visualizer", img: PfvPreview },
    { name: "juliusmarminge/sorting-visualizer", img: SvPreview },
    { name: "juliusmarminge/create-t3-turbo", img: CT3TPreview },
  ],
  oss: [
    { name: "t3-oss/create-t3-app", img: CT3APreview },
    { name: "trpc/trpc", img: TRPCPreview },
  ],
} as const;

const ProjectSection: React.FC<{
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => {
  return (
    <div className="py-4">
      <h2 className="py-1 text-2xl font-bold">{title}</h2>
      <p className="text-md pb-4">{description}</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">{children}</div>
    </div>
  );
};

const LanguageIcon: React.FC<{ language: string }> = ({ language }) => {
  if (language.toLowerCase() === "typescript") {
    return <SiTypescript className="text-lg text-blue-500" />;
  }
  // TODO: Add more languages
  return null;
};

const ProjectCard: React.FC<{ repo: Repo }> = ({ repo }) => {
  // FIXME: Smell. Doesn't seem to work to use the object's one
  const img =
    repo.full_name === "juliusmarminge/stocks"
      ? StocksPreview
      : repo.full_name === "juliusmarminge/pathfinding-visualizer"
      ? PfvPreview
      : repo.full_name === "juliusmarminge/sorting-visualizer"
      ? SvPreview
      : repo.full_name === "t3-oss/create-t3-app"
      ? CT3APreview
      : repo.full_name === "trpc/trpc"
      ? TRPCPreview
      : repo.full_name === "juliusmarminge/create-t3-turbo"
      ? CT3TPreview
      : null;
  if (!img) throw new Error("Add a preview img for repo " + repo.full_name);
  return (
    <div className="rounded-lg bg-base-300 p-4 hover:bg-base-200 ">
      <h3 className="text-xl font-bold">{repo.name}</h3>
      <p className="text-md">{repo.description}</p>
      <NextLink href={repo.homepage || repo.html_url}>
        <h4>Check it out!</h4>
        <Image
          src={img}
          alt="Preview"
          placeholder="blur"
          className="aspect-video w-full"
        />
      </NextLink>

      <div className="flex justify-between">
        <div className="flex items-center gap-4 py-4">
          <div className="flex items-center gap-1">
            <AiOutlineStar className="text-lg text-yellow-500" />
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

const ProjectsPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ repos }) => {
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
  homepage: z.string(),
  language: z.string(),
  stargazers_count: z.number(),
});
// then w e add the preview image to that shape
type Repo = z.infer<typeof RepoValidator> & { img: StaticImageData };

export const getStaticProps = async () => {
  const repos: Record<keyof typeof REPOS, Repo[]> = { personal: [], oss: [] };

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
        img: StocksPreview,
      },
      {
        name: "pathfinding-visualizer",
        full_name: "juliusmarminge/pathfinding-visualizer",
        description: "A pathfinding visualizer",
        html_url: "https://github.com/juliusmarminge/pathfinding-visualizer",
        homepage: "https://pfv.jumr.dev",
        language: "TypeScript",
        stargazers_count: 19,
        img: PfvPreview,
      },
      {
        name: "sorting-visualizer",
        full_name: "juliusmarminge/sorting-visualizer",
        description: "A sorting visualizer",
        html_url: "https://github.com/juliusmarminge/sorting-visualizer",
        homepage: "https://sv.jumr.dev",
        language: "TypeScript",
        stargazers_count: 0,
        img: SvPreview,
      },
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
