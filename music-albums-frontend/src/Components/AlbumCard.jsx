import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router";
import IconButton from "@mui/material/IconButton";

export default function AlbumCard({ album, handleDeleteAlbum }) {
  return (
    <Card
      component={Link}
      to={`/albums/id/${album._id}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        margin: "6px",
        alignItems: "center",
        backgroundColor: "#faeed7ff",
      }}
    >
      {album.albumCoverURL && (
        <CardMedia
          component="img"
          image={
            album.albumCoverURL.filter((url) => url.size === "large")[0][
              "#text"
            ]
          }
          alt={album.title}
          sx={{
            width: "150px",
            height: "150px",
            padding: "8px",
            objectFit: "contain", // important
          }}
        />
      )}

      <CardContent
        sx={{ flexGrow: 0, width: "160px", height: "150px", padding: "0px" }}
      >
        <Typography variant="h6" color="text.secondary" noWrap>
          {album.title}
        </Typography>
        <Typography variant="body3" color="text.secondary" noWrap>
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
        <IconButton
          onClick={(e) => {
            console.log("Trying to delete ID ", album._id);
            e.preventDefault();
            e.stopPropagation();
            handleDeleteAlbum(album._id);
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
