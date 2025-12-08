import "./ReviewSummary.css";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import RatingBars from "./RatingBars";

export default function ReviewSummary({ album }) {
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
          <Rating disabled value={album.Rating} />
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
    </>
  );
}
