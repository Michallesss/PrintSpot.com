'use client'
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
import { registerSchema, registerType } from "@/schemas/auth.schemas";
// Actions
import { registerAction } from "@/actions/auth.actions";

export default function SignUp() { // TODO: Make it use shadCn and new components
  const [state, formAction] = useFormState(registerAction, {
    ZodErrors: null,
    StrapiErrors: null,
    data: null,
  });
  const form = useForm<registerType>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
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
    <Layout title="Sign Up" subTitle="Create account to start your journey" text="Already have an account?" link="/sign/in" linkText="Sign In" action={formAction} onSubmit={handleSubmit(() => formRef.current?.submit())}>
      <Form {...form}>
        <FormField 
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input {...field} id="username" type="text" autoComplete="username" />
              </FormControl>
              <FormMessage className="text-red-500 text-xs italic mt-1 py-2">
                {errors.username?.message || state?.zodErrors?.username}
              </FormMessage>
            </FormItem>
          )} 
        />

        <FormField 
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input {...field} id="email" type="email" autoComplete="email" />
              </FormControl>
              <FormMessage className="text-red-500 text-xs italic mt-1 py-2">
                {errors.email?.message || state?.zodErrors?.email}
              </FormMessage>
            </FormItem>
          )} 
        />

        <FormField 
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <Input {...field} id="password" type="password" autoComplete="new-password" />
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