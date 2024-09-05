import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from "bcrypt"
export const hashPassword = (password: string): string => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
  };
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
