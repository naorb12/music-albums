import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SigIn({ setUser }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorLabel, setErrorLabel] = useState("");

  async function handleSignIn() {
    try {
      const response = await fetch("http://localhost:3000/users/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: userName, password: password }),
      });
      if (response.status === 200) {
        setUser(userName);
        navigate("/albums");
      } else if (response.status === 401) {
        setErrorLabel("User or Password don't match");
      }
    } catch (err) {
      console.log("Couldn't sign in, ", err);
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
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="success" onClick={handleSignIn}>
        Sign In
      </Button>
      <label style={{ color: "red" }}>{errorLabel}</label>
    </Stack>
  );
}
