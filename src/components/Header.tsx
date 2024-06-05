'use client';
// Next
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation'
// Components
import { ModeToggle } from "./mode-toggle";
import { MobileNavBar } from "./NavBar";
// Icons
import { CircleUser, Search } from "lucide-react"
// UI
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export default function Header() {
  const pathes = usePathname().split('/').filter( path => path );

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* Mobile Sidebar */}
      <MobileNavBar />
      {/* Breadcrumb Path */}
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">PrintSpot</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathes.map((path, index) => (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  <Link href={"/"+pathes.slice(0, index+1).join("/")}>{path}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== pathes.length-1 ? <BreadcrumbSeparator /> : null}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      {/* SearchBar */}
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      {/* Mode Toggle */}
      <ModeToggle />
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <CircleUser className="h-5 w-5" /> {/* // TODO: Handle unloged user and user without profile */}
            {/* <Image
              src="/placeholder-user.jpg"
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            /> */}
          </Button>
        </DropdownMenuTrigger>
        <Menu />
      </DropdownMenu>
    </header>
  );
}

function Menu() { // TODO: handle unloged user (display login and sign in, instead of profile menu)
  return (
    <DropdownMenuContent align="end"> {/* handle unloged user (login sign in) */}
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  );
}