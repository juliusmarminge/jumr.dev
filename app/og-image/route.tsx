/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { type ImageResponseOptions } from "@vercel/og/dist/types";
import { getFont } from "app/og-image/get-fonts";
import { ogParams } from "app/og-image/zod-params";

export const config = {
  runtime: "edge",
};

export const GET = async (req: Request) => {
  const inter = await getFont({
    family: "Inter",
    weights: [400, 700],
  });

  const url = new URL(req.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const profileImgSrc = `${baseUrl}/images/profile.png`;

  const options: ImageResponseOptions = {
    width: 1200,
    height: 600,
    fonts: [
      { name: "Inter", data: inter[400], weight: 400 },
      { name: "Inter", data: inter[700], weight: 700 },
    ],
  };

  if (!Object.keys(Object.fromEntries(url.searchParams)).length)
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
              src={profileImgSrc}
              width="300px"
              height="300px"
              alt="profile"
              tw="rounded-full"
            />
          </div>
        </div>
      ),
      options,
    );

  const params = ogParams.decodeRequest(req);
  if (!params.success)
    return new Response("Invalid params" + params.error.toString(), {
      status: 400,
    });
  const props = params.data.input;

  return new ImageResponse(
    (
      <div tw="bg-[#292524] h-full w-full text-stone-300 flex justify-around p-4 font-[Inter]">
        <div tw="flex flex-col justify-center items-center h-full">
          <p tw="pt-6 my-0 text-yellow-600 font-bold flex self-start">
            <span>{props.date}</span>
            <span tw="mx-2">•</span>
            <span>{props.readingTime} min read</span>
          </p>
          <h1 tw="text-6xl font-bold max-w-2xl">{props.title}</h1>
          <p tw=" text-2xl my-0 font-normal max-w-2xl">{props.description}</p>
          <p tw="pt-2 my-0 text-yellow-600 font-bold flex self-start">
            <span>
              {baseUrl}
              {props.slug}
            </span>
          </p>
        </div>
        <div tw="flex items-center h-full">
          <img
            src={profileImgSrc}
            width="256px"
            height="256px"
            alt="profile"
            tw="rounded-full"
          />
        </div>
      </div>
    ),
    options,
  );
};
