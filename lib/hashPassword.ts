// import { findUserByEmail } from './userApi';

const bcrypt = require('bcrypt');

export async function generateHashPassword(password: string) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
