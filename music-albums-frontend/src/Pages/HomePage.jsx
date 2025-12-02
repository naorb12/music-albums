import { useCallback, useEffect, useState } from "react";
import AlbumGrid from "../Components/AlbumGrid";
import InsertAlbum from "../Components/InsertAlbum";

export default function HomePage() {
  const [albums, setAlbums] = useState([]);
  const [errorLabel, setErrorLabel] = useState();

  async function getAlbums() {
    try {
      const response = await fetch("http://localhost:3000/albums");
      const data = await response.json();
      setAlbums(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function addAlbum(title, artist, year, genre) {
    try {
      if (
        !albums.some(
          (album) =>
            album.title.toLowerCase().trim() === title.toLowerCase().trim() &&
            album.artist.toLowerCase().trim() === artist.toLowerCase().trim()
        )
      ) {
        const result = await fetch("http://localhost:3000/albums", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            artist: artist,
            year: year,
            genre: genre,
          }),
        });
      } else {
        setErrorLabel("Album already exists.");
        return;
      }
      getAlbums();
    } catch (err) {
      console.log("Couldnt add album " + err);
    }
  }

  async function deleteAlbum(id) {
    console.log("Deleting album ", id);
    try {
      const res = await fetch(`http://localhost:3000/albums/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      getAlbums();
    } catch (err) {
      console.log("Couldn't delete album ", err);
    }
  }

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <div>
      <h1>the albums mine.</h1>
      <InsertAlbum onClick={addAlbum} setErrorLabel={setErrorLabel} />
      {errorLabel && <label color="red">{errorLabel}</label>}
      {albums.length > 0 && (
        <AlbumGrid albums={albums} handleDeleteAlbum={deleteAlbum} />
      )}
    </div>
  );
}
