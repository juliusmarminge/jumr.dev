import { NextApiRequest, NextApiResponse } from "next";

import { env } from "~/lib/env.mjs";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ NEXTAUTH_URL: env.NEXTAUTH_URL });
};
