import React from "react";

import { NextPage } from "next";
import Head from "next/head";
import superjson from "superjson";
import { ProjectCard } from "~/components/project";
import { appRouter } from "~/server/trpc/router";
import { trpc } from "~/utils/trpc";

import { createProxySSGHelpers } from "@trpc/react/ssg";

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });
  await Promise.all([
    ssg.github.getRepos.fetch(previewRepos.personal),
    ssg.github.getRepos.fetch(previewRepos.oss),
  ]);

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 86400,
  };
};

const previewRepos = {
  personal: [
    { repo: "stocks", owner: "juliusmarminge" },
    { repo: "create-t3-turbo", owner: "t3-oss" },
    { repo: "pathfinding-visualizer", owner: "juliusmarminge" },
    { repo: "sorting-visualizer", owner: "juliusmarminge" },
  ],
  oss: [
    { repo: "create-t3-app", owner: "t3-oss" },
    { owner: "trpc", repo: "trpc" },
  ],
};

const ProjectsPage: NextPage = () => {
  const { data: pRepos } = trpc.github.getRepos.useQuery(previewRepos.personal);
  const { data: oRepos } = trpc.github.getRepos.useQuery(previewRepos.oss);

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
          {pRepos?.map((repo) => (
            <ProjectCard key={repo.name} repo={repo} />
          ))}
        </ProjectSection>
        <ProjectSection
          title="Open Source"
          description="These are some Open Source projets I maintain or contribute a lot to."
        >
          {oRepos?.map((repo) => (
            <ProjectCard key={repo.name} repo={repo} />
          ))}
        </ProjectSection>
      </div>
    </>
  );
};

export default ProjectsPage;

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
