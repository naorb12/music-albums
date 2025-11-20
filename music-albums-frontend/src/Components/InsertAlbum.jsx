import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function InsertAlbum({ onClick, setErrorLabel }) {
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [year, setYear] = useState();
  const [genre, setGenre] = useState();

  return (
    <>
      <TextField
        required
        value={title}
        name="title"
        id="standard-multiline-flexible"
        label="Album"
        multiline
        maxRows={1}
        variant="standard"
        onChange={(e) => {
          setTitle(e.target.value);
          setErrorLabel("");
        }}
      />
      <TextField
        required
        value={artist}
        name="artist"
        id="standard-multiline-flexible"
        label="Artist"
        multiline
        maxRows={1}
        variant="standard"
        onChange={(e) => {
          setArtist(e.target.value);
          setErrorLabel("");
        }}
      />
      <TextField
        required
        value={year}
        name="year"
        id="standard-multiline-flexible"
        label="Year"
        multiline
        maxRows={1}
        variant="standard"
        onChange={(e) => {
          setYear(e.target.value);
        }}
      />
      <TextField
        required
        value={genre}
        name="genre"
        id="standard-multiline-flexible"
        label="Genre"
        multiline
        maxRows={1}
        variant="standard"
        onChange={(e) => {
          setGenre(e.target.value);
        }}
      />
      <span>
        <Button
          variant="outlined"
          type="submit"
          onClick={() => onClick(title, artist, year, genre)}
          disabled={!title || !artist || !year || !genre}
        >
          Add Album
        </Button>
      </span>
    </>
  );
}
