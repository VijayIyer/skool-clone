import User from '../models/User';

export async function createUser(
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

    return { success: true, message: user };
  } catch (error) {
    console.log('database error:unable to create new user \n', error);
    throw error;
  }
  // console.log(message);
}
