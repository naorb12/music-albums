import Grid from "@mui/material/Grid";
import AlbumCard from "./AlbumCard";
import Box from "@mui/material/Box";

export default function AlbumGrid({ albums, handleDeleteAlbum }) {
  return (
    <Box sx={{ margin: 5 }}>
      <Grid container spacing={1} sx={{ maxWidth: "200" }}>
        {albums.map((album) => (
          <Grid item key={album._id}>
            <AlbumCard
              key={album._id}
              album={album}
              handleDeleteAlbum={handleDeleteAlbum}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
