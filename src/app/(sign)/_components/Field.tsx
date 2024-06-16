// Next
import Link from "next/link";
// UI
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FieldProps {
  control: any;
  name: string;
  label: string;
  link?: string | URL;
  linkText?: string;
  type?: string;
  autoComplete?: string;
  message?: string;
}

export default function Field({ control, name, label, link, linkText, type="text", autoComplete="off", message }: FieldProps) {
  return (
    <FormField 
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div {...(link && linkText ? { className: "flex items-center" } : {})}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            {link && linkText && (
              <Link href={link} className="ml-auto inline-block text-sm underline font-medium">
                {linkText}
              </Link>
            )}
          </div>
          <FormControl>
            <Input {...field} id={name} type={type} autoComplete={autoComplete} />
          </FormControl>
          <FormMessage className="text-red-500 text-xs italic mt-1 py-2">
            {message}
          </FormMessage>
        </FormItem>
      )} 
    />
  )
}