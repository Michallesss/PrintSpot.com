// Libraries
import { z } from "zod";
// Types
const username = z
.string({ message: "Passed username not seems to be string."}) // ? Is string checked for alphanumeric characters
// .regex(/^[A-Za-z][A-Za-z0-9_]{,}$/, { message: "Username can only contain alphanumeric characters and underscores." })
.min(3, { message: "Username needs to be at least 3 characters long." })
.max(36, { message: "Username needs to be at most 36 characters long." })
.trim();
const email = z
.string({ message: "Passed email not seems to be string." }) // ? Is string checked for alphanumeric characters
.email({ message: "Please provide a valid email address." })
.min(3, { message: "Email address needs to be at least 3 characters long." }) // shortest email address
.max(345, { message: "Email address needs to be at most 345 characters long." }) // longest email address
.trim();
const password = z
.string({ message: "Passed password not seems to be string." }) // ? Is string checked for alphanumeric characters
// .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{,}$/, { message: "Password must contain at least one letter and one number." })
.min(8, { message: "Password needs to be at least 8 characters long." })
.max(128, { message: "Password needs to be at most 128 characters long." })
.trim();

// Login
export const loginSchema = z.object({
  identifier: z
    .string({
      message: "Passed identifier not seems to be string."
    }) // ? Is string checked for alphanumeric characters
    // .reqex()  // ! FIX THIS
    .min(3, {
      message: "Identifier needs to be at least 3 characters long."
    })
    .max(345, {
      message: "Identifier needs to be at most 345 characters long."
    })
    .trim(),
  password: password,
});
export type loginType = z.infer<typeof loginSchema>;

// Register
export const registerSchema = z.object({
  username: username,
  email: email,
  password: password,
});
export type registerType = z.infer<typeof registerSchema>;