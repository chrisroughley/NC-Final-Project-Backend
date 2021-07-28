import * as functions from "firebase-functions";
import * as express from "express";
import {addMessage} from "./add-message/addMessage";

import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

const app = express();

app.post("/feed", addMessage);

app.post("/", async (req, res) => {
  const user = req.body;

  await admin.firestore().collection("users").add(user);
  res.status(201).send();
});

exports.app = functions.https.onRequest(app);
