import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyEmail";

  const token = request.cookies.get("token")?.value;

  let isValidToken = false;
  if (token) {
    try {
      //  Verify token with secret
      jwt.verify(token, process.env.TOKEN_SECRET!);
      isValidToken = true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      //  Token expired/invalid
      isValidToken = false;
    }
  }

  // 🔒 If logged in and trying to access public pages → redirect to profile
  if (isPublicPath && isValidToken) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  // 🔑 If not logged in and trying to access private pages → redirect to login
  if (!isPublicPath && !isValidToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/verifyEmail", "/profile/:path*"],
};
