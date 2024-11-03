import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { isLoggedIn } from "./api/auth";

export const config = {
  matcher: ["/resume/create", "/resume/create/:path*"],
};

export async function middleware(request: NextRequest) {
  const auth = await isLoggedIn();

  if (!auth) {
    const from = request.nextUrl.pathname;
    const url = new URL("/auth/sign-in", request.url);
    url.searchParams.set("from", from);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
