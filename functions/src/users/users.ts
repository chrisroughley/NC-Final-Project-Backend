import * as admin from "firebase-admin";

export const addUser = async (req:any, res:any) => {
  const user = req.body;
  await admin.firestore().collection("users").add(user);
  res.status(201).send();
};
