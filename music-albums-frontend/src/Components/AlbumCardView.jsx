import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function AlbumCardView({
  album,
  handleDeleteAlbum,
  isAdmin,
  setIsEditing,
  rating,
}) {
  const stop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <div>
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
        {rating && (
          <Rating name="disabled" value={album.rating} disabled>
            {album.reviewsCount}
          </Rating>
        )}
      </div>

      {isAdmin && (
        <div>
          <IconButton
            onClick={(e) => {
              stop(e);
              setIsEditing(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              stop(e);
              handleDeleteAlbum(album._id);
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </div>
      )}
    </>
  );
}
