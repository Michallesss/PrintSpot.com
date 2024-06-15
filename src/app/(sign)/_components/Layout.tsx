// Next
import Image from "next/image";
import Link from "next/link";
// UI
import { Button } from "@/components/ui/button"

interface FormProps {
  children: React.ReactNode;
  title: string;
  subTitle: string;
  text?: string;
  link?: string;
  linkText?: string;
  action: any;
  onSubmit: any;
}

export default function Form({ children, title, subTitle, text, link, linkText, action, onSubmit }: Readonly<FormProps>) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <Link href="/" className="absolute top-4 left-4">
        <Button variant="outline">Back</Button>
      </Link>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-balance text-muted-foreground">
              {subTitle}
            </p>
          </div>
          
          <form action={action} onSubmit={onSubmit} className="grid gap-4">
            {children}
          </form>

          {link && linkText && (
            <div className="mt-4 text-center text-sm">
              {text}{" "}
              <Link href={link} className="underline">
                {linkText}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}