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
      <div className="album-grid">
        {albums.map((album) => (
          <Grid key={album._id}>
            <AlbumCard
              key={album._id}
              album={album}
              handleDeleteAlbum={handleDeleteAlbum}
              handleEditAlbum={handleEditAlbum}
              isAdmin={isAdmin}
              rating={true}
            />
          </Grid>
        ))}
      </div>
    </Box>
  );
}
