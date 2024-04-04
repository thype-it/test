import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isArrayOfNumbers(x: unknown): x is number[] {
  return Array.isArray(x) && x.every(y => typeof y === "number");
}
