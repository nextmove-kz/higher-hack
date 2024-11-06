import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { getUser, isLoggedIn } from "./api/auth";
import { hasResume } from "./api/resume";

export const config = {
  matcher: ["/resume/:path*"],
};

export async function middleware(request: NextRequest) {
  const auth = await isLoggedIn();
  const from = request.nextUrl.pathname;

  if (from === "/resume/create" && !auth) {
    const url = new URL("/auth/sign-in", request.url);
    url.searchParams.set("from", from);

    return NextResponse.redirect(url);
  } else if (!auth) {
    NextResponse.next();
  }

  const user = await getUser();
  const resumeCheck = await hasResume(user.id);

  if (from === `/resume/${user.id}` && !resumeCheck) {
    const url = new URL("/resume/create", request.url);
    url.searchParams.set("from", from);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
