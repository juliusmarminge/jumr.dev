import React from "react";
import { NextLink } from "./next-link";

const CodeBlock: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <pre
      style={{ fontFamily: "JetBrains Mono" }}
      className="overflow-auto rounded-b-md"
    >
      <code>{children}</code>
    </pre>
  );
};

export const components = {
  a: NextLink,
  pre: CodeBlock,
};
