import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If no token or invalid token, redirect to login
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // allow auth related routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/signup" ||
          pathname === "/"
        ) {
          return true;
        }

        // public
        if (pathname === "/" || pathname.startsWith("/login")) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  //   matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
  matcher: ["/dashboard"],
};
