import User from "../../models/User";
type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
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
export async function getUser(userId: string | null): Promise<User> {
  try {
    const user = await User.findById(userId);
    if (!user) throw Error("Error finding user");
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    };
  } catch (error) {
    throw error;
  }
}
export async function editUser(
  id: string,
  { firstName, lastName, email, password }: User
) {
  try {
    const result = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      password,
    });
    return result;
  } catch (error) {
    throw error;
  }
}
