import React from "react";
import { BiCopy } from "react-icons/bi";
import { RiCheckboxCircleLine } from "react-icons/ri";

import { NextLink } from "./next-link";

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
        className="border-1 absolute top-1 right-1 hidden aspect-square items-center justify-center rounded-md bg-inherit p-2 hover:text-gray-400 group-hover:flex"
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

          <BiCopy className="swap-off h-6 w-6" />
          <RiCheckboxCircleLine className="swap-on h-6 w-6 text-success" />
        </label>
      </button>
    </pre>
  );
};

export const components = {
  a: NextLink,
  pre: CodeBlock,
};
