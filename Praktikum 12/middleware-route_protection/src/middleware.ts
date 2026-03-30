import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isLogin = request.cookies.get("isLogin")?.value === "true";

    if (!isLogin) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
        return NextResponse.next();
    }
}
export const config = {
    matcher: ["/about", "/produk"],
};
