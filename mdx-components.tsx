import * as React from 'react';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';

import { Callout } from '~/components/callout';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="scroll-m-20 font-cal text-4xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 scroll-m-20 border-b border-b-zinc-200 pb-2 font-cal text-3xl transition-colors first:mt-0 dark:border-b-zinc-700">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 scroll-m-20 font-cal text-2xl text-stone-200">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
    ),
    a: ({ children, href }) => {
      const isExternal = href?.startsWith('http');
      const Component = isExternal ? 'a' : Link;
      return (
        <Component href={href as string} className="text-accent-500 underline">
          {children}
        </Component>
      );
    },
    ul: ({ children }) => <ul className="mt-4 list-disc pl-8">{children}</ul>,
    code: ({ children }) => (
      <code className="relative rounded bg-stone-200 py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold text-zinc-900 dark:bg-stone-700 dark:text-stone-200">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="relative my-4 rounded bg-stone-200 py-4 px-6 font-mono text-sm font-semibold text-zinc-900 dark:bg-stone-700 dark:text-zinc-300">
        {children}
      </pre>
    ),

    Callout,
    ...components,
  };
}
