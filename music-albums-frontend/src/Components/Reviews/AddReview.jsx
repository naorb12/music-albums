import { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./AddReview.css";

const labels = {
  0.5: "Unlistenable",
  1: "Unlistenable+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Masterpiece",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function AddReview({ albumId, onAddReview }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!rating) return;
    onAddReview(albumId, rating, comment);
    setRating(0);
    setComment("");
  };

  return (
    <Paper
      sx={{ backgroundColor: "transparent" }}
      elevation={0}
      className="add-review-box"
    >
      <Typography variant="h6" gutterBottom>
        Add your review
      </Typography>
      <Box sx={{ mb: 2, width: 200, display: "flex", alignItems: "center" }}>
        <Rating
          name="hover-feedback"
          value={rating}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {rating !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
        )}
      </Box>
      <TextField
        label="Your review (optional)"
        multiline
        rows={3}
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!rating}
        onClick={handleSubmit}
      >
        Submit Review
      </Button>
    </Paper>
  );
}
