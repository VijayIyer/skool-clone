import generateJwtToken from "@/lib/jwtLib/generateToken";
import middleware from "@/middleware";
import { NextRequest, NextResponse } from "next/server";
import { createRequest } from "node-mocks-http";

describe("Middleware", () => {
  it("sets the header when JWT is present", async () => {
    const token = generateJwtToken({
      id: "fakeUserId",
      email: "fakeEmail@test.com",
    });
    const req = createRequest({
      method: "GET",
      url: "https://www.skool.com",
      headers: {},
    });
    const mockReq = new NextRequest(req);
    mockReq.cookies.set("jwt", token);

    const response: NextResponse = await middleware(mockReq as NextRequest);

    expect(response.headers.get("x-middleware-request-userid")).toEqual(
      "fakeUserId"
    );
    expect(response.headers.get("x-middleware-request-iat")).toBeDefined();
  });

  it("returns authentication failed message when JWT is missing", async () => {
    const mockReq: Partial<NextRequest> = {
      headers: new Headers(),
      cookies: {
        get: function (name: string) {
          return { value: this[name] };
        },
      } as any,
      nextUrl: {
        hostname: "skool.com",
        href: "https://skool.com/test",
        pathname: "/test",
      } as any,
    };

    const response: NextResponse = await middleware(mockReq as NextRequest);

    const responseBody = await response.json();
    expect(responseBody.success).toBe(false);
    expect(responseBody.message).toBe("authentication failed");
  });

  it("redirect to user profile page if attempt to access login page after login", async () => {
    const token = generateJwtToken({
      id: "fakeUserId",
      email: "fakeEmail@test.com",
    });
    const req = createRequest({
      method: "GET",
      url: "https://www.skool.com/login",
      headers: {},
    });
    const mockReq = new NextRequest(req);
    mockReq.cookies.set("jwt", token);

    const response: NextResponse = await middleware(mockReq as NextRequest);
    expect(response.headers.get("location")).toBe("https://www.skool.com/fakeUserId");
    expect(response.status).toEqual(307);
  });
});
