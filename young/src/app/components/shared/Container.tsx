import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return <div className={cn("container mx-auto h-full w-full", className)}>{children}</div>;
}
