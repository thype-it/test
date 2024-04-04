import { MotionValue, motion, useTransform } from "framer-motion";

type Props = {
  progressValue: MotionValue<number>;
  stories: number;
  currentIndex: number;
  delay: number;
};

export default function StoryProgress({ progressValue, stories, currentIndex, delay }: Props) {
  const barProgress = useTransform(progressValue, [0, delay], ["0%", "100%"]);

  return (
    <div className="flex justify-between gap-1">
      {Array.from(Array(stories)).map((_, index) => (
        <div key={index} className="relative h-1 w-full flex-1 rounded-[1.5rem] bg-white/30">
          {index < currentIndex && (
            <div className="absolute z-20 h-1 w-full flex-1 rounded-[1.5rem] bg-white"></div>
          )}
          {index === currentIndex && (
            <motion.div
              className="absolute z-20 h-1 flex-1 rounded-[1.5rem] bg-white"
              initial={{ width: "0%" }}
              style={{ width: barProgress }}
            ></motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
