// Inspired, and some parts taken, by Theo's next-image-gen
// https://raw.githubusercontent.com/TheoBr/next-image-gen

// FIXME: Too large to run on lambda
//import chromium from "chrome-aws-lambda";
import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-core";
import { z } from "zod";

const imageGenHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const validated = z.string().url().safeParse(req.query.url);
  if (!validated.success) {
    return res.status(400).json(validated.error.flatten());
  }
  const url = validated.data;

  // Setup and go to requested page
  const browser = await puppeteer.launch();
  /* 
    process.env.AWS_EXECUTION_ENV
      ? {
          args: chromium.args,
          executablePath: await chromium.executablePath,
          headless: chromium.headless,
        }
      : {
          args: [],
          executablePath:
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        }*/

  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({ width: 1920, height: 1080 });

  // Take screenshot
  const data = await page.screenshot();

  // Close browser
  await browser.close();

  // Send response and cache it
  //res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.setHeader("Content-Type", "image/png");
  res.end(data);
};

export default imageGenHandler;
