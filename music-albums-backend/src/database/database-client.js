import { MongoClient, ServerApiVersion } from "mongodb";

export const DB_URL =
  "mongodb+srv://naorb12_db_user:4WciFNp1iA3w6bFI@cluster0.2h73vsn.mongodb.net/?appName=Cluster0";

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
  } catch {
    console.log("Couldnt connect to DB");
  }
}
