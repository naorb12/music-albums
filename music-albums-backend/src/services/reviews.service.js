import { client } from "../database/database-client.js";

const db = client.db("music-store");
const reviewsCollection = db.collection("reviews");

export async function addReview(userId, albumId, rating, comment) {
  let addedReviews = 0;
  try {
    const review = await reviewsCollection.findOne({
      userId: userId,
      albumId: albumId,
    });
    if (review) {
      console.log("Updating review");
      const createdAt = new Date();
      await reviewsCollection.updateOne(
        { _id: review._id },
        { $set: { rating, comment, createdAt } },
      );
    } else {
      addedReviews += 1;
      await reviewsCollection.insertOne({
        userId,
        albumId,
        rating,
        comment,
        createdAt: new Date(),
      });
    }
    return addedReviews;
  } catch (err) {
    console.log("Failed to add review for album ", err);
    throw err;
  }
}
export async function deleteReviewsByAlbumId(albumId) {
  try {
    const reviewsDeleted = await reviewsCollection.deleteMany({
      albumId: albumId,
    });
    console.log("Deleted ", reviewsDeleted, " reviews");
  } catch (err) {
    console.log("Service: Couldn't delete reviews ");
    throw err;
  }
}
export async function getReviewsByAlbumId(albumId) {
  try {
    const reviews = await reviewsCollection
      .find({ albumId: albumId })
      .toArray();
    return reviews;
  } catch (err) {
    console.log("Service: Can't find reviews ", err);
    throw err;
  }
}
