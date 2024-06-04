// Libraries
import { z } from "zod";

// Login
export const loginSchema = z.object({
  identifier: z
    .string({
      message: "Passed identifier not seems to be string."
    }) // ? Is string checked for alphanumeric characters
    .min(3, {
      message: "Identifier needs to be at least 3 characters long."
    })
    .max(345, {
      message: "Identifier needs to be at most 345 characters long."
    })
    .trim(),
  password: z
    .string({
      message: "Passed password not seems to be string."
    }) // ? Is string checked for alphanumeric characters
    .min(8, {
      message: "Password needs to be at least 8 characters long."
    })
    .max(128, {
      message: "Password needs to be at most 128 characters long."
    })
    .trim(),
});
export type loginType = z.infer<typeof loginSchema>;

// Register
export const registerSchema = z.object({
  username: z
    .string({
      message: "Passed username not seems to be string."
    }) // ? Is string checked for alphanumeric characters
    .min(3, {
      message: "Username needs to be at least 3 characters long."
    })
    .max(36, {
      message: "Username needs to be at most 36 characters long."
    })
    .trim(),
  email: z
    .string({
      message: "Passed email not seems to be string."
    }) // ? Is string checked for alphanumeric characters
    .email({
      message: "Please provide a valid email address."
    })
    .min(3, {
      message: "Email address needs to be at least 3 characters long."
    }) // shortest email address
    .max(345, {
      message: "Email address needs to be at most 345 characters long."
    }) // longest email address
    .trim(),
  password: z
    .string({
      message: "Passed password not seems to be string."
    }) // ? Is string checked for alphanumeric characters
    .min(8, {
      message: "Password needs to be at least 8 characters long."
    })
    .max(128, {
      message: "Password needs to be at most 128 characters long."
    })
    .trim(),
});
export type registerType = z.infer<typeof registerSchema>;