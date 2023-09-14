const mongoose = require("mongoose");
const  Group  = require("@/models/Group");
const db = require("../setup/db");

const GroupData = {
  name: "TekLoon",
  email: "tekloon@gmail.com",
  phone: "07000000000",
  password: "TekLoon123",
};

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});


/**
 * Group model
 */
describe("Group model", () => {
  it("create & save Group successfully", async () => {
    const validGroup = new Group(GroupData);
    await validGroup.setPassword(GroupData.password);
    const savedGroup = await validGroup.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedGroup._id).toBeDefined();
    expect(savedGroup.email).toBe(GroupData.email);
    expect(savedGroup.phone).toBe(GroupData.phone);
    expect(savedGroup.salt).toBeDefined();
  });

  // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert Group successfully, but the field not defined in schema should be undefined", async () => {
    const GroupWithInvalidField = new Group({
      ...GroupData,
      nickname: "Handsome TekLoon",
    });
    await GroupWithInvalidField.setPassword(GroupData.password);
    const savedGroupWithInvalidField = await GroupWithInvalidField.save();
    expect(savedGroupWithInvalidField._id).toBeDefined();
    expect(savedGroupWithInvalidField.nickname).toBeUndefined();
  });

  // It should us tell us the errors in on email field.
  it("create Group without required field should failed", async () => {
    const GroupWithoutRequiredField = new Group({ name: "TekLoon" });
    let err;
    try {
      const savedGroupWithoutRequiredField = await GroupWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });
});