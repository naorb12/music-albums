import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Link } from "react-router";

export default function AlbumCard() {
  return (
    <Card
      component={Link}
      to={`/album/${album.id}`}
      sx={{
        height: "100%",
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        image={album.coverUrl["250"]}
        alt={album.title}
        sx={{ height: 250, objectFit: "cover" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" noWrap>
          {album.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {album.artist}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {album.genre}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {album.year}
        </Typography>
        <Rating name="disabled" value={album.rating} disabled>
          {album.reviewsCount}
        </Rating>
      </CardContent>
    </Card>
  );
}
