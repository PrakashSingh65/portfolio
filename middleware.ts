import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isLoginPage = req.nextUrl.pathname === "/admin-panel/login";

    // If an already authenticated admin visits the login page, redirect to the admin dashboard
    if (isLoginPage && token) {
      return NextResponse.redirect(new URL("/admin-panel/intro", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow unauthenticated access ONLY to the login page
        if (req.nextUrl.pathname === "/admin-panel/login") {
          return true;
        }
        // Deny access to any other /admin-panel route unless valid JWT token exists
        return !!token;
      },
    },
    pages: {
      signIn: "/admin-panel/login",
    },
  }
);

export const config = {
  matcher: [
    "/admin-panel/:path*",
  ],
};
