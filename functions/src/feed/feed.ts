import {Response} from "express";
import * as admin from "firebase-admin";
import * as uniqid from "uniqid";

type Comment = {
  commentBody: string;
  user: string;
  commentDate?: string;
}

type Feed = {
  user: string;
  postBody: string;
  comments?: Comment[];
  date: Date;
}

type Goal = {
  startDate: Date;
  endDate: Date;
  goalId: number;
  goalName: string;
  goalTarget: number;
  category: string;
  feed?: Feed[];
}

type Request = {
  body: Goal;
  params: {goalId: string}
}

type PostRequest = {
  body: {postBody: string;}
  params: {goalId: string}
}

export const getFeed =
  async (req: Request, res: Response): Promise<void> => {
    const goalId = req.params.goalId;
    const goal = await admin
        .firestore()
        .collection("goals")
        .doc(goalId)
        .get();

    const goalFeed = goal?.data()?.feed;

    res.status(200).send(goalFeed);
  };

export const addPostToFeed =
  async (req: PostRequest, res: Response): Promise<void> => {
    const goalId = req.params.goalId;
    const postBody = {
      ...req.body,
      postDate: new Date(),
      comments: [],
      postId: uniqid(),
    };
    const currentGoal = await admin
        .firestore()
        .collection("goals")
        .doc(goalId)
        .get();
    const currentGoalData = currentGoal.data();
    currentGoalData?.feed.push(postBody);
    if (currentGoalData) {
      await admin
          .firestore()
          .collection("goals")
          .doc(goalId)
          .set(currentGoalData);
    }
    res.status(201).send(currentGoalData);
  };
