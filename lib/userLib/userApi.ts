import User from '../../models/User';

//User CRUD function below can only be invoke when server connects with database, such as code like  "await dbConnect();" from lib/dbConnect.ts is invoked
export async function createUser(
  firstName: String,
  lastName: String,
  email: String,
  password: String
) {
  try {
    firstName = firstName.toLowerCase();
    lastName = lastName.toLowerCase();
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
    console.error('Error deleting users:', error);
    throw error;
  }
}
