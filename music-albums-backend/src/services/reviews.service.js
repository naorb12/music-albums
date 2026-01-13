import { client } from "../database/database-client.js";

const db = client.db("music-store");
const reviews = db.collection("reviews");

export async function addReview(userId, albumId, rating) {
  try {
    const review = await reviews.findOne({ userId: userId, albumId: albumId });
    if (review) {
      console.log("Updating review");
      return await reviews.updateOne({ _id: review._id }, { $set: { rating } });
    }
    return await reviews.insertOne({
      userId,
      albumId,
      rating,
      createdAt: new Date(),
    });
  } catch (err) {
    console.log("Failed to add review for album ", err);
    throw err;
  }
}
