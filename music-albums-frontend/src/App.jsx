import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import AlbumPage from "./Pages/AlbumPage";
import SignInPage from "./Pages/SignInPage";

function App() {
  const [user, setUser] = useState("");
  const isAdmin = user === "1";

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage isAdmin={isAdmin} />} />
        <Route path="/albums" element={<HomePage isAdmin={isAdmin} />} />
        <Route
          path="/albums/id/:_id"
          element={<AlbumPage isAdmin={isAdmin} />}
        />
        <Route path="/sign-in" element={<SignInPage setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
