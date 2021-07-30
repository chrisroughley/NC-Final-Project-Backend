import * as functions from "firebase-functions";
import * as express from "express";
import {addPost, getFeed, getComment, addComment} from "./feed/feed";
import {getGoalById} from "./goals/goals";
import {addUser} from "./users/users";

import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

const app = express();

app.get("/feed", getFeed);
app.post("/feed", addPost);

app.get("/feed/:postId", getComment);
app.post("/feed/:postId", addComment);

app.post("/user", addUser);

app.get("/goals/:goalId", getGoalById);

exports.app = functions.https.onRequest(app);
