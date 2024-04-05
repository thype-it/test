import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ children, className }: Props) {
  return (
    <section className={cn("flex w-full items-center", className)}>
      <div className="container w-full p-0">{children}</div>
    </section>
  );
}
