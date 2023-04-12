import connectToDatabase from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

const validation = (data, minLength, type = "text") => {
  const trimedData = data.trim();

  if (!trimedData || trimedData.length < minLength) {
    return false;
  }

  if (type === "email" && !trimedData.includes("@")) {
    return false;
  }

  return true;
};

// this needs to error handling
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;
    let [isvalidEmail, isValidPassword] = [false, false];

    isvalidEmail = validation(email, 1, "email");
    isValidPassword = validation(password, 7);

    if (!isvalidEmail || !isValidPassword) {
      res.status(422).json({ message: "invalid inputs" });
      client.close();
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "user exist already" });
      client.close();
      return;
    }
    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    console.log(result);

    res.status(201).json({ message: "user created" });

    client.close();
  }
}

export default handler;
