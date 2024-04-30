import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};

export const toastError = (error: unknown, title?: string) => {
  const description = error instanceof Error ? error.message : String(error);
  toast.error(title || "An error occured.", { description });
};

export const fullName = (data: { firstName: string; lastName: string }) => {
  return [data.firstName, data.lastName].filter(Boolean).join(" ");
};

export const secondsToTime = (seconds: number) => {
  const h = String(Math.floor((seconds % (3600 * 24)) / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  // const s = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${h}:${m}`;
};

export const curDate = (format: string = "YYYY-MM-DD") =>
  dayjs().format(format);
