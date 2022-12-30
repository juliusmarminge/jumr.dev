/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

import { getFont } from "~/lib/og-fonts";

export const config = {
  runtime: "experimental-edge",
};

export default async (req: Request) => {
  const url = new URL(req.url);
  const inter = await getFont({
    family: "Inter",
    weights: [400, 700] as const,
  });

  return new ImageResponse(
    (
      <div tw="bg-[#292524] h-full w-full text-stone-300 flex justify-around p-14 font-[Inter]">
        <div tw="flex flex-col justify-center items-center h-full">
          <h1 tw="pt-6 text-6xl font-bold">Julius Marminge</h1>
          <h2 tw="pt-2 text-3xl my-0 font-normal">Software Developer</h2>
          <h2 tw="pt-2 text-3xl my-0 font-normal">& OSS Enthusiast</h2>
        </div>
        <div tw="flex items-center h-full">
          <img
            src={`${url.protocol}//${url.host}/profile.png`}
            width="300px"
            height="300px"
            alt="profile"
            tw="rounded-full"
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        { name: "Inter", data: inter[400], weight: 400 },
        { name: "Inter", data: inter[700], weight: 700 },
      ],
    },
  );
};
