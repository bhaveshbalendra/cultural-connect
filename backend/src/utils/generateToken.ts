import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;

function setToken(user: any) {
  return jwt.sign(
    { _id: user._id, email: user.email },
    secret!,
    { expiresIn: "1d" } // Token will expire in 1 minute
  );
}

function getToken(token: any) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret!);
  } catch (error) {
    return null;
  }
}

export { setToken, getToken };
