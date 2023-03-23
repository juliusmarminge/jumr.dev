import "../styles/globals.css";
import { type ReactNode } from "react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cal = localFont({
  src: "../styles/calsans.ttf",
  variable: "--font-cal",
  display: "swap",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <head>
        <title>Julius Personal</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Your go-to place to find out how to find solutions to common problems."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-white font-sans text-zinc-900 antialiased dark:bg-stone-800 dark:text-zinc-50",
          cal.variable,
          inter.variable,
        )}
      >
        <main className="container mx-auto flex-1 px-4">{children}</main>
      </body>
    </html>
  );
}
