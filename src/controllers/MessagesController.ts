import { Request, Response } from "express";
import { Message, Dialog } from "../models";

import { IMessage } from "models/Message";

export class MessagesController {
  create = async (req: Request, res: Response) => {
    const userId: string = "5f749d6fa45a3d5021b8138d";
    const data = {
      text: req.body.text,
      dialog: req.body.dialog_id,
      attachments: req.body.attachments,
      user: userId,
    } as IMessage;

    try {
      await Dialog.findOne({ _id: req.body.dialog_id });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: "Dialog not found",
      });
    }

    Message.create(data, (err: any, message: any) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err,
        });
      }

      res.status(201).json({
        success: true,
        data: message,
      });
    });
  };

  delete = async (req: Request, res: Response) => {
    const dialogId: string = req.params.id;

    try {
      await Message.findOne({ _id: dialogId });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    Message.deleteOne({ _id: dialogId }, (err: any) => {
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

  allFromDialog = async (req: Request, res: Response) => {
    const dialogId = req.query.dialog as string;

    try {
      await Dialog.findOne({ _id: dialogId });
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: "Dialog not found",
      });
    }

    Message.find({ dialog: dialogId })
      .populate(["dialog"])
      .exec((err: any, messages: Array<IMessage>) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err,
          });
        }

        res.status(200).json({
          success: true,
          data: messages,
        });
      });
  };
}
