import Image from "next/future/image";
import {
  AiOutlineGithub,
  AiOutlineStar,
} from "react-icons/ai";
import { SiTypescript } from "react-icons/si";
import { InferTRPC } from "~/utils/trpc";

import CT3APreview from "../../public/images/ct3a.png";
import CT3TPreview from "../../public/images/ct3t.png";
import PfvPreview from "../../public/images/pfv.png";
import StocksPreview from "../../public/images/stocks.png";
import SvPreview from "../../public/images/sv.png";
import TRPCPreview from "../../public/images/trpc.png";
import { NextLink } from "./next-link";

const LanguageIcon: React.FC<{ language: string }> = ({ language }) => {
  if (language.toLowerCase() === "typescript") {
    return <SiTypescript className="text-lg text-blue-500" />;
  }
  // TODO: Add more languages
  return null;
};

export const ProjectCard: React.FC<{
  repo: InferTRPC["github"]["getRepos"]["output"][number];
}> = ({ repo }) => {
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
      : repo.full_name === "t3-oss/create-t3-turbo"
      ? CT3TPreview
      : null;
  if (!img) throw new Error(`Add a preview img for repo ${repo.full_name}`);
  return (
    <div className="rounded-lg bg-base-300 p-4 hover:bg-base-200 ">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold">{repo.name}</h3>
        <p className="text-md pb-4">{repo.description}</p>
      </div>

      <NextLink href={repo.homepage || repo.html_url}>
        <Image
          src={img}
          alt="Preview"
          placeholder="blur"
          className="aspect-video w-full rounded-lg"
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
