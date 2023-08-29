import User from '../models/User';

export async function createUser(
  firstName: String,
  lastName: String,
  email: String,
  password: String
) {
  try {
    //create user option 1

    const newUser = new User({
      firstname: firstName,
      lastname: lastName,
      email,
      password,
    });
    const user = await newUser.save();

    //create user option 2

    // const user = await User.create({
    //   firstname: firstName,
    //   lastname: lastName,
    //   email,
    //   password,
    // });

    return { success: true, message: user };
  } catch (error) {
    console.log('database error:unable to create new user \n', error);
    throw error;
  }
  // console.log(message);
}
