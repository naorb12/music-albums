import { useCallback, useEffect, useState } from "react";
import AlbumGrid from "../Components/AlbumGrid";
import InsertAlbum from "../Components/InsertAlbum/InsertAlbum.jsx";

export default function HomePage({ isAdmin }) {
  const [albums, setAlbums] = useState([]);
  const [errorLabel, setErrorLabel] = useState();

  async function getAlbums() {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}albums`);
      const data = await response.json();
      setAlbums(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAlbums();
  }, []);

  async function addAlbum(title, artist, year, genre) {
    try {
      if (
        !albums.some(
          (album) =>
            album.title.toLowerCase().trim() === title.toLowerCase().trim() &&
            album.artist.toLowerCase().trim() === artist.toLowerCase().trim(),
        )
      ) {
        setAlbums((prev) => {
          const newAlbum = {
            title: title,
            artist: artist,
            year: year,
            genre: genre,
          };
          const newAlbums = [...prev, newAlbum];
          return newAlbums;
        });
        const result = await fetch(`${import.meta.env.VITE_SERVER}albums`, {
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

  async function editAlbum(id, title, artist, year, genre) {
    try {
      if (!id || !title || !artist || !year || !genre) {
        throw new Error("Edit details missing");
      }

      setAlbums((albums) => {
        const newAlbums = albums.map((album) => {
          if (album._id === id) {
            let editedAlbum = {
              ...album,
              title: title,
              artist: artist,
              year: year,
              genre: genre,
            };
            if (editedAlbum.title.toLowerCase() === album.title.toLowerCase()) {
              editedAlbum = {
                ...editedAlbum,
                albumCoverURL: album.albumCoverURL,
              };
            }

            return editedAlbum;
          } else {
            return album;
          }
        });
        return newAlbums;
      });
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}albums/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            title: title,
            artist: artist,
            year: year,
            genre: genre,
          }),
        },
      );
      const data = await response.json();
      getAlbums();
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteAlbum(id) {
    console.log("Deleting album ", id);
    try {
      setAlbums((albums) => albums.filter((album) => album._id !== id));
      const res = await fetch(`${import.meta.env.VITE_SERVER}albums/${id}`, {
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
    <div id="home-page">
      <h1 className="page-title">albums on repeat.</h1>
      <InsertAlbum onClick={addAlbum} setErrorLabel={setErrorLabel} />
      {errorLabel && <label color="red">{errorLabel}</label>}
      {albums.length > 0 && (
        <AlbumGrid
          albums={albums}
          handleDeleteAlbum={deleteAlbum}
          handleEditAlbum={editAlbum}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
}
