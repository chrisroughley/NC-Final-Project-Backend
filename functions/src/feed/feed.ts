import * as admin from "firebase-admin";

export const getComment = async (req: any, res: any) => {
  const postId = req.params.postId;
  console.log("ENDPOINT", req.params);

  const commentsFeed = await admin
      .firestore()
      .collection("feed")
      .doc(postId)
      .collection("comments")
      // .orderBy("date", "asc")
      .get();

  let comments: any[] = [];
  commentsFeed.docs.forEach((comment) => {
    const commentId = comment.id;
    const commentData = comment.data();
    comments = [...comments, {commentId, ...commentData}];
  });
  res.status(200).send(comments);
};

export const getMessages = async ( req: any, res: any ) => {
  const feed = await admin.firestore().collection("feed")
      // .orderBy("date", "asc")
      .get();
  console.log(Object.keys(feed.docs[0].data()));


  let messages: any[] = [];
  feed.docs.forEach((message) => {
    const id = message.id;
    const data = message.data();
    messages = [...messages, {id, ...data}];
  });

  res.status(200).send(messages);
};

export const addMessage = async ( req: any, res: any ) => {
  // const postDate = new Date();
  const messageBody = {...req.body/* , postDate*/};
  await admin.firestore().collection("feed").add(messageBody);
  res.status(201).send(messageBody);
};
