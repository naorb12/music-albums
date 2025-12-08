import { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router";
import AlbumCardView from "./AlbumCardView";
import AlbumCardEdit from "./AlbumCardEdit";

export default function AlbumCard({
  album,
  handleDeleteAlbum,
  handleEditAlbum,
  isAdmin,
  rating,
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
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
            textAlign: "center",
          }}
        >
          {!isEditing && (
            <AlbumCardView
              album={album}
              handleDeleteAlbum={handleDeleteAlbum}
              isAdmin={isAdmin}
              setIsEditing={setIsEditing}
              rating={rating}
            />
          )}
          {isEditing && (
            <AlbumCardEdit
              album={album}
              handleEditAlbum={handleEditAlbum}
              setIsEditing={setIsEditing}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
