import httpMocks from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import login from "../../../pages/api/login";
import { dbConnect, dbDisconnect } from "@/lib/mongoClient";
import {
  createUser,
  deleteUsers,
  generateHashPassword,
} from "../../../lib/userLib";
import { responseFormatter } from "@/lib/responseLib";

beforeAll(async () => {
  await dbConnect();
});

afterAll(async () => {
  await dbDisconnect();
})

describe("Login API Route", () => {
  // Insert a user document into the database before each test
  beforeEach(async () => {
    const hashedPassword = await generateHashPassword("validpassword"); // Hash the password before inserting
    await createUser("John", "Doe", "valid@test.com", hashedPassword);
  });

  // Clean up the inserted user after each test
  afterEach(async () => {
    await deleteUsers();
  });

  it("invalid password should return 401 for invalid credentials", async () => {
    const req = {
      method: "POST",
      body: {
        email: "valid@test.com",
        password: "wrongpassword",
      },
    } as NextApiRequest;

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(responseFormatter(false, null, "Invalid credentials"));
  });

  it("invalid email should return 401 for invalid credentials", async () => {
    const req = {
      method: "POST",
      body: {
        email: "nonexist@test.com",
        password: "wrongpassword",
      },
    } as NextApiRequest;

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(responseFormatter(false, null, "User not found"));
  });

  it("should return 200 for valid credentials", async () => {
    const req = {
      method: "POST",
      body: {
        email: "valid@test.com",
        password: "validpassword",
      },
    } as NextApiRequest;

    const res = httpMocks.createResponse();

    await login(req, res);

    expect(res.statusCode).toBe(200);
    const responseBody = JSON.parse(res._getData());
    expect(responseBody.success).toBe(true);
  });
});
