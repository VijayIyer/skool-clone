import httpMocks from "node-mocks-http";
import handler from "@/pages/api/hello";
import { dbConnect, dbDisconnect } from "@/lib/mongoClient";

describe("API Testing", () => {
  afterAll(() => dbDisconnect());

  it('should return { name: "John Doe" }', async () => {
    const expectedData = { name: "John Doe" };

    const req = httpMocks.createRequest({
      method: "GET",
      url: "/api/hello",
    });

    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    const responseBody = JSON.parse(res._getData()); // Parse JSON response
    expect(responseBody).toEqual(expectedData);
  });
});
