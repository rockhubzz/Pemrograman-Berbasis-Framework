import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export function middleware(request: NextRequest) {
    if (!auth.isLogin) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }else{
        return NextResponse.next();
    }
}
export const config = {
    matcher: ["/about", "/produk"],
};
