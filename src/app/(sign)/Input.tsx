import Link from "next/link";
import { Input as InputCn } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputProps {
  label: string;
  placeholder?: string;
  id: string;
  type?: string;
  autoComplete?: string;
  link?: string;
  linkText?: string;
  required?: boolean;
}

export default function Input({
  label,
  placeholder="",
  id,
  type = "text",
  autoComplete = "off",
  required = false,
  link,
  linkText,
}: Readonly<InputProps>) {
  return (
    <>
      {link && (
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor={id}>{label}</Label>
            <Link
              href={link}
              className="ml-auto inline-block text-sm underline"
            >
              {linkText}
            </Link>
          </div>
          <InputCn id={id} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required} />
        </div>
      )}

      {!link && (  
        <div className="grid gap-2">
          <Label htmlFor={id}>{label}</Label>
          <InputCn id={id} type={type} placeholder={placeholder} autoComplete={autoComplete} required={required} />
        </div>
      )}
    </>
  );
}