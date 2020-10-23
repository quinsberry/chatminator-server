import { Schema, model, Document } from "mongoose";

import { IUser } from "./User";
import { IDialog } from "./Dialog";

export interface IMessage {
  text: string;
  dialog: IDialog | string;
  user: IUser | string;
  read: boolean;
  attachments?: object | string;
}

export type IMessageDocument = IMessage & Document;

const MessageSchema = new Schema<IMessage>(
  {
    text: { type: String, required: true },
    dialog: {
      type: Schema.Types.ObjectId,
      ref: "Dialog",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    attachments: {
      type: Schema.Types.ObjectId,
      ref: "UploadFile",
    },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

export const Message = model<IMessageDocument>("Message", MessageSchema);
