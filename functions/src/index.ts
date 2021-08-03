import * as functions from "firebase-functions";
import * as express from "express";
import {addPostToFeed, getFeed} from "./feed/feed";
import {setNewGoal, getGoalById} from "./goals/goals";
import {addUser, getUsers} from "./users/users";
import {addCommentByPostId, getComments} from "./comments/comments";
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);

const app = express();

app.get("/goals/:goalId/feed/:postId", getComments);
app.put("/goals/:goalId/feed/:postId", addCommentByPostId);

app.get("/goals/:goalId/feed", getFeed);
app.put("/goals/:goalId/feed", addPostToFeed);

app.get("/users", getUsers);
app.post("/users", addUser);

app.get("/goals/:goalId", getGoalById);
app.post("/goals", setNewGoal);

exports.app = functions.https.onRequest(app);
