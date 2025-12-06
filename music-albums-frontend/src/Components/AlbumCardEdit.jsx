import { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import { Link } from "react-router";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

export default function AlbumCardEdit({
  album,
  isAdmin,
  handleEditAlbum,
  setIsEditing,
}) {
  const [newTitle, setNewTitle] = useState(album.title);
  const [newArtist, setNewArtist] = useState(album.artist);
  const [newYear, setNewYear] = useState(album.year);
  const [newGenre, setNewGenre] = useState(album.genre);

  const stop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card
      component={Link}
      to={`/albums/id/${album._id}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        padding: "0px",
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
        sx={{
          flexGrow: 0,
          width: "160px",
          height: "100%",
          padding: "0px",
          "&:last-child": {
            paddingBottom: 1,
          },
        }}
      >
        {isAdmin && (
          <div>
            <TextField
              id="standard-basic"
              value={newTitle}
              label="Title"
              variant="standard"
              onClick={(e) => stop(e)}
              onChange={(e) => setNewTitle(e.target.value)}
              size="small"
            />
            <TextField
              id="standard-basic"
              value={newArtist}
              label="Artist"
              variant="standard"
              onClick={(e) => stop(e)}
              onChange={(e) => setNewArtist(e.target.value)}
              size="small"
            />
            <TextField
              id="standard-basic"
              value={newYear}
              label="Year"
              variant="standard"
              onClick={(e) => stop(e)}
              onChange={(e) => setNewYear(e.target.value)}
              size="small"
            />
            <TextField
              id="standard-basic"
              value={newGenre}
              label="Genre"
              variant="standard"
              onClick={(e) => stop(e)}
              onChange={(e) => setNewGenre(e.target.value)}
              size="small"
            />
            <Rating name="disabled" value={album.rating} disabled>
              {album.reviewsCount}
            </Rating>
            <div>
              <IconButton
                onClick={(e) => {
                  stop(e);
                  setIsEditing(false);
                  handleEditAlbum(
                    album._id,
                    newTitle,
                    newArtist,
                    newYear,
                    newGenre
                  );
                }}
              >
                <DoneIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  stop(e);
                  setIsEditing(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
