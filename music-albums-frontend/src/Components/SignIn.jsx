import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function SigIn({ setIsLoggedIn, navigate }) {
  const [userName, setUserName] = useState();
  const [password, setPassowrd] = useState();
  const [errorLabel, setErrorLabel] = useState("");

  async function handleSignIn(params) {
    try {
      const response = await fetch("http://localhost:3000/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: userName, password: password }),
      });
      const data = await response.json();
      console.log(data);

      setIsLoggedIn(true);
      navigate("/albums");
    } catch (err) {
      console.log("Couldn't sign in, ", err.status);
    }
  }
  return (
    <Stack spacing={1}>
      <TextField
        value={userName}
        id="outlined-basic"
        label="User Name"
        variant="outlined"
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        value={password}
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onChange={(e) => setPassowrd(e.target.value)}
      />
      <Button variant="contained" color="success" onClick={handleSignIn}>
        Sign In
      </Button>
      <label>{errorLabel}</label>
    </Stack>
  );
}
