import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Section({ children }: Props) {
  return (
    <section className="flex h-screen w-full items-center">
      <div className="container w-full p-0">{children}</div>
    </section>
  );
}
