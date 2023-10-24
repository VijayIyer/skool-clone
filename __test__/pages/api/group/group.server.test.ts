import httpMocks from "node-mocks-http";
import groupHandler from "@/pages/api/group";
import { dbConnect, dbDisconnect } from "@/lib/mongoClient";
import { createUser, deleteUsers } from "@/lib/userLib";
import Group from "@/models/Group";
import UserGroupRelation from "@/models/UserGroupRelation";

let userID: string;
beforeAll(async () => {
  await dbConnect();
  const res = await createUser("John", "Doe", "test@example.com", "password123");
  if(res._id) {
    userID = res._id.toString();
  }
});

afterAll(async () => {
    await UserGroupRelation.deleteMany({});
    await Group.deleteMany({});
    await deleteUsers();
    await dbDisconnect();
  })

const groupData = {
    name: "NextJS",
    type: "private",
};

describe("/api/group", () => {
  it("should create a new group", async () => {

    // Create a mock request and response
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/group",
      body: {...groupData, userID}
    });

    const res = httpMocks.createResponse();

    // Call handler with the mock request and response
    await groupHandler(req, res);

    // Assert the response status code and the response body

    expect(res.statusCode).toBe(201);
    const responseBody = JSON.parse(res._getData()); // Parse JSON response
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.id).toBeDefined();
  });

  it("should return a 400 Bad Request for invalid group data", async () => {

    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/group",
      body: groupData,
    });

    const res = httpMocks.createResponse();

    await groupHandler(req, res);

    expect(res.statusCode).toBe(400);
    const responseBody = JSON.parse(res._getData());
    expect(responseBody.success).toBe(false);
  });

  it("should return all groups under certain user", async () => {

    const req = httpMocks.createRequest({
      method: "GET",
      url: "/api/group",
      query: {
        userID
      }
    });

    const res = httpMocks.createResponse();

    await groupHandler(req, res);

    expect(res.statusCode).toBe(200);
    const responseBody = JSON.parse(res._getData());
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.groups).toBeInstanceOf(Array);
  });
});
