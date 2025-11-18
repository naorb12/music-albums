import { useEffect, useState } from "react";
import AlbumGrid from "../Components/AlbumGrid";
import InsertAlbum from "../Components/InsertAlbum";

export default function HomePage() {
  const [albums, setAlbums] = useState("");

  async function getAlbums() {
    try {
      const response = await fetch("http://localhost/albums");
      const data = await response.json();
    } catch {
      console.log("Couldn't fetch albums");
    }
  }

  async function addAlbum(title, artist, year, genre) {
    try {
      const result = await fetch("http://localhost/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          artist: artist,
          year: year,
          genre: genre,
        }),
      });
      const data = await result.json();
      setAlbums(data);
    } catch (err) {
      console.log("Couldnt add album" + err);
    }
  }

  useEffect(() => {
    const albumsFromDb = getAlbums();
    setAlbums(albumsFromDb);
  }, []);

  return (
    <div>
      <h1>the albums mine.</h1>
      <InsertAlbum onClick={addAlbum} />
      {albums.length > 0 && <AlbumGrid albums={albums} />}
    </div>
  );
}
