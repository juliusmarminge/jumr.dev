import "../styles/globals.css";
import { type ReactNode } from "react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import clsx from "clsx";

import { CalEmbed } from "./cal-embed";

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

export const metadata = {
  title: "🇸🇪 Julius | SWE | OSS",
  icons: [{ url: "/seo/favicon.ico" }],
  openGraph: {
    images: [{ url: "/api/og" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "/api/og" }],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <body
        className={clsx(
          "min-h-screen bg-white font-sans text-zinc-900 antialiased dark:bg-stone-800 dark:text-zinc-50",
          cal.variable,
          inter.variable,
        )}
      >
        <main className="container mx-auto flex-1 px-4">
          {children}
          <CalEmbed />
        </main>
      </body>
    </html>
  );
}
