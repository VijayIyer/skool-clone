const bcrypt = require('bcrypt');

export async function generateHashPassword(password: String) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function compareHashPasswordWith(password: String) {
  //todo get hashed password from database
  const savedPassword = '';
  return await bcrypt.compare(password, savedPassword);
}
