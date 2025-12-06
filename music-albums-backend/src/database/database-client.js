import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";

const DB_URL = process.env.DB_URI;
export const client = new MongoClient(DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function runDatabaseConnect() {
  try {
    await client.connect();
  } catch (err) {
    console.log("Couldnt connect to DB");
    throw err;
  }
}
