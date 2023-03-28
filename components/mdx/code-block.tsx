"use client";

import { useRef, useState, type DetailedHTMLProps } from "react";
import clsx from "clsx";
import { BsTerminal } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { SiJavascript, SiPrisma, SiReact, SiTypescript } from "react-icons/si";
import { TbCopy } from "react-icons/tb";
import { VscJson } from "react-icons/vsc";

export function Codeblock(
  props: DetailedHTMLProps<
    React.HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  >,
) {
  const language = props["data-language" as keyof typeof props] as string;
  const Icon = {
    js: SiJavascript,
    ts: SiTypescript,
    tsx: SiReact,
    bash: BsTerminal,
    json: VscJson,
    prisma: SiPrisma,
  }[language];

  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  return (
    <>
      {Icon && (
        <Icon
          data-language-icon
          className="absolute left-4 top-4 z-20 hidden h-5 w-5 text-zinc-400"
        />
      )}
      <div
        onClick={() => {
          if (typeof window === "undefined" || !ref.current) return;
          setCopied(true);
          void window.navigator.clipboard.writeText(ref.current.innerText);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="absolute right-2 top-[10px] z-20 h-8 w-8 cursor-pointer rounded p-1 text-gray-400 hover:bg-stone-800/70"
      >
        <TbCopy
          className={clsx(
            "absolute h-6 w-6 p-0 transition-all",
            copied && "scale-0",
          )}
        />
        <FaCheck
          className={clsx(
            "absolute h-6 w-6 scale-0 p-1 transition-all",
            copied && "scale-100",
          )}
        />
      </div>
      <pre
        ref={ref}
        className="relative my-4 overflow-x-scroll rounded-lg border border-zinc-400 bg-stone-200 p-4 font-mono text-sm font-semibold text-zinc-900 dark:bg-stone-700 dark:text-zinc-300"
      >
        {props.children}
      </pre>
    </>
  );
}
