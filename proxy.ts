import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  const hasBackendToken =
    !!req.auth &&
    typeof (req.auth as { backendAccessToken?: unknown }).backendAccessToken === "string";
  const hasManualToken = Boolean(req.cookies.get("mcqscanner_token")?.value);
  const isAuthenticated = hasBackendToken || hasManualToken;
  const pathname = req.nextUrl.pathname;

  const protectedPaths = ["/dashboard", "/billing", "/onboarding", "/omr", "/subscription", "/admin"];
  const isProtected = protectedPaths.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (!isAuthenticated && isProtected) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && (pathname === "/login" || pathname === "/auth/login" || pathname === "/auth/signup")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/billing/:path*",
    "/onboarding",
    "/omr/:path*",
    "/subscription/:path*",
    "/admin/:path*",
    "/login",
    "/auth/login",
    "/auth/signup",
  ],
};
