import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { getToken } from "../utils/generateToken";

dotenv.config();

interface CustomRequest extends Request {
  user?: string | jwt.JwtPayload; // Adjust based on your JWT payload type
}

const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    const user = getToken(token);
    if (!user) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export { isAuthenticated };
