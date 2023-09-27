import Group from "./Group";
import {setUp, dropCollections, dropDatabase} from "@/__test__/setup/db";

const GroupData = {
    groupID: "nextjs-2734",
    groupName: "NextJS",
    groupType: "private",
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
    expect(savedGroup.groupID).toBe(GroupData.groupID);
    expect(savedGroup.groupName).toBe(GroupData.groupName);
    expect(savedGroup.groupType).toBe(GroupData.groupType);
  });
});