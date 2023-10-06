import httpMocks from "node-mocks-http";
import { signUpHandler } from "../../../../pages/api/signup";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import {
  createUser,
  generateHashPassword,
  isUserEmailTaken,
  validateUserSignUpInput,
} from "../../../../lib/userLib";
import { getLatestOtpForEmail } from "../../../../lib/otpLib";

jest.mock("../../../../lib/userLib", () => {
  const original = jest.requireActual("../../../../lib/userLib"); // Step 2.
  return {
    ...original,
    __esModule: true,
    isUserEmailTaken: jest.fn(),
    validateUserSignUpInput: jest.fn(),
    generateHashPassword: jest.fn(),
    createUser: jest.fn(),
  };
});
jest.mock("../../../../lib/otpLib", () => {
  const original = jest.requireActual("../../../../lib/otpLib"); // Step 2.
  return {
    ...original,
    __esModule: true,
    createOtp: jest.fn(),
    getLatestOtpForEmail: jest.fn(),
  };
});
jest.mock("jsonwebtoken", () => {
  const original = jest.requireActual("jsonwebtoken");
  return {
    ...original,
    __esModule: true,
    default: {
      sign: jest.fn(),
    },
  };
});
jest.mock("cookie", () => {
  const original = jest.requireActual("cookie");
  return {
    ...original,
    serialize: jest.fn(),
  };
});
describe("POST /api/signup", () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should return 405 method not allowed error when any method other than POST is used", async () => {
    isUserEmailTaken.mockResolvedValueOnce(false);
    // mock return value of validation function to be false
    validateUserSignUpInput.mockReturnValueOnce({
      success: true,
    });

    const req = httpMocks.createRequest({
      method: "GET",
    });
    const res = httpMocks.createResponse();
    await signUpHandler(req, res);
    expect(res.statusCode).toEqual(405);
    const responseBody = JSON.parse(res._getData());
    expect(responseBody.errorMessage).toContain("Method Not Allowed");
  });
  it("should return 400 BAD REQUEST response if email is already taken", async () => {
    isUserEmailTaken.mockResolvedValueOnce(true);
    validateUserSignUpInput.mockReturnValueOnce({
      success: true,
    });
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/signup/createOtp",
      body: { email: "email@email.com" },
    });
    const res = httpMocks.createResponse();
    await signUpHandler(req, res);
    expect(res.statusCode).toEqual(400);
    const responseBody = JSON.parse(res._getData());
    expect(responseBody.success).toBe(false);
    expect(validateUserSignUpInput).toBeCalledTimes(1);
    expect(isUserEmailTaken).toBeCalledTimes(1);
    expect(responseBody.errorMessage).toContain("user already used this email");
  });

  it("should return a 400 Bad Request for invalid user data", async () => {
    isUserEmailTaken.mockResolvedValueOnce(false);
    // make validateUserSignUpInput return false with message
    validateUserSignUpInput.mockReturnValueOnce({
      success: false,
      message: "invalid user signup data",
    });
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
    expect(responseBody.errorMessage).toContain("invalid user signup data");
  });

  it("should return 400 response when otp is invalid", async () => {
    // return false to bypass this step
    isUserEmailTaken.mockResolvedValueOnce(false);
    // make validateUserSignUpInput return true to bypass this step
    validateUserSignUpInput.mockReturnValueOnce({
      success: true,
    });
    // return a different value from one passed in request
    getLatestOtpForEmail.mockResolvedValueOnce(123457);
    const userData = {
      firstName: "FirstName",
      lastName: "LastName", // Missing last name
      email: "email@gmail.com", // Invalid email format
      password: "password123",
      otp: "123456",
    };

    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/signup",
      body: userData,
    });

    const res = httpMocks.createResponse();

    await signUpHandler(req, res);
    expect(res.statusCode).toEqual(400);
    expect(isUserEmailTaken).toBeCalledTimes(1);
    expect(validateUserSignUpInput).toBeCalledTimes(1);
    expect(getLatestOtpForEmail).toBeCalledTimes(1);
    expect(getLatestOtpForEmail).toBeCalledWith("email@gmail.com");
    const responseBody = res._getJSONData();
    expect(responseBody.success).toBe(false);
    expect(responseBody.errorMessage).toContain("The Otp is not valid");
  });
  it("should create a new user if Otp is valid", async () => {
    // return false to bypass this step
    isUserEmailTaken.mockResolvedValueOnce(false);
    // make validateUserSignUpInput return true to bypass this step
    validateUserSignUpInput.mockReturnValueOnce({
      success: true,
    });
    // return a different value from one passed in request
    getLatestOtpForEmail.mockResolvedValueOnce(123456);
    generateHashPassword.mockResolvedValueOnce("password");
    createUser.mockResolvedValueOnce({ _id: 1 });

    jwt.sign.mockReturnValueOnce("token");
    serialize.mockReturnValueOnce({});
    const userData = {
      _id: 1,
      firstName: "FirstName",
      lastName: "LastName", // Missing last name
      email: "email@gmail.com", // Invalid email format
      password: "password123",
      otp: "123456",
    };

    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/signup",
      body: userData,
    });

    const res = httpMocks.createResponse();

    await signUpHandler(req, res);
    expect(isUserEmailTaken).toBeCalledTimes(1);
    expect(validateUserSignUpInput).toBeCalledTimes(1);
    expect(getLatestOtpForEmail).toBeCalledTimes(1);
    expect(getLatestOtpForEmail).toBeCalledWith("email@gmail.com");
    expect(jwt.sign).toBeCalledTimes(1);
    expect(jwt.sign).toReturnWith("token");
    expect(res.statusCode).toEqual(201);
    const responseBody = res._getJSONData();
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.message).toContain("New user with email");
  });
});
