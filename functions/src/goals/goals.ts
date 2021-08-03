import {Response} from "express";
import * as admin from "firebase-admin";

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
  params?: {
    goalId: string | undefined;
} | undefined
}

export const setNewGoal =
  async (req: Request, res: Response): Promise<void> => {
    const {startDate, endDate, goalName, goalTarget, category, feed} = req.body;
    try {
      const goalsCollection = await admin.firestore().collection("goals");
      const newGoal = {
        startDate,
        endDate,
        goalName,
        goalTarget,
        category,
        feed,
      };
      goalsCollection.add(newGoal);
      res.status(200).send({
        status: "success",
        message: "goal added successfully",
        data: newGoal,
      });
    } catch (err) {
      res.status(500).json(err.message);
    }
  };

export const getGoalById =
  async (req: Request, res: Response): Promise<void> => {
    const goalId = req?.params?.goalId;
    try {
      if (goalId) {
        const goal = await admin
            .firestore()
            .collection("goals")
            .doc(goalId)
            .get();
        const goalData = goal.data();
        res.status(200).send(goalData);
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
