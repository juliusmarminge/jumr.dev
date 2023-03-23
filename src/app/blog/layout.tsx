import { type ReactNode } from 'react';

export default function Layout(props: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-2xl py-16 text-zinc-900 overflow-x-hidden dark:text-zinc-100">
      {props.children}
    </div>
  );
}
