import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://signup:Y2HnOqJKXWZjHUZZ@cluster1.e9a3rna.mongodb.net/auth?retryWrites=true&w=majority`
  );

  return client;
}

export default connectToDatabase;
// Y2HnOqJKXWZjHUZZ
// signup
// mongodb+srv://signup:Y2HnOqJKXWZjHUZZ@cluster1.e9a3rna.mongodb.net/auth?retryWrites=true&w=majority
