import * as admin from "firebase-admin";

export const getMessages = async ( req: any, res: any ) => {
  const feed = await admin.firestore().collection("feed").get();
  console.log("feed log", feed);

  feed.

  res.status(200).send(feed);
};

export const addMessage = async ( req: any, res: any ) => {
  const messageBody = req.body;
  console.log(req);
  console.log(messageBody);
  await admin.firestore().collection("feed").add(messageBody);
  res.status(201).send(messageBody);
};
