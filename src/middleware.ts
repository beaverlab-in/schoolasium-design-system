import { NextRequest, NextResponse } from "next/server";
import { verifyTokenEdge, COOKIE_NAME } from "@/lib/auth-edge";

const ADMIN_ROUTES = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/")) return NextResponse.next();

  const isAdmin = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  if (!isAdmin) return NextResponse.next();

  const token   = request.cookies.get(COOKIE_NAME)?.value ?? null;
  const payload = token ? await verifyTokenEdge(token) : null;

  if (!payload) {
    const url = request.nextUrl.clone();
    url.pathname = "/employee-portal";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (payload.role !== "admin" && payload.role !== "super_admin") {
    const url = request.nextUrl.clone();
    url.pathname = "/employee-portal";
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.headers.set("x-user-id",   payload.sub);
  response.headers.set("x-user-role", payload.role);
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
