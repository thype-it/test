"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

type Props = {
  /**
   * Defaults to `2`
   */
  level?: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
};

export default function HeadingMotion({ level = 2, children }: Props) {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "0px 0px -200px 0px", once: true });

  const variants = {
    visible: {
      opacity: [0, 1, 1],
      letterSpacing: ["-1px", "4px", "4px"],
      transition: {
        duration: 2,
        times: [0, 0.3, 1],
      },
      transitionEnd: {
        opacity: 1,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      ref={ref}
      variants={variants}
      animate={isInView ? "visible" : "hidden"}
    >
      <Heading className="text-primary w-full text-center text-3xl font-bold uppercase">
        {children}
      </Heading>
    </motion.div>
  );
}
