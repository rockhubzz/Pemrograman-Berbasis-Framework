import { NextRequest, NextResponse } from "next/server";
import withAuth from "./Middleware/withAuth";
import { getToken } from "next-auth/jwt";

export async function mainMiddleware(request: NextRequest) {
const pathname = request.nextUrl.pathname;

  // Protected routes that require authentication
  const protectedRoutes = ["/profile", "/user", "/produk"];

  if (protectedRoutes.includes(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL("/", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/produk", "/about", "/profile", "/admin", "/editor"],
};

export default withAuth(mainMiddleware, config.matcher);