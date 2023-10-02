import httpMocks from "node-mocks-http";
import signUpHandler from "../../../pages/api/signup/verify";
import { dbConnect } from "@/lib/mongoClient";
import { deleteUsers } from "../../../lib/userLib";

beforeAll(async () => {
  await dbConnect();
  await deleteUsers();
});

describe("POST /api/signup", () => {
  it("should create a new user", async () => {
    // Mock user data for testing
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      password: "password123",
    };

    // Create a mock request and response
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/signup",
      body: userData,
    });

    const res = httpMocks.createResponse();

    // Call your sign-up handler with the mock request and response
    await signUpHandler(req, res);

    // Assert the response status code and the response body

    expect(res.statusCode).toBe(201);
    const responseBody = JSON.parse(res._getData()); // Parse JSON response
    expect(responseBody.success).toBe(true);
    expect(responseBody.data).toBeDefined();
  });

  // Test case 2: Invalid user data
  it("should return a 400 Bad Request for invalid user data", async () => {
    // Mock invalid user data for testing
    const invalidUserData = {
      firstName: "John",
      lastName: null, // Missing last name
      email: "invalid-email", // Invalid email format
      password: "password123",
    };

    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/signup",
      body: invalidUserData,
    });

    const res = httpMocks.createResponse();

    await signUpHandler(req, res);

    expect(res.statusCode).toBe(400);
    const responseBody = JSON.parse(res._getData());
    expect(responseBody.success).toBe(false);
    expect(responseBody.errorMessage).toContain("Validation error");
  });

  // Test case 3: User email already taken
  it("should return a 400 Bad Request if user email is already taken", async () => {
    // Mock user data with an email that is already taken
    const existingUser = {
      firstName: "Alice",
      lastName: "Smith",
      email: "test@example.com",
      password: "password123",
    };

    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/signup",
      body: existingUser,
    });

    const res = httpMocks.createResponse();

    await signUpHandler(req, res);

    expect(res.statusCode).toBe(400);
    const responseBody = JSON.parse(res._getData());
    expect(responseBody.success).toBe(false);
    expect(responseBody.errorMessage).toContain("user already used this email");
  });
});
