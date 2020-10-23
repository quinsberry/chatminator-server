import { Request, Response, NextFunction } from "express";
import { verifyJWTToken } from "../utils";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.path === "/user/signin" ||
    req.path === "/user/signup" ||
    req.path === "/user/verify"
  ) {
    return next();
  }

  const token = req.headers.token as string;
  verifyJWTToken(token)
    .then((user) => {
      //@ts-ignore
      req.user = user;
      next();
    })
    .catch(() => {
      return res.status(403).json({
        success: false,
        message: "Invalid auth token provided",
      });
    });
};
