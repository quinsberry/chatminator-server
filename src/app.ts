import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import { UsersCtrl, DialogsCtrl, MessagesCtrl } from "./controllers";
import { updateLastSeen, checkAuth } from "./middlewares";

const app = express();

app.use(updateLastSeen);
app.use(checkAuth);
app.use(express.json());

app.get("/user/me", UsersCtrl.getMe);
app.post("/user/signup", UsersCtrl.create);
app.post("/user/signin", UsersCtrl.login);
app.get("/user/all", UsersCtrl.all);
app.delete("/user/:id", UsersCtrl.delete);
app.get("/user/:id", UsersCtrl.show);

app.get("/dialogs", DialogsCtrl.allFromUser);
app.post("/dialogs", DialogsCtrl.create);
app.delete("/dialogs/:id", DialogsCtrl.delete);

app.get("/messages", MessagesCtrl.allFromDialog);
app.post("/messages", MessagesCtrl.create);
app.delete("/messages/:id", MessagesCtrl.delete);

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3001;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}..`);
    });
  } catch (e) {
    console.log(`Server Error: ${e.message}`);
    process.exit(1);
  }
}

start();
