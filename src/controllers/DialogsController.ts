import { Request, Response } from "express";
import { Dialog, Message } from "../models";

import { IDialog, IDialogDocument } from "models/Dialog";

export class DialogsController {
  create = (req: Request, res: Response): void => {
    const data = {
      author: req.body.author,
      partner: req.body.partner,
    } as IDialog;

    Dialog.create(data, (err: any, dialog: any) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }

      Message.create(
        {
          text: req.body.text,
          dialog: dialog._id,
          user: req.body.author,
          read: false,
        },
        (err: any, message: any) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err,
            });
          }
        }
      );

      res.status(201).json({
        success: true,
        data: dialog,
      });
    });
  };

  delete = async (req: Request, res: Response) => {
    const dialogId: string = req.params.id;

    try {
      await Dialog.findOne({ _id: dialogId });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: "Dialog not found",
      });
    }

    Dialog.deleteOne({ _id: dialogId }, (err: any) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }

      res.status(200).json({
        success: true,
      });
    });
  };

  // show = (req: Request, res: Response): void => {
  //   const id: string = req.params.id;

  //   User.findById(id, (err: any, user: IUser) => {
  //     if (err) {
  //       return res.status(500).json({
  //         success: false,
  //         message: err,
  //       });
  //     }

  //     if (!user) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "User not found",
  //       });
  //     }

  //     res.status(200).json({
  //       success: true,
  //       data: user,
  //     });
  //   });
  // };

  allFromUser = (req: Request, res: Response): void => {
    const authorId: string = "5f749d6fa45a3d5021b8138d";

    Dialog.find({ author: authorId })
      .populate(["author", "partner"])
      .exec((err: any, dialogs: Array<IDialog>) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err,
          });
        }

        res.status(200).json({
          success: true,
          data: dialogs,
        });
      });
  };

  all = (req: Request, res: Response): void => {
    Dialog.find({}, (err: any, dialogs: Array<IDialog>) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }

      res.status(200).json({
        success: true,
        data: dialogs,
      });
    });
  };
}
