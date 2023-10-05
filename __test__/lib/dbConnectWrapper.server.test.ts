import httpMocks from "node-mocks-http";
import { dbConnectWrapper } from "../../lib/dbConnectWrapper";
import { dbConnect } from "../../lib/mongoClient";
jest.mock("../../lib/mongoClient", () => {
  const original = jest.requireActual("../../lib/mongoClient");
  return {
    ...original,
    __esModule: true,
    dbConnect: jest.fn(),
  };
});
describe("Tests dbConnectWrapper", () => {
  beforeEach(() => {});
  afterEach(() => {
    jest.resetAllMocks();
  });
  it("should try to connect to database and then call handler method that is passed to it", async () => {
    const handler = jest
      .fn()
      .mockImplementationOnce(async () => console.log("calling handler!"));
    dbConnect.mockResolvedValueOnce({});
    const req = httpMocks.createRequest({});
    const res = httpMocks.createResponse({});
    const wrappedFn = dbConnectWrapper(handler);
    wrappedFn(req, res);
    // handler function should get called when dbConnect is successful - but not happening here
    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(req);

    // should have called method to connect to db
    expect(dbConnect).toBeCalledTimes(1);
  });
  it("should return 500 response when there is failure to connect to db", async () => {
    const handler = jest
      .fn()
      .mockImplementationOnce(async () => console.log("calling handler!"));
    dbConnect.mockImplementationOnce(() => {
      throw new Error("failure to connect to db");
    });
    const req = httpMocks.createRequest({});
    const res = httpMocks.createResponse({});
    const wrappedFn = dbConnectWrapper(handler);
    wrappedFn(req, res);
    expect(res.statusCode).toEqual(500);
    const responseBody = JSON.parse(res._getData());

    // handler function should not get called when dbConnect is unsuccessful -
    expect(handler).toBeCalledTimes(0);

    // should have called method to connect to db
    expect(dbConnect).toBeCalledTimes(1);
    expect(responseBody.errorMessage).toContain("Internal Server Error");
  });
});
