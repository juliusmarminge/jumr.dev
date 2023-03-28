import { type ReactNode } from "react";

import { Header } from "~/components/header";

export default function Layout(props: { children: ReactNode }) {
  return (
    <>
      <Header animate={false} />
      <div className="mx-auto w-full max-w-2xl overflow-x-hidden py-16 text-zinc-900 dark:text-zinc-100">
        {props.children}
      </div>
    </>
  );
}
