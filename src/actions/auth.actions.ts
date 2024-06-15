'use server'; // TODO: REPLACE WITH REACT-HOOK-FORM
// Next
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
// Types
import { loginSchema, loginType, registerSchema, registerType } from "@/schemas/auth.schemas";
// Services
import { loginService, registerService } from "@/services/auth.services";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.WEB_HOST, // localhost
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
}

export async function registerAction(prevState: any, data: registerType): Promise<any> {
  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) return {
    ...prevState,
    zodErrors: validatedFields.error.flatten().fieldErrors,
    strapiErrors: null,
    message: "Missing Fields. Failed to Register.",
  };

  const responseData = await registerService(validatedFields.data);

  if (!responseData) return {
    ...prevState,
    zodErrors: null,
    strapiErrors: null,
    message: "Ops! Something went wrong. Please try again.",
  };

  if (responseData.error) return {
    ...prevState,
    zodErrors: null,
    strapiErrors: responseData.error,
    message: "Failed to Register.",
  };

  cookies().set("jwt", responseData.jwt, config);
  redirect("/");
}

export async function loginAction(prevState: any, data: loginType): Promise<any> {
  const validatedFields = loginSchema.safeParse(data);

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
    zodErrors: null,
    strapiErrors: responseData.error,
    message: "Failed to Login.",
  };

  cookies().set("jwt", responseData.jwt, config);
  redirect("/");
}

export async function forgotPasswordAction(prevState: any, data: any): Promise<any> {
  // https://dev.to/peterlidee/forgot-password-flow-with-strapi-and-nextauth-59a9
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}