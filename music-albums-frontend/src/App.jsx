import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import AlbumPage from "./Pages/AlbumPage";
import SignInPage from "./Pages/SignInPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums" element={<HomePage />} />
        <Route path="/albums/id/:_id" element={<AlbumPage />} />
        <Route
          path="/sign-in"
          element={<SignInPage setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
