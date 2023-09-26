import User from "../../models/User";
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordChangedAt: string;
};

//User CRUD function below can only be invoke when server connects with database, such as code like  "await dbConnect();" from lib/dbConnect.ts is invoked
export async function createUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });
    const user = await newUser.save();
    return user;
  } catch (error) {
    throw error;
  }
}

export async function isUserEmailTaken(email: String) {
  const user = await User.find({ email }).exec();
  if (user.length > 0) {
    return true;
  }
  return false;
}

export async function findUserByEmail(email: String) {
  try {
    const user = await User.findOne({ email }).exec();
    return user;
  } catch (error) {
    console.log("database error:unable to find this user \n", error);
    throw error;
  }
}

//create for deleting test database
export async function deleteUsers() {
  try {
    // Use the deleteMany method to remove all documents from the User collection
    const result = await User.deleteMany({});
    return result;
  } catch (error) {
    console.error("Error deleting users:", error);
    throw error;
  }
}
export async function getUserById(userId: string | null): Promise<User> {
  try {
    const user = await User.findById(userId);
    if (!user) throw Error("Error finding user");
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      passwordChangedAt: user.passwordChangedAt,
    };
  } catch (error) {
    throw error;
  }
}
export async function editUser(id: string, updatedUser: User) {
  const { passwordChangedAt, ...updatedUserDetails } = updatedUser;
  try {
    const result = await User.findOneAndUpdate({ _id: id }, updatedUserDetails);
    return result;
  } catch (error) {
    throw error;
  }
}
