import * as functions from "firebase-functions";
import * as express from "express";
import {addMessage} from "./add-message/addMessage";
import {addUser} from "./add-user/add-user";

import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

const app = express();

app.post("/feed", addMessage);
app.post("/user", addUser);

exports.app = functions.https.onRequest(app);
