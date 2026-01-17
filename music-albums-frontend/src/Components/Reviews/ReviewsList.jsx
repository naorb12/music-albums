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

export default function ReviewsList({ reviews, albumId }) {
  async function handleAddReview(albumId, newRating, comment) {
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
          comment: comment,
        }),
      });
    } catch (err) {
      console.log("Couldnt add review ", err);
    }
  }

  return (
    <>
      <AddReview albumId={albumId} onAddReview={handleAddReview} />
      <Paper elevation={2} sx={{ maxHeight: 400, overflowY: "auto", mt: 3 }}>
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
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}
