const bcrypt = require("bcrypt");
export default async function comparePasswords(
  oldHashedPassword: string,
  password: string
) {
  try {
    const result = await bcrypt.compare(password, oldHashedPassword);

    return result;
  } catch (err) {
    console.error(err); // refactor to use some logger instead
    return false;
  }
}
