// Next
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Services
import { getUserMeLoader } from "@/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  // Don't allow logged user to access sign page
  // TODO: Automate this (with list of path and type of protection: only for logged in, only for not logged in, etc.)
  if ((currentPath.startsWith("/sign") || currentPath.startsWith("/forgot")) && user.ok) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // TODO: Return request to create shop or log in on shop pages (dashboard, orders, products, customers, ...) 

  return NextResponse.next();
}