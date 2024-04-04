"use client";

import { ReactNode, useState } from "react";
import { useInterval } from "react-use";
import StoryProgress from "./StoryProgress";
import { useMotionValue, motion } from "framer-motion";
import Image from "next/image";

type Props = {
  stories: number;
  headline: string;
  children: ReactNode;
};

const images = ["one.png", "two.png", "three.png"];

export default function StorySection({ stories, headline, children }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [delay, setDelay] = useState(7000);
  const [milliseconds, setMilliseconds] = useState(0);
  const progressValue = useMotionValue(0);

  function handleNextIndex() {
    if (currentIndex === stories - 1) {
      setCurrentIndex(-1);
    }
    setCurrentIndex(prevIndex => prevIndex + 1);
    setMilliseconds(0);
  }

  function handlePrevIndex() {
    if (currentIndex === 0) {
      setCurrentIndex(stories);
    }
    setCurrentIndex(prevIndex => prevIndex - 1);
    setMilliseconds(0);
  }

  useInterval(
    () => {
      handleNextIndex();
    },
    paused ? null : delay - milliseconds,
  );

  useInterval(
    () => {
      setMilliseconds(prevState => prevState + 4);
      progressValue.set(milliseconds);
    },
    paused ? null : 4,
  );

  return (
    <>
      <div
        className="relative min-h-96 w-full bg-black"
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onTouchEnd={() => setPaused(false)}
      >
        <motion.div
          className="absolute z-10 w-full px-4 pt-5"
          variants={{
            visible: { opacity: 1 },
            hidden: {
              opacity: 0,
              transition: {
                duration: 0.1,
                delay: 0.5,
              },
            },
          }}
          animate={paused ? "hidden" : "visible"}
        >
          <StoryProgress
            progressValue={progressValue}
            stories={stories}
            currentIndex={currentIndex}
            delay={delay}
          />
        </motion.div>
        <>
          {images.map((image, index) => {
            return (
              currentIndex === index && (
                <Image
                  className="h-full w-full object-cover"
                  key={image}
                  alt="current image"
                  src={`/${image}`}
                  fill
                />
              )
            );
          })}
        </>
      </div>
      <button type="button" onClick={handleNextIndex}>
        next
      </button>
      <button type="button" onClick={handlePrevIndex}>
        prev
      </button>
    </>
  );
}
