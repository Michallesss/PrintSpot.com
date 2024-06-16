'use client'
// Next
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
import { forgotPasswordSchema, forgotPasswordType } from "@/schemas/auth.schemas";
// Actions 
import { forgotPasswordAction } from "@/actions/auth.actions";

export default function ForgotPassword() {
  const [state, formAction] = useFormState(forgotPasswordAction, {
    zodErrors: null,
    strapiErrors: null,
    data: null,
  });
  const form = useForm<forgotPasswordType>({
    mode: "onBlur",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
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
    <div>
      <Layout title="Forgot Password" subTitle="" form={form} action={formAction} onSubmit={handleSubmit(() => formRef.current?.submit())}>
        <Field control={control} name="email" label="Email" autoComplete="email" message={errors.email?.message || state?.zodErrors?.email} />

        <SubmitButton className="w-full">Send Email</SubmitButton>
        <StrapiErrors error={state?.strapiErrors} />
        {process.env.NODE_ENV === 'development' && (<DevTool control={control} />)}
      </Layout>
    </div>
  )
}