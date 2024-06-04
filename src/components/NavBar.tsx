'use client';
// Next
import Link from "next/link";
import { usePathname } from 'next/navigation'
// Icons
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"
// UI
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Desktop NavBar
export default function NavBar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className={"group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"}
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" /> {/* Or printspot logo */}
          <span className="sr-only">PrintSpot</span>
        </Link>
        <Option label="Dashboard" href="/dashboard">
          <Home className="h-5 w-5" />
        </Option>
        <Option label="Orders" href="/orders">
          <ShoppingCart className="h-5 w-5" />
        </Option>
        <Option label="Products" href="/products">
          <Package className="h-5 w-5" />
        </Option>
        <Option label="Customers" href="/customers">
          <Users2 className="h-5 w-5" />
        </Option>
        <Option label="Analytics" href="/analytics">
          <LineChart className="h-5 w-5" />
        </Option>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Option label="Settings" href="/settings">
          <Settings className="h-5 w-5" />
        </Option>
      </nav>
    </aside>
  );
}

interface OptionProps {
  children: React.ReactNode;
  label: string;
  href: string;
}

function Option({ children, label, href }: Readonly<OptionProps>) {
  const pathname = usePathname().split("/")[1];
  const hrefPath = href.split("/")[1];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${pathname === hrefPath ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
          >
            {children}
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Mobile NavBar
export function MobileNavBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">PrintSpot</span>
          </Link>
          <MobileOption label="Dashboard" href="/dashboard">
            <Home className="h-5 w-5" />
          </MobileOption>
          <MobileOption label="Orders" href="/orders">
            <ShoppingCart className="h-5 w-5" />
          </MobileOption>
          <MobileOption label="products" href="/products">
            <Package className="h-5 w-5" />
          </MobileOption>
          <MobileOption label="Customers" href="/customers">
            <Users2 className="h-5 w-5" />
          </MobileOption>
          <MobileOption label="Settings" href="/settings">
            <LineChart className="h-5 w-5" />
            Settings
          </MobileOption>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

interface MobileOptionProps {
  children: React.ReactNode;
  label: string;
  href: string;
}

function MobileOption({ children, label, href }: Readonly<MobileOptionProps>) { // TODO: Handling unloged user (maybe return null)
  const pathname = usePathname().split("/")[1];
  const hrefPath = href.split("/")[1];

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 px-2.5 ${pathname !== hrefPath ? "text-muted-foreground hover:" : ""}text-foreground`}
    >
      {children}
      {label}
    </Link>
  );
}