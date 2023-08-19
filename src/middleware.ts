import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicPaths = ["/login", "/signup"];
    const isPublicPath = publicPaths.includes(path);
    const token = request.cookies.get("token")?.value || "";

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    //"/api/users/:path*",
    "/dashboard/:path*",
    "/login/:path*",
    "/signup/:path*",
  ],
};
