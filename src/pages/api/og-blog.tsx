/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';

import { getFont } from '~/lib/og-fonts';
import { blogParams } from '~/lib/zod-params';

export const config = {
  runtime: 'experimental-edge',
};

export default async (req: Request) => {
  const url = new URL(req.url);
  const inter = await getFont({
    family: 'Inter',
    weights: [400, 700] as const,
  });

  const params = blogParams.decodeRequest(req);
  if (!params.success)
    return new Response('Invalid params' + params.error.toString(), {
      status: 400,
    });
  const props = params.data.input;

  const baseUrl = `${url.protocol}//${url.host}`;

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
            src={`${url.protocol}//${url.host}/profile.png`}
            width="256px"
            height="256px"
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
        { name: 'Inter', data: inter[400], weight: 400 },
        { name: 'Inter', data: inter[700], weight: 700 },
      ],
    },
  );
};
