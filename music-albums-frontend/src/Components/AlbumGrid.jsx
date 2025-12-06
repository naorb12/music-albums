import Grid from "@mui/material/Grid";
import AlbumCard from "./AlbumCard";
import Box from "@mui/material/Box";

export default function AlbumGrid({
  albums,
  handleDeleteAlbum,
  handleEditAlbum,
  isAdmin,
}) {
  return (
    <Box sx={{ margin: 5 }}>
      <Grid container spacing={2} sx={{ maxWidth: "900" }}>
        <div className="album-grid">
          {albums.map((album) => (
            <Grid
              key={album._id}
              sx={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <AlbumCard
                key={album._id}
                album={album}
                handleDeleteAlbum={handleDeleteAlbum}
                handleEditAlbum={handleEditAlbum}
                isAdmin={isAdmin}
              />
            </Grid>
          ))}
        </div>
      </Grid>
    </Box>
  );
}
