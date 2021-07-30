import * as functions from "firebase-functions";
import * as express from "express";
import {addMessage, getMessages, getComment} from "./feed/feed";
import {addUser} from "./users/users";

import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

const app = express();

app.get("/feed", getMessages);
app.post("/feed", addMessage);

app.get("/feed/:postId", getComment);

app.post("/user", addUser);

exports.app = functions.https.onRequest(app);
