import express from "express";
import cors from "cors";

import { runDatabaseConnect } from "./src/database/database-client.js";
import {
  addAlbum,
  getAlbumById,
  getAllAlbums,
  updateAlbum,
  deleteAlbum,
} from "./src/services/album-service.js";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log("Listening on port " + port);
});

await runDatabaseConnect();

app.get("/albums", async (req, res) => {
  try {
    const albums = await getAllAlbums();
    res.status(200).json(albums);
  } catch {
    res.status(500).json({ error: "Couldn't fetch albums from DB" });
  }
});

app.get("/albums/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "No id" });
    }
    const album = await getAlbumById(id);
    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }
    console.log("Found album ", id);
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json({ error: "Couldn't get album." });
  }
});

app.post("/albums", async (req, res) => {
  try {
    const album = req.body;

    if (!album.title || !album.artist || !album.year || !album.genre) {
      return res
        .status(400)
        .json({ error: "Album details are missing." + album });
    }
    const result = await addAlbum(album);
    res.status(201).json(result.insertedId);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/albums/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "No id" });
    }
    const album = req.body;

    const result = await updateAlbum(id, album);
    if (!result.value) {
      return res.status(400).json({ error: "Album not found" });
    }
    res.status(201).json(result.value);
  } catch (err) {
    res.status(500).json({ error: "Couldn't update album" });
  }
});

app.delete("/albums/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Bckend: ID to delete: ", id);
    if (!id) {
      return res.status(400).json({ error: "No id" });
    }

    const result = await deleteAlbum(id);
    if (result.deletedCount !== 1) {
      return res.status(400).json({ error: "Album not deleted" });
    }
    res.status(201).json({ messege: "Album deleted" });
  } catch (err) {
    res.status(500).json({ error: "Couldn't update album" });
  }
});
