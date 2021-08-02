import * as admin from "firebase-admin";

export const getComment = async (req: any, res: any) => {
  const postId = req.params.postId;
  console.log("ENDPOINT", req.params);

  const commentsFeed = await admin
      .firestore()
      .collection("feed")
      .doc(postId)
      .collection("comments")
      .orderBy("comment", "asc")
      .get();

  let comments: any[] = [];
  commentsFeed.docs.forEach((comment) => {
    const commentId = comment.id;
    const commentData = comment.data();
    comments = [...comments, {commentId, ...commentData}];
  });
  res.status(200).send(comments);
};

export const addComment = async (req: any, res: any) => {
  const postId = req.params.postId;

  const commentBody = req.body;
  commentBody.postDate = new Date();

  await admin
      .firestore()
      .collection("feed")
      .doc(postId)
      .collection("comments")
      .add(commentBody);

  res.status(201).send(commentBody);
};

export const getFeed= async (req: any, res: any) => {
  const feed = await admin
      .firestore()
      .collection("goals")
      // .orderBy("date", "asc")
      .get();

  let posts: any[] = [];
  feed.docs.forEach((post) => {
    const id = post.id;
    const data = post.data();
    posts = [...posts, {id, ...data}];
  });

  res.status(200).send(posts);
};

export const addPost = async (req: any, res: any) => {
  // const postDate = new Date();
  const messageBody = {...req.body /* , postDate*/};
  await admin.firestore().collection("feed").add(messageBody);
  res.status(201).send(messageBody);
};


