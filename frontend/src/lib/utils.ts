import { type ClassValue, clsx } from 'clsx.ts';
import { twMerge } from 'tailwind-merge.ts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
