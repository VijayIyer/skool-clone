import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cookie from "cookie";

interface JwtPayload {
  id: string;
  iat: string;
}

const clearTokenCookie = (res: NextResponse) => {
  const responseHeaders = new Headers(res.headers);
  responseHeaders.set(
    "Set-Cookie",
    cookie.serialize("jwt", "", {
      maxAge: -1,
      httpOnly: true,
      secure: false, // set to true in production
      sameSite: "strict",
    })
  );
};

export default async function middleware(
  request: NextRequest
): Promise<NextResponse> {
  const token = request.cookies.get("jwt")?.value;
  let { pathname } = request.nextUrl;

  if (!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  const decodedToken = jwt.decode(token) as unknown as JwtPayload; // could switch to verify
  if (!decodedToken?.id) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "token does not have a user id",
      }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("userId", decodedToken.id);
  requestHeaders.set("iat", decodedToken.iat);

  if (pathname.includes("/login")) {
    const url = request.nextUrl.clone()
    url.pathname = `/${decodedToken?.id}`
    return NextResponse.redirect(url, {
      headers: requestHeaders,
    });
  } else {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/auth/:path*", "/settings/:path*"],
};
