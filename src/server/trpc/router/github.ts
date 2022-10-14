import { z } from "zod";
import { env } from "~/env/server.mjs";

import { Octokit } from "@octokit/rest";

import { t } from "../utils";

// This is the shape from the Github API
const RepoValidator = z.object({
  name: z.string(),
  full_name: z.string(),
  description: z.string(),
  html_url: z
    .string()
    .url()
    .transform((url) => (url.startsWith("https://") ? url : "https://" + url)),
  homepage: z
    .string()
    .transform((url) => (url.startsWith("https://") ? url : "https://" + url)),
  language: z.string(),
  stargazers_count: z.number(),
});
type Repo = z.infer<typeof RepoValidator>;

export const githubRouter = t.router({
  getRepos: t.procedure
    .input(z.array(z.object({ repo: z.string(), owner: z.string() })))
    .query(async ({ input }) => {
      const octokit = new Octokit({ auth: env.OCTOKIT_TOKEN });
      const repos: Repo[] = [];

      for (const { repo, owner } of input) {
        const _repo = await octokit.rest.repos.get({ owner, repo });
        repos.push(RepoValidator.parse(_repo.data));
      }

      return repos;
    }),
});
