'use server'; // !!! REPLACE WITH REACT-HOOK-FORM
// Next
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Services
import { loginService, registerService } from "@/services/auth.services";

// Schemas
import { loginSchema, registerSchema } from "@/schemas/auth.schemas";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.WEB_HOST, // localhost
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
}

export async function registerAction(prevState: any, formData: FormData) {
  const validatedFields = registerSchema.safeParse({});

  if(!validatedFields.success) return {
    ...prevState,
    zodErrors: validatedFields.error.flatten().fieldErrors,
    strapiErrors: null,
    message: "Missing Fields. Failed to Register.",
  };

  const responseData = await registerService(validatedFields.data);

  if(!responseData) return {
    ...prevState,
    strapiErrors: null,
    zodErrors: null,
    message: "Ops! Something went wrong. Please try again.",
  };

  if (responseData.error) return {
    ...prevState,
    strapiErrors: responseData.error,
    zodErrors: null,
    message: "Failed to Register.",
  };

  cookies().set("jwt", responseData.jwt, config);
  redirect("/");
}

export async function loginAction(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({});

  if(!validatedFields.success) return {
    ...prevState,
    zodErrors: validatedFields.error.flatten().fieldErrors,
    strapiErrors: null,
    message: "Missing Fields. Failed to Login.",
  };

  const responseData = await loginService(validatedFields.data);

  if(!responseData) return {
    ...prevState,
    strapiErrors: null,
    zodErrors: null,
    message: "Ops! Something went wrong. Please try again.",
  };

  if (responseData.error) return {
    ...prevState,
    strapiErrors: responseData.error,
    zodErrors: null,
    message: "Failed to Login.",
  };

  cookies().set("jwt", responseData.jwt, config);
  redirect("/");
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}