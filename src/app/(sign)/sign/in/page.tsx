'use client' 
// Next
import Link from "next/link";
// React
import { useFormState } from "react-dom";
import { useRef } from "react";
// Forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
// Components 
import Layout from "@/app/(sign)/_components/Layout"
import SubmitButton from "@/app/(sign)/_components/SubmitButton";
import StrapiErrors from "@/app/(sign)/_components/StrapiErrors";
// UI
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// Schemas
import { loginSchema, loginType } from "@/schemas/auth.schemas";
// Actions
import { loginAction } from "@/actions/auth.actions";

export default function SignIn() {
  const [state, formAction] = useFormState(loginAction, {
    ZodErrors: null,
    StrapiErrors: null,
    data: null,
  });
  const form = useForm<loginType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      ...(state?.data ?? {})
    },
  });
  const { 
    formState: { errors },
    handleSubmit,
    control,
  } = form;
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Layout title="Sign In" subTitle="Enter your email below to login to your account" text="Don't have an account?" link="/sign/up" linkText="Sign Up" action={formAction} onSubmit={handleSubmit(() => formRef.current?.submit())}>
      <Form {...form}>
        <FormField 
          control={control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="identifier">Username or email</FormLabel>
              <FormControl>
                <Input {...field} id="identifier" type="text" autoComplete="username" />
              </FormControl>
              <FormMessage className="text-red-500 text-xs italic mt-1 py-2">
                {errors.identifier?.message || state?.zodErrors?.identifier}
              </FormMessage>
            </FormItem>
          )} 
        />
        <FormField 
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link href={"/forgot-password"} className="ml-auto inline-block text-sm underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <Input {...field} id="password" type="password" autoComplete="current-password" />
              </FormControl>
              <FormMessage className="text-red-500 text-xs italic mt-1 py-2">
                {errors.password?.message || state?.zodErrors?.password}
              </FormMessage>
            </FormItem>
          )} 
        />
        
        <SubmitButton className="w-full">Sign Up</SubmitButton>
        <StrapiErrors error={state?.strapiError} />
        {process.env.NODE_ENV === 'development' && (<DevTool control={control} />)}
      </Form>
    </Layout>
  );
}
