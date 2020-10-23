import { Schema, model, Document } from "mongoose";
import { IUser } from "./User";
import { IMessage } from "./Message";

export interface IDialog {
  author: IUser | string;
  partner: IUser | string;
  messages: Array<IMessage>;
  last_message?: IMessage | string;
}

export type IDialogDocument = IDialog & Document;

const DialogSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    partner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    last_message: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

export const Dialog = model<IDialogDocument>("Dialog", DialogSchema);
