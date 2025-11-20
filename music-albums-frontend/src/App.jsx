import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Header from "./Components/Header";
import AlbumPage from "./Pages/AlbumPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums" element={<HomePage />} />
        <Route path="/albums/id/:_id" element={<AlbumPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
