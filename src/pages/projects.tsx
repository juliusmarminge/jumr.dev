import { type NextPage } from "next";
import Head from "next/head";

const ProjectsPage: NextPage = () => {
  return (
    <>
      <Head key="projects">
        <title>Projects</title>
      </Head>
      <div className="p-8 card roundex-box bg-base-200">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>
        <p className="py-2">
          Coming soon...
        </p>
      </div>
    </>
  );
};

export default ProjectsPage;
