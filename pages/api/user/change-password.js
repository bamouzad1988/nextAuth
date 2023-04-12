import { verifyPassword, hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

import { getSession } from "next-auth/react";

// this needs to error handling
async function handler(req, res) {
  if (req.method !== "PATCH") {
    return null;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Not Logged In!" });
    return null;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const userCollection = client.db().collection("users");
  const user = await userCollection.findOne({ email: userEmail });
  if (!user) {
    client.close();
    res.status(401).json({ message: "User Not Found!" });
    return;
  }

  const currentPassword = user.password;
  const isValidPassword = await verifyPassword(oldPassword, currentPassword);

  if (!isValidPassword) {
    client.close();
    res.status(403).json({ message: "passwords are not equal!" });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();

  res.status(200).json({ message: "password updated!" });
  console.log(result);
}

export default handler;
