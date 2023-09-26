import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  iat: string;
}
export default async function middleware(
  request: NextRequest
): Promise<NextResponse> {
  const token = request.cookies.get("jwt")?.value;

  if (!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  const decodedToken = jwt.decode(token) as unknown as JwtPayload; // could switch to verify
  if (!decodedToken?.id)
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "token does not have a user id",
      }),
      { status: 401, headers: { "content-type": "application/json" } }
    );

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("userId", decodedToken.id);
  requestHeaders.set("iat", decodedToken.iat);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/auth/:path*",
};
