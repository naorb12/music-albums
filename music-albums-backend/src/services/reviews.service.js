import { client } from "../database/database-client.js";

const db = client.db("music-store");
const reviews = db.collection("reviews");

export async function addReview(userId, albumId, rating) {
  let addedReviews = 0;
  try {
    const review = await reviews.findOne({ userId: userId, albumId: albumId });
    if (review) {
      console.log("Updating review");
      await reviews.updateOne({ _id: review._id }, { $set: { rating } });
    } else {
      addedReviews += 1;
      await reviews.insertOne({
        userId,
        albumId,
        rating,
        createdAt: new Date(),
      });
    }
    return addedReviews;
  } catch (err) {
    console.log("Failed to add review for album ", err);
    throw err;
  }
}
