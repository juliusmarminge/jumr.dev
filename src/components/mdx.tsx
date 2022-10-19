import Link from "next/link";
import React from "react";
import { BsClipboard } from "react-icons/bs";
import { RiCheckboxCircleLine } from "react-icons/ri";

const NextLink: React.FC<{
  href: string;
  className?: string;
  children: React.ReactNode;
}> = ({ href, children, className }) => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};

const CodeBlock: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef<HTMLPreElement>(null);

  return (
    <pre
      ref={inputRef}
      style={{ fontFamily: "JetBrains Mono" }}
      className="group relative overflow-auto rounded-b-md"
    >
      <code>{children}</code>

      <button
        className="border-1 absolute top-1 right-1 hidden aspect-square items-center justify-center rounded-md bg-inherit p-2 group-hover:flex hover:text-gray-400"
        onClick={() => {
          void navigator.clipboard.writeText(
            inputRef.current?.textContent ?? "",
          );
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1500);
        }}
      >
        <label className="swap swap-rotate items-center">
          <input type="checkbox" checked={copied} onChange={() => void 0} />

          <BsClipboard className="swap-off h-6 w-6 p-[0.2rem] text-stone-300" />
          <RiCheckboxCircleLine className="swap-on h-6 w-6 text-green-600" />
        </label>
      </button>
    </pre>
  );
};

export const components = {
  a: NextLink,
  pre: CodeBlock,
};
