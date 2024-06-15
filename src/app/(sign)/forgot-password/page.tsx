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
      <Layout title="Forgot Password" subTitle="" action={formAction} onSubmit={handleSubmit(() => formRef.current?.submit())}>
        <Form {...form}>
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
          {process.env.NODE_ENV === 'development' && (<DevTool control={control} />)}
        </Form>
      </Layout>
    </div>
  )
}