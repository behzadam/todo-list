import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

/**
 * Shadcn util function that merges classes
 * @param inputs
 * @returns
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a short date format.
 * We can also use next-intl:
 * {@link} https://next-intl-docs.vercel.app/docs/usage/dates-times
 *
 * @param dateString the given full date
 * @returns for example: Aug 11, 2024
 */
export function formatDateShort(dateString?: string | null) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleString("en-US", options);
}

/**
 *  Generates UUID
 * @returns for example: 141404e5-f231-4576-9e6f-7aba8b2c0159
 */
export function generateUUID() {
  return uuidv4();
}
