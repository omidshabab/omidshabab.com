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

export function createSlug(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .normalize("NFKD") // Normalize the string
    .trim() // Remove leading and trailing whitespace
    .replace(/[^\u0600-\u06FF\w\s-]/g, "") // Remove special characters, but keep Persian characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
}

export const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isValidLocale = (locale: string): locale is "en" | "fa" => {
  return locale === "en" || locale === "fa";
};
