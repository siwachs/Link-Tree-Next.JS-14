import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  // @ts-ignore
  const token = await getToken({ req: request, secret });

  // @ts-ignore
  if (token && token.exp > Date.now() / 1000) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
  matcher: ["/account", "/analytics"],
};
