import "../styles/globals.css";
import { type ReactNode } from "react";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
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

export const metadata = {
  title: "Julius | Marminge Software",
  description: "Software Developer & OSS Enthusiast",
  icons: [{ url: "/favicon.ico" }],
  openGraph: {
    images: [{ url: "/og-image" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "/og-image" }],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <body
        className={clsx(
          "scroll-smooth bg-stone-800 font-sans text-zinc-50 antialiased scrollbar-none",
          cal.variable,
          inter.variable,
        )}
      >
        <main className="container mx-auto flex-1 px-1 md:px-4">
          {children}
        </main>
      </body>
      <Analytics />
    </html>
  );
}
