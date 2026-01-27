import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import "./InsertAlbum.css";
import { isLoggedIn } from "../../utils/auth";

export default function InsertAlbum({ onClick, setErrorLabel }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [message, setMessage] = useState(null);

  function resetInputs() {
    setTitle("");
    setArtist("");
    setYear("");
    setGenre("");
    setMessage(null);
  }

  const isLoggedAndValid = () => {
    const token = sessionStorage.getItem("token");

    if (
      token !== null &&
      title !== "" &&
      artist !== "" &&
      year !== "" &&
      genre !== ""
    ) {
      return true;
    }

    return false;
  };

  function buttonForUser() {
    if (isLoggedIn()) {
      setMessage(null);
    } else {
      setMessage("Please login to add an album.");
    }
  }

  return (
    <div id="form-wrapper">
      <div className="form">
        <TextField
          className="text-field"
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
            buttonForUser();
            setErrorLabel("");
          }}
        />
        <TextField
          className="text-field"
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
            buttonForUser();
            setErrorLabel("");
          }}
        />
        <TextField
          className="text-field"
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
            buttonForUser();
          }}
        />
        <TextField
          className="text-field"
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
            buttonForUser();
          }}
        />
        <div className="button-stack">
          <Button
            className="add-button"
            variant="outlined"
            type="submit"
            onClick={() => {
              onClick(title, artist, year, genre);
              resetInputs();
            }}
            sx={{ maxWidth: "118px" }}
            disabled={!isLoggedAndValid()}
          >
            Add Album
          </Button>
          {message && <label id="error">{message}</label>}
        </div>
      </div>
    </div>
  );
}
