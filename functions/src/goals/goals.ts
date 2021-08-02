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

export const setNewGoal = async (req: Request, res: Response) => {
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

export const getGoalById = async (req: Request, res: Response) => {
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

// export const getComment = async (req: any, res: any) => {
//   const postId = req.params.postId;
//   console.log("ENDPOINT", req.params);

//   const commentsFeed = await admin
//       .firestore()
//       .collection("feed")
//       .doc(postId)
//       .collection("comments")
//       .orderBy("comment", "asc")
//       .get();

//   let comments: any[] = [];
//   commentsFeed.docs.forEach((comment) => {
//     const commentId = comment.id;
//     const commentData = comment.data();
//     comments = [...comments, {commentId, ...commentData}];
//   });
//   res.status(200).send(comments);
// };
