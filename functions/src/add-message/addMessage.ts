import * as admin from "firebase-admin";

export const addMessage = async (req:any, res:any) => {
  const messageBody = req.body;
  console.log(messageBody);
  await admin.firestore().collection("feed").add(messageBody);
  res.status(201).send(req.body);
};
