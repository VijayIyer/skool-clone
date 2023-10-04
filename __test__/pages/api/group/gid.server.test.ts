import httpMocks from "node-mocks-http";
import gidHandler from "@/pages/api/group/[gid]";
import { dbConnect, dbDisconnect } from "@/lib/mongoClient";
import { createUser, deleteUsers } from "@/lib/userLib";
import Group from "@/models/Group";
import UserGroupRelation from "@/models/UserGroupRelation";

beforeAll(async () => {
  await dbConnect();
  const userRes = await createUser("John", "Doe", "test@example.com", "password123");

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

const groupData = {
  name: "NextJS",
  type: "private",
  icon: null,
  description: "this is updated description",
  about: {
    text: "this is updated about",
    media: null
  }
}

describe("/api/group/[gid]", () => {
  it("should update a certain group", async () => {

    // Create a mock request and response
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/api/group/nextjs-2743",
      query: {gid: "nextjs-2743"},
      body: {
        ...groupData
      }
    });

    const res = httpMocks.createResponse();

    // Call handler with the mock request and response
    await gidHandler(req, res);

    // Assert the response status code and the response body
    expect(res.statusCode).toBe(201);
    const responseBody = JSON.parse(res._getData()); // Parse JSON response
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.id).toBeDefined();
  });

  it("should return group all details", async () => {

    const req = httpMocks.createRequest({
      method: "GET",
      url: "/api/group/nextjs-2743",
      query: {gid: "nextjs-2743"}
    });

    const res = httpMocks.createResponse();

    await gidHandler(req, res);

    expect(res.statusCode).toBe(200);
    const responseBody = JSON.parse(res._getData());
    expect(responseBody.success).toBe(true);
    expect(responseBody.data.group.name).toBe(groupData.name);
    expect(responseBody.data.group.description).toBe(groupData.description);
    expect(responseBody.data.group.about.text).toBe(groupData.about.text);
  });
});
