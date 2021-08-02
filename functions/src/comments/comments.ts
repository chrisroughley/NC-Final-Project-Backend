// import * as admin from "firebase-admin";
import {Response} from "express";
// import * as uniqid from "uniqid";

type Request = {
  params: {
    goalId: string,
    postId: string
  }
}
export const getComments= async (req: Request, res: Response) => {
  // const goalId = req.params.goalId;
  const postId = req.params.postId;

  // const goal = await admin
  //     .firestore()
  //     .collection("goals")
  //     .doc(goalId)
  //     // .orderBy("date", "asc")
  //     .get();

  // let posts: any[] = [];
  // const goalFeed = goal?.data()?.feed;
  // goal.feed.forEach((post) => {
  //   const id = post.id;
  //   const data = post.data();
  //   posts = [...posts, {id, ...data}];
  // });

  res.status(200).send(postId);
};
