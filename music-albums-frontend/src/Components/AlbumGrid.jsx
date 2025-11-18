import Grid from "@mui/material/Grid";
import AlbumCard from "./AlbumCard";

export default function AlbumGrid({ albums }) {
  return (
    <Grid container spacing={3}>
      {albums.map((album) => (
        <Grid item xs={12} sm={6} md={3} key={album.id}>
          <AlbumCard album={album} />
        </Grid>
      ))}
    </Grid>
  );
}
