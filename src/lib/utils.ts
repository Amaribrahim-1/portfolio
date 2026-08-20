import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const focusRingClassName =
  "focus-visible:rounded-sm focus-visible:text-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
