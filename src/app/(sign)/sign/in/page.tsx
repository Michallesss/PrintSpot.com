// sign > in
'use client' 
import { useFormState } from "react-dom"; // !!! REPLACE WITH REACT-HOOK-FORM
import Form from "../../Form"
import Input from "../../Input"
import SubmitButton from "@/app/(sign)/SubmitButton";
import ZodErrors from "@/app/(sign)/ZodErrors";
import StrapiErrors from "@/app/(sign)/StrapiErrors";
import { loginAction } from "@/actions/auth.actions";

const INITIAL_STATE = {
  ZodErrors: null,
  StrapiErrors: null,
  data: null,
  message: null,
}

export default function SignIn() {
  const [formState, formAction] = useFormState(loginAction, INITIAL_STATE);

  return (
    <Form title="Sign In" subTitle="Enter your email below to login to your account" text="Don't have an account? " link="/sign/up" linkText="Sign Up" action={formAction}>
      <Input label="Username or email" id="identifier" type="text" autoComplete="username" required />
      <ZodErrors error={formState?.zodErrors?.identifier} />
      
      <Input label="Password" id="password" type="password" link="/forgot-password" linkText="Forgot your password?" autoComplete="current-password" required />
      <ZodErrors error={formState?.zodErrors?.password} />

      <SubmitButton className="w-full">Sign In</SubmitButton>
      <StrapiErrors error={formState?.strapiErrors} />
      {/* <Button variant="outline" className="w-full">
        Login with Google
      </Button> */}
    </Form>
  )
}
