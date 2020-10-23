import { Request, Response, NextFunction } from "express";
import { User } from "../models";

export const updateLastSeen = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = "5f749d6fa45a3d5021b8138d";
  User.updateOne(
    { _id: id },
    { last_seen: new Date() },
    (err: any, user: any) => {
      next();
    }
  );
};
