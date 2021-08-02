import * as admin from "firebase-admin";
import {Response} from "express";
import * as uniqid from "uniqid";

type UserRequest = {
  body: {username: string,
  password: string}
}

export const addUser = async (req: UserRequest, res: Response) => {
  const user = {
    ...req.body,
    id: uniqid(),
    progress: 0,
  };
  await admin.firestore().collection("users").add(user);
  res.status(201).send(user);
};

export const getUsers = async (req: any, res: Response) => {
  const users = await admin.firestore().collection("users").get();
  const usersArray = users.docs.map((doc) => {
    return doc.data();
  });
  res.status(200).send(usersArray);
};

