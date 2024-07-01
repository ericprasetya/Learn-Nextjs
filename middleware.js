import { NextResponse } from "next/server";

export function middleware(req) {
  const pathName = req.nextUrl.pathname;
  const isCookiesExists = !!req.cookies.get("user_token");
  console.log("pathName => ", pathName);
  const isLoginPage = pathName.startsWith("/login");
  if (!isCookiesExists && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isCookiesExists && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}