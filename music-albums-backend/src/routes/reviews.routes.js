import { Router } from "express";
import { calcReviews, getAlbumById } from "../services/album.service.js";
import { addReview } from "../services/reviews.service.js";
import { auth } from "../middlewares/auth.js";
const router = new Router();

router.get("/:id", async (req, res) => {});

router.post("/:albumId", auth, async (req, res) => {
  const { albumId } = req.params;
  const { rating } = req.body;
  const userId = req.user.id;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Rating must be between 1 and 5" });
  }
  try {
    const exist = await getAlbumById(albumId);
    if (!exist) {
      return res.status(404).json({ error: "Album doesn't exist" });
    }

    const result = await addReview(userId, albumId, rating);
    await calcReviews(albumId);
    res.status(200).json({ message: "Review added" });
  } catch (err) {
    res.status(500).json({ error: `error occured adding review: ${err}` });
  }
});

export default router;
