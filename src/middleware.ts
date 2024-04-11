import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const _cookies = cookies();
  const allCookies = _cookies
    .getAll()
    .map((cookeie) => `${cookeie.name}=${cookeie.value}`)
    .join(";");

  if (!_cookies.get("next-auth.session-token")?.value?.trim()) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const headers = {
    "Content-Type": "application/json",
    Cookie: allCookies,
  };

  /**
   * Send a request to /api/auth/session to get the user session
   * process.LOOPBACK_URL can be set as localhost, or your website url
   */
  const url = new URL("/api/auth/session", process.env.LOOPBACK_URL);
  const response = await fetch(url.href, {
    headers: headers,
    cache: "no-store",
  });

  if (response.ok) {
    // const session = await response.json();
    // if (new Date(session.expires) < new Date()) {
    //   return NextResponse.redirect(new URL("/signin", request.url));
    // }
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/signin", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/account", "/analytics"],
};

// Next Auth does not work with Edge Function so we can not use getServerSession of next Auth
