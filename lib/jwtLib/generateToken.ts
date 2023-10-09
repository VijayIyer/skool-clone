import jwt from "jsonwebtoken";
type UserAuthDetails = {
  email: string;
  id: string;
};
export default function generateJwtToken({ id, email }: UserAuthDetails) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET)
    throw new Error(
      "Error in token generation: unable to read JWT_SECRET environment variable"
    );
  return jwt.sign({ id: id.toString(), email: email, iat: Date.now() }, JWT_SECRET, {
    expiresIn: "2m",
  });
}
