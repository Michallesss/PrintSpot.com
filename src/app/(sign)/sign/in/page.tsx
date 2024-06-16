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
import Layout from "@/app/(sign)/_components/Layout";
import Field from "../../_components/Field";
import SubmitButton from "@/app/(sign)/_components/SubmitButton";
import StrapiErrors from "@/app/(sign)/_components/StrapiErrors";
// Schemas
import { loginSchema, loginType } from "@/schemas/auth.schemas";
// Actions
import { loginAction } from "@/actions/auth.actions";

export default function SignIn() {
  const [state, formAction] = useFormState(loginAction, {
    zodErrors: null,
    strapiErrors: null,
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

  return ( // TODO: Move on to use field component
    <Layout title="Sign In" subTitle="Enter your email below to login to your account" text="Don't have an account?" link="/sign/up" linkText="Sign Up" form={form} action={formAction} onSubmit={handleSubmit(() => formRef.current?.submit())}>
      <Field control={control} name="identifier" label="Username or email" autoComplete="username" message={errors.identifier?.message || state?.zodErrors?.identifier} />

      <Field control={control} name="password" label="Password" link="/forgot-password" linkText="Forgot password?" type="password" autoComplete="current-password" message={errors.password?.message || state?.zodErrors?.password} />
      
      <SubmitButton className="w-full">Sign Up</SubmitButton>
      <StrapiErrors error={state?.strapiError} />
      {process.env.NODE_ENV === 'development' && (<DevTool control={control} />)}
    </Layout>
  );
}
