'use client'
// React
import { useFormState } from "react-dom";
import { useRef } from "react";
// Forms
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
// Components
import Layout from "@/app/(sign)/_components/Layout";
import Field from "@/app/(sign)/_components/Field";
import SubmitButton from "@/app/(sign)/_components/SubmitButton";
import StrapiErrors from "@/app/(sign)/_components/StrapiErrors";
// Schemas
import { registerSchema, registerType } from "@/schemas/auth.schemas";
// Actions
import { registerAction } from "@/actions/auth.actions";

export default function SignUp() {
  const [state, formAction] = useFormState(registerAction, {
    zodErrors: null,
    strapiErrors: null,
    data: null,
  });
  const form = useForm<registerType>({
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
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
    <Layout title="Sign Up" subTitle="Create account to start your journey" text="Already have an account?" link="/sign/in" linkText="Sign In" form={form} action={formAction} onSubmit={handleSubmit(() => formRef.current?.submit())}>
      <Field control={control} name="username" label="Username" type="text" autoComplete="username" message={errors.username?.message || state?.zodErrors?.username} />
      
      <Field control={control} name="email" label="Email" type="email" autoComplete="email" message={errors.email?.message || state?.zodErrors?.email} />

      <Field control={control} name="password" label="Password" type="password" autoComplete="new-password" message={errors.password?.message || state?.zodErrors?.password} />
      
      <SubmitButton className="w-full">Sign Up</SubmitButton>
      <StrapiErrors error={state?.strapiError} />
      {process.env.NODE_ENV === 'development' && (<DevTool control={control} />)}
    </Layout>
  );
}