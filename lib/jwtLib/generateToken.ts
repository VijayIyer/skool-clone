import jwt from "jsonwebtoken";
type UserAuthDetails = {
  email: string;
  id: string;
};
export default function generateJwtToken({ id, email }: UserAuthDetails) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) return null;
  return jwt.sign({ id: id.toString(), email: email }, JWT_SECRET, {
    expiresIn: "2m",
  });
}
