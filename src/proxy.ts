import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME }  from "@/lib/auth";

const PROTECTED  = ["/employee-portal", "/admin"];
const ADMIN_ONLY = ["/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED.some((r)  => pathname.startsWith(r));
  const isAdminOnly = ADMIN_ONLY.some((r)  => pathname.startsWith(r));

  // API routes handle their own auth — proxy only guards page routes
  if (pathname.startsWith("/api/")) return NextResponse.next();
  if (!isProtected)                 return NextResponse.next();

  // Validate the JWT httpOnly cookie
  const token   = request.cookies.get(COOKIE_NAME)?.value ?? null;
  const payload = token ? verifyToken(token) : null;

  if (!payload) {
    const url      = request.nextUrl.clone();
    url.pathname   = "/employee-portal";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminOnly && payload.role !== "admin" && payload.role !== "super_admin") {
    const url    = request.nextUrl.clone();
    url.pathname = "/employee-portal";
    return NextResponse.redirect(url);
  }

  // Forward user info to page via headers so Server Components can read it
  const response = NextResponse.next();
  response.headers.set("x-user-id",   payload.sub);
  response.headers.set("x-user-role", payload.role);
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/employee-portal/:path*"],
};
