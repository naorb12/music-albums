import { client } from "../database/database-client.js";
import "dotenv/config";
import jwt from "jsonwebtoken";

const db = client.db("music-store");
const users = db.collection("users");

export async function signIn(userName, password) {
  try {
    const user = await users.findOne({ userName: userName });
    if (!user) {
      console.log("User not found, adding it to db.");
      await users.insertOne({ userName: userName, password: password });
      return true;
    }
    // User exists
    if (user.password !== password) {
      console.log("Passwords do not match");
      throw new Error("Passwords don't match");
    }
    const token = jwt.sign(
      {
        userId: userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return token;
  } catch (err) {
    throw err;
  }
}
