import { customAlphabet } from "nanoid";

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export function absoluteUrl(path?: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${path}`;
}
export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};
