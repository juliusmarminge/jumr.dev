import { type ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-2xl overflow-x-hidden py-16 text-zinc-900 dark:text-zinc-100">
      {props.children}
    </div>
  );
}
