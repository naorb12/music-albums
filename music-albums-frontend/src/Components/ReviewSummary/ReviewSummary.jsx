import "./ReviewSummary.css";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import RatingBars from "./RatingBars";

export default function ReviewSummary({ album, reviews }) {
  console.log(reviews);
  const reviewsStats = {
    1: reviews.filter((review) => review.rating > 0 && review.rating <= 1)
      .length,
    2: reviews.filter((review) => review.rating > 1 && review.rating <= 2)
      .length,
    3: reviews.filter((review) => review.rating > 2 && review.rating <= 3)
      .length,
    4: reviews.filter((review) => review.rating > 3 && review.rating <= 4)
      .length,
    5: reviews.filter((review) => review.rating > 4 && review.rating <= 5)
      .length,
  };

  return (
    <>
      <div id="rating-wrapper">
        <div id="rating">
          <Typography variant="h4" gutterBottom sx={{ color: "black" }}>
            Reviews
          </Typography>
          <Typography variant="h3" gutterBottom sx={{ color: "black" }}>
            {album.rating}
          </Typography>
          <Rating
            name="read-only"
            value={album.rating}
            precision={0.5}
            readOnly
          />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "gray", paddingLeft: 0.5 }}
          >
            {album.reviewsCount} reviews
          </Typography>
        </div>
        <div id="linear-rating">
          <RatingBars stats={reviewsStats} />
        </div>
      </div>
    </>
  );
}
