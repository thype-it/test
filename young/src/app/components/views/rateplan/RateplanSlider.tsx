import { ReactNode, forwardRef } from "react";
import Image from "next/image";

import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type Props = {
  length: number;
  calculatedValue: number | undefined;
  unit: "data" | "speed" | "voice";
  value: number;
  handleChange: (newValue: number, unit: "data" | "speed" | "voice") => void;
  hasMarks?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
};

export default function RateplanSlider({
  length,
  calculatedValue,
  unit,
  value,
  handleChange,
  hasMarks,
  isDisabled = false,
  children,
}: Props) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full justify-between pb-4">
        <p>{children}</p>
        {calculatedValue && (
          <p>
            {calculatedValue === -1
              ? "Nekonecno"
              : `${calculatedValue}${unitFormat(calculatedValue, unit)}`}
          </p>
        )}
      </div>
      <div className="w-full">
        <Slider
          min={0}
          max={length}
          step={1}
          value={[value]}
          onValueChange={handleSliderChange}
          disabled={isDisabled}
        />
      </div>
    </div>
  );

  function unitFormat(value: number, unit: "data" | "speed" | "voice") {
    if (unit === "data") {
      return " GB";
    }

    if (unit === "speed") {
      return " Mbps";
    }

    if (unit === "voice") {
      return value ? `+${value}` : "";
    }
  }

  function handleSliderChange(value: number[]) {
    if (value.length) {
      handleChange(value[0], unit);
    }
  }
}

const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[0.19056rem] w-full grow overflow-hidden rounded-full bg-[#d7cdd1]">
      <SliderPrimitive.Range className="absolute h-full bg-[#E30074]" />
    </SliderPrimitive.Track>
    <div className="absolute flex h-4 w-full justify-between">
      <div className="h-4 w-4 rounded-full bg-[#E30074]"></div>
      <div className="h-4 w-4 rounded-full bg-[#E30074]"></div>
      <div className="h-4 w-4 rounded-full bg-[#E30074]"></div>
      {/* <div className="h-4 w-4 rounded-full bg-[#E30074]"></div> */}
    </div>
    <SliderPrimitive.Thumb
      className="flex h-[1.71025rem] w-[1.71025rem] items-center justify-center rounded-full border-[0.24rem]
        border-white bg-[#E30074] ring-offset-white transition-colors focus-visible:outline-none
        disabled:pointer-events-none disabled:opacity-50"
    >
      <Image alt="thumb-icon" width={13} height={13} src="/slider-thumb-icon.svg" />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;
