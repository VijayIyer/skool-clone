import User from '../models/User';

export async function createNewUser(
  firstName: String,
  lastName: String,
  email: String,
  password: String
) {
  try {
    const newUser = new User({
      firstname: firstName,
      lastname: lastName,
      email,
      password,
    });
    const user = await newUser.save();
    return user;
  } catch (error) {
    throw error;
  }
}

export async function isUserEmailTook(email: String) {
  const user = await User.find({ email }).exec();
  if (user.length > 0) {
    return true;
  }
  return false;
}

export async function findPasswordByEmail(email: String) {
  try {
  } catch (error) {
    console.log('database error:unable to find this user \n', error);
    throw error;
  }
}
