"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent } from "~/components/dialog";

export function InterceptModal(props: {
  children: ReactNode;
  className?: string;
}) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <Dialog open={mounted} onOpenChange={() => router.back()}>
      <DialogContent className={props.className}>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}
