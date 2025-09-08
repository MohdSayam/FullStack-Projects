import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyEmail";

  const token = request.cookies.get("token")?.value;

  // // Debug log
  // console.log("🔎 Path:", path);
  // console.log("🔎 Token from cookie:", token);

  if (isPublicPath && token) {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET!);
      console.log("✅ Token valid, redirecting to /profile");
      return NextResponse.redirect(new URL("/profile", request.nextUrl));
    } catch {
      console.log("❌ Token invalid, let them stay on public page");
      // token invalid → let them log in/signup
    }
  }

  if (!isPublicPath && !token) {
    console.log("⛔ No token, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If valid token OR public path → continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/verifyEmail", "/profile/:path*"],
};
