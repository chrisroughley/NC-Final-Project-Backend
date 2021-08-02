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
  params: {goalId: string}
}

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

// export const addComment = async (req: any, res: any) => {
//   const postId = req.params.postId;

//   const commentBody = req.body;
//   commentBody.postDate = new Date();

//   await admin
//       .firestore()
//       .collection("feed")
//       .doc(postId)
//       .collection("comments")
//       .add(commentBody);

//   res.status(201).send(commentBody);
// };

export const getFeed= async (req: Request, res: Response) => {
  const goalId = req.params.goalId;
  const goal = await admin
      .firestore()
      .collection("goals")
      .doc(goalId)
      // .orderBy("date", "asc")
      .get();

  // let posts: any[] = [];
  const goalFeed = goal?.data()?.feed;
  // goal.feed.forEach((post) => {
  //   const id = post.id;
  //   const data = post.data();
  //   posts = [...posts, {id, ...data}];
  // });

  res.status(200).send(goalFeed);
};

export const addPostToFeed = async (req: any, res: any) => {
  // const postDate = new Date();
  const messageBody = {...req.body /* , postDate*/};
  await admin.firestore().collection("feed").add(messageBody);
  res.status(201).send(messageBody);
};


