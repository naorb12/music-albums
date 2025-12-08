import AlbumLinks from "../AlbumLinks/AlbumLinks";
import "./AlbumHeader.css";
import Typography from "@mui/material/Typography";

export default function ({ album }) {
  return (
    <div id="album-header-wrapper">
      <img
        src={
          album.albumCoverURL.filter((url) => url.size === "extralarge")[0][
            "#text"
          ]
        }
        alt={album.title}
      />
      <div id="album-details">
        <Typography variant="h2" gutterBottom sx={{ color: "black" }}>
          {album.title}
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: "black" }}>
          {album.artist}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: "gray" }}>
          {album.year}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: "gray" }}>
          {album.genre}
        </Typography>
        <div id="links">
          <AlbumLinks album={album} />
        </div>
      </div>
    </div>
  );
}
