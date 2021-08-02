import * as functions from "firebase-functions";
import * as express from "express";
import {addPostToFeed, getFeed} from "./feed/feed";
import {setNewGoal, getGoalById} from "./goals/goals";
// import {addUser} from "./users/users";

import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

const app = express();

app.get("/goals/:goalId/feed", getFeed);
app.put("/goals/:goalId/feed", addPostToFeed);

// app.get("/feed/:postId", getComment);
// app.post("/feed/:postId", addComment);

// app.post("/user", addUser);

app.get("/goals/:goalId", getGoalById);
app.post("/goals", setNewGoal);

exports.app = functions.https.onRequest(app);
