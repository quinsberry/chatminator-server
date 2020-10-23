import jwt from "jsonwebtoken";
import { reduce } from "lodash";

export interface ILoginData {
  email: string;
  password: string;
}

export const createJWToken = (user: ILoginData) => {
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET || "123", {
    expiresIn: process.env.JWT_MAX_AGE || "7d",
    algorithm: "HS256",
  });

  return token;
};
