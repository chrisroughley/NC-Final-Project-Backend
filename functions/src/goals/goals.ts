import * as admin from "firebase-admin";

export const getGoalById = async (req:any, res:any) => {
  const goalId = req.params.goalId;

  const goal = await admin
      .firestore()
      .collection("goals")
      .doc(goalId)
      .get();

  const goalData = goal.data();
  // const goalFeed = goalData;

  res.status(200).send(goalData);
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
