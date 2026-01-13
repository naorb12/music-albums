import "./ReviewSummary.css";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import RatingBars from "./RatingBars";
import AddReview from "./AddReview";
import { useState } from "react";
import { isLoggedIn } from "../../utils/auth";

export default function ReviewSummary({ album }) {
  const [rating, setRating] = useState(album.rating);

  async function handleAddReview(albumId, newRating) {
    try {
      const token = localStorage["token"];
      const response = await fetch(`http://localhost:3000/reviews/${albumId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: newRating,
        }),
      });
    } catch (err) {
      console.log("Couldnt add review ", err);
    }
  }

  return (
    <>
      <div id="rating-wrapper">
        <div id="rating">
          <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
            Reviews
          </Typography>
          <Typography variant="h3" gutterBottom sx={{ color: "black" }}>
            {rating}
          </Typography>
          <Rating name="read-only" value={rating} readOnly />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "gray", paddingLeft: 0.5 }}
          >
            {album.reviewsCount} reviews
          </Typography>
        </div>
        <div id="linear-rating">
          <RatingBars stats={{ 5: 12, 4: 7, 3: 3, 2: 1, 1: 0 }} />
        </div>
      </div>
      {isLoggedIn() && (
        <AddReview albumId={album.id} onAddReview={handleAddReview} />
      )}
    </>
  );
}
