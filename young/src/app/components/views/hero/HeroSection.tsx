"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.6], [7, 4, 2, 0.8]);

  return (
    <section className="relative h-screen w-full">
      <Image alt="" src="/header-background.png" fill />
    </section>
  );
}
