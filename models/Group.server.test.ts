import Group from "./Group";
import {setUp, dropCollections, dropDatabase} from "@/__test__/setup/db";

const GroupData = {
    gid: "nextjs-2734",
    name: "NextJS",
    type: "private",
};

beforeAll(async () => {
  await setUp();
});

afterEach(async () => {
  await dropCollections();
});

afterAll(async () => {
  await dropDatabase();
});


/**
 * Group model
 */
describe("Group model", () => {
  it("create & save Group successfully", async () => {
    const validGroup = new Group(GroupData);
    const savedGroup = await validGroup.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedGroup._id).toBeDefined();
    expect(savedGroup.gid).toBe(GroupData.gid);
    expect(savedGroup.name).toBe(GroupData.name);
    expect(savedGroup.type).toBe(GroupData.type);
  });
});