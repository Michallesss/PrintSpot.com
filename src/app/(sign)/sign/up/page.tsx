// sing > up
'use client' 
import { useFormState } from "react-dom"; // !!! REPLACE WITH REACT-HOOK-FORM
import Form from "../../Form";
import Input from "../../Input";
import SubmitButton from "@/components/SubmitButton";
import ZodErrors from "@/components/ZodErrors";
import StrapiErrors from "@/components/StrapiErrors";
import { registerAction } from "@/actions/auth.actions";

const INITIAL_STATE = {
  ZodErrors: null,
  StrapiErrors: null,
  data: null,
  message: null,
}

export default function SignUp() {
  const [formState, formAction] = useFormState(registerAction, INITIAL_STATE);

  return (
    <Form title="Sign Up" subTitle="Create account to start your journey" text="Already have an account?" link="/in" linkText="Sign In" action={formAction}>
      <Input label="Username" placeholder="John Doe" id="username" type="text" autoComplete="username" required />
      <ZodErrors error={formState?.zodErrors?.username} />

      <Input label="Email" placeholder="me@mail.com" id="email" type="email" autoComplete="email" required />\
      <ZodErrors error={formState?.zodErrors?.email} />

      <Input label="Password" placeholder="********" id="password" type="password" autoComplete="new-password" required />
      <ZodErrors error={formState?.zodErrors?.password} />

      <SubmitButton className="w-full">Sign Up</SubmitButton>
      <StrapiErrors error={formState?.strapiErrors} />
    </Form>
  );
}