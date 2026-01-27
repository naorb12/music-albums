import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import AddReview from "./AddReview";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function ReviewsList({ reviews, albumId, onReviewAdded }) {
  async function handleAddReview(albumId, newRating, comment) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}reviews/${albumId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: newRating,
            comment: comment,
          }),
        },
      );
      if (response.ok) {
        await onReviewAdded();
      } else {
        console.log("Failed to add a review, status: ", response);
      }
    } catch (err) {
      console.log("Couldnt add review ", err);
    }
  }

  return (
    <>
      <AddReview albumId={albumId} onAddReview={handleAddReview} />
      <Paper
        className="reviews-wrapper"
        elevation={2}
        sx={{ maxHeight: 400, overflowY: "auto", mt: 3 }}
      >
        <List>
          {reviews.map((review) => (
            <ListItem key={review._id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>

              <ListItemText
                primary={
                  <>
                    <strong>{review.userId}</strong>
                    <Rating
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{ ml: 1, verticalAlign: "middle" }}
                    />
                  </>
                }
                secondary={review.comment}
              />
              <ListItemText
                primary={dateFormatter.format(new Date(review.createdAt))}
                sx={{ textAlign: "right" }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}
