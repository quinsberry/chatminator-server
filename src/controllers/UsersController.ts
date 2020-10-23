import { Request, Response } from "express";
import { User } from "../models";

import { IUser } from "models/User";
import { createJWToken } from "../utils";
import { ILoginData } from "../utils/auth/createJWToken";

export class UsersController {
  create(req: Request, res: Response): void {
    const data = {
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    } as IUser;

    User.create(data, (err: any, user: any) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }

      res.status(201).json({
        success: true,
        data: user,
      });
    });
  }

  async login(req: Request, res: Response): Promise<void> {
    const postData: ILoginData = {
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const user = await User.findOne(postData).exec();
      if (!user) {
        res.status(404).json({
          success: false,
          message: "Email or password is incorrect",
        });
        return;
      }
    } catch (e) {
      res.status(404).json({
        success: false,
        message: "Email or password is incorrect",
      });
      return;
    }

    const token = createJWToken(postData);

    res.status(200).json({
      success: true,
      token,
    });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;

    try {
      await User.findOne({ _id: id });
    } catch (e) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    User.deleteOne({ _id: id }, (err: any) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }

      return res.status(200).json({
        success: true,
      });
    });
  }

  getMe(req: Request, res: Response): void {
    // TODO: Authentification
  }

  show(req: Request, res: Response): void {
    const id: string = req.params.id;

    User.findById(id, (err: any, user: IUser) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    });
  }

  all(req: Request, res: Response): void {
    User.find({}, (err: any, users: Array<IUser>) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }

      res.status(200).json({
        success: true,
        data: users,
      });
    });
  }
}
