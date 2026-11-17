import { NextResponse } from "next/server";

// Next.js 16: `middleware` is deprecated and renamed to `proxy`.
// The file must export a single function named `proxy` (or a default export).
// Proxy defaults to the Node.js runtime — `runtime` must NOT be set in `config`.
export function proxy(request) {
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/create-event/:path*",
    "/manage-events/:path*",
    "/joined-events/:path*",
    "/events/:path*",
  ],
};
