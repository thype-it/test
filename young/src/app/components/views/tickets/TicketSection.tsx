"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Section from "../../shared/Section";
import Container from "../../shared/Container";
import { cn } from "@/lib/utils";

type Props = {};

export default function TicketSection({}: Props) {
  const constraintsRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [endPosition, setEndPosition] = useState(0);
  const x = useMotionValue(0);

  const scale = useTransform(x, [-200, 10, 800], [0.9, 1, 1]);
  const opacity = scale;
  console.log("scale :", x);

  const [items, setItems] = useState([
    "bg-red-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-yellow-500",
  ]);

  const frontCard = {
    hidden: {
      //exit aniamtion
      opacity: [1, 0, 0],
      x: [x.get(), -800, -800],
      transition: {
        duration: 3,
        times: [0, 0.5, 1],
      },
      transitionEnd: {
        x: 10,
        y: -60,
        opacity: 0,
      },
    },

    visible: {
      //default
      opacity: 1,
    },
  };

  const rest = {
    hidden: {
      //default
      x: 10,
    },

    visible: {
      //entry animation
      x: [10, 0],
      transition: {
        duration: 2,
      },
      transitionEnd: {
        x: 0,
      },
    },
  };

  return (
    <Section className="relative h-screen">
      <Container className="relative">
        {items.map((item, i) => {
          if (i === 0) {
            return (
              <div
                className="absolute bottom-0 left-0 right-0 top-0 z-10 m-auto h-[45vh] w-[65vw]"
                ref={constraintsRef}
                key={item}
              >
                <motion.div
                  className={cn("bg-red h-full w-full rounded-2xl", items[i])}
                  drag="x"
                  style={{ x, scale, opacity }}
                  onDragEnd={(event, info) => {
                    console.log(info.point.x, info.point.y);
                    if (info.point.x < 0) {
                      // Animate next card
                      console.log("card :");
                      setIsActive(!isActive);
                      setEndPosition(info.point.x);
                    }
                  }}
                  dragConstraints={constraintsRef}
                  animate={isActive ? "hidden" : "visible"}
                  variants={frontCard}
                >
                  front
                </motion.div>
              </div>
            );
          } else {
            return (
              <motion.div
                initial={{ x: 10 * i }}
                className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[45vh] w-[65vw]"
                ref={constraintsRef}
                key={item}
                animate={isActive ? "visible" : "hidden"}
                variants={rest}
              >
                <div className={cn("bg-red h-full w-full rounded-2xl", item)} />
              </motion.div>
            );
          }
        })}
      </Container>
    </Section>
  );

  // setItems(items => {
  //   const updatedItems = [...items];
  //   const firstItem = updatedItems.shift();
  //   if (typeof firstItem === "string") {
  //     updatedItems.push(firstItem);
  //   }
  //   return updatedItems;
  // });
}
