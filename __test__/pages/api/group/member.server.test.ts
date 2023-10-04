import httpMocks from "node-mocks-http";
import groupMemberHandler from "@/pages/api/group/[gid]/member";
import { dbConnect, dbDisconnect } from "@/lib/mongoClient";
import { createUser, deleteUsers } from "@/lib/userLib";
import Group from "@/models/Group";
import UserGroupRelation from "@/models/UserGroupRelation";

let userID: string;
let memberID: string;
beforeAll(async () => {
  await dbConnect();
  const userRes = await createUser("John", "Doe", "test@example.com", "password123");
  const memberRes = await createUser("Tim", "Smith", "member@example.com", "password321")
  if(userRes._id) {
    userID = userRes._id.toString();
  }
  if(memberRes._id) {
    memberID = memberRes._id.toString();
  }
    const newGroup = new Group({
        gid: "nextjs-2743",
        name: "NextJS",
        type: "private",
        icon: null,
        description: null,
        about: {
        text: null,
        media: null
        }
    });
    const dbRes = await newGroup.save();
    const newUserGroupRelation = new UserGroupRelation({
    group: dbRes._id,
    user: userRes._id,
    role: "creator"
    });
    await newUserGroupRelation.save();
});

afterAll(async () => {
    await UserGroupRelation.deleteMany({});
    await Group.deleteMany({});
    await deleteUsers();
    await dbDisconnect();
  })

describe("/api/group/[gid]/member", () => {
  it("should add a member to certain group", async () => {

    // Create a mock request and response
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/group/nextjs-2743/member",
      query: {gid: "nextjs-2743"},
      body: {userID: memberID, role: "member"}
    });

    const res = httpMocks.createResponse();

    // Call handler with the mock request and response
    await groupMemberHandler(req, res);

    // Assert the response status code and the response body

    expect(res.statusCode).toBe(201);
    const responseBody = JSON.parse(res._getData()); // Parse JSON response
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.role).toBe("member");
  });

  it("should update a user role in certain group", async () => {

    // Create a mock request and response
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/group/nextjs-2743/member",
      query: {gid: "nextjs-2743"},
      body: {userID: memberID, role: "admin"}
    });

    const res = httpMocks.createResponse();

    // Call handler with the mock request and response
    await groupMemberHandler(req, res);

    // Assert the response status code and the response body

    expect(res.statusCode).toBe(201);
    const responseBody = JSON.parse(res._getData()); // Parse JSON response
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.role).toBe("admin");
  });

  it("should return all users in the group", async () => {

    const req = httpMocks.createRequest({
      method: "GET",
      url: "/api/group/nextjs-2743/member",
      query: {gid: "nextjs-2743"}
    });

    const res = httpMocks.createResponse();

    await groupMemberHandler(req, res);

    expect(res.statusCode).toBe(200);
    const responseBody = JSON.parse(res._getData());
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.users).toBeInstanceOf(Array);
  });
});
