import * as admin from "firebase-admin";
import {Response} from "express";
// import * as uniqid from "uniqid";

type Request = {
  params: {
    goalId: string,
    postId: string,
  },
  body: PostComment,
}

type PostComment = {
  commentBody: string,
  username: string,
  commentDate?: Date,
}

type Post = {
  postId: string,
  user: string,
  postDate: string,
  postBody: string,
  comments: PostComment[],
}

export const getComments =
  async (req: Request, res: Response): Promise<void> => {
    const goalId = req.params.goalId;
    const postId = req.params.postId;

    const currentGoal = await admin
        .firestore()
        .collection("goals")
        .doc(goalId)
        .get();
    const currentGoalData = currentGoal.data();
    let postComments: PostComment[] = [];

    currentGoalData?.feed.forEach((post: Post) => {
      if (post.postId === postId) {
        postComments = [...post.comments];
      }
    });

    res.status(200).send(postComments);
  };

export const addCommentByPostId =
  async (req: Request, res: Response): Promise<void> => {
    const goalId = req.params.goalId;
    const postId = req.params.postId;
    const commentDate = new Date();
    const newComment = {...req.body, commentDate};

    const currentGoal = await admin
        .firestore()
        .collection("goals")
        .doc(goalId)
        .get();
    const currentGoalData = currentGoal.data();
    let postComments: PostComment[] = [];

    currentGoalData?.feed.forEach((post: Post) => {
      if (post.postId === postId) {
        const currentPostComments: PostComment[] = [...post.comments];
        postComments = [...currentPostComments, newComment];
        post.comments = postComments;
      }
    });

    if (currentGoalData) {
      await admin
          .firestore()
          .collection("goals")
          .doc(goalId)
          .set(currentGoalData);
    }

    res.status(200).send(postComments);
  };
