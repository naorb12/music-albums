import { Router } from "express";
import {
  calcReviewsAndUpdate,
  getAlbumById,
} from "../services/album.service.js";
import { addReview } from "../services/reviews.service.js";
import { auth } from "../middlewares/auth.js";
const router = new Router();

router.get("/:id", async (req, res) => {});

router.post("/:albumId", auth, async (req, res) => {
  const { albumId } = req.params;
  const { rating } = req.body;
  const userId = req.user.id;

  if (
    typeof rating !== "number" ||
    rating < 0.5 ||
    rating > 5 ||
    rating % 0.5 !== 0
  ) {
    return res
      .status(400)
      .json({ error: "Rating must be between 0.5 and 5 in 0.5 steps" });
  }
  try {
    const exist = await getAlbumById(albumId);
    if (!exist) {
      return res.status(404).json({ error: "Album doesn't exist" });
    }

    const countAdded = await addReview(userId, albumId, rating);
    await calcReviewsAndUpdate(albumId, rating, countAdded);
    res.status(200).json({ message: "Review added" });
  } catch (err) {
    res.status(500).json({ error: `error occured adding review: ${err}` });
  }
});

export default router;
