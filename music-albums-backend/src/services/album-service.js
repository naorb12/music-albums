import { ObjectId } from "mongodb";
import { client } from "../database/database-client.js";

const db = client.db("music-store");
const albumsCollection = db.collection("albums");

export async function getAllAlbums() {
  try {
    return await albumsCollection.find({}).toArray();
  } catch (err) {
    throw new Error("Couldn't fetch albums from DB " + err);
  }
}

export async function getAlbumById(id) {
  try {
    console.log("Trying to find album ", id);
    return await albumsCollection.findOne({ _id: new ObjectId(id) });
  } catch {
    console.log("couldnt get album by id");
    throw new Error("Couldnt get album from DB");
  }
}

export async function addAlbum(album) {
  try {
    const exist = await albumsCollection.findOne({
      title: album.title,
      artist: album.artist,
    });
    if (exist) {
      console.log(
        "Album " + album.title + " by " + album.artist + " already exists."
      );
      throw new Error(
        "Album " + album.title + " by " + album.artist + " already exists."
      );
    }
    console.log("Trying to add album");
    const albumCoverURLS = await getAlbumCover(album.title, album.artist);
    return await albumsCollection.insertOne({
      title: album.title,
      artist: album.artist,
      year: album.year,
      genre: album.genre,
      rating: album.rating ?? 0,
      reviewsCount: album.reviewsCount ?? 0,
      albumCoverURL: albumCoverURLS,
    });
  } catch (err) {
    console.log(err);
    throw new Error("DB error: ", err);
  }
}

export async function updateAlbum(id, album) {
  return await albumsCollection.findOneAndUpdate(
    { _id: id },
    { $set: album },
    { returnDocument: "after" }
  );
}

export async function deleteAlbum(id) {
  try {
    return await albumsCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    console.log("Couldnt deleterr ", err);
    throw new Error("Couldn't delete from DB ", err);
  }
}

async function getAlbumCover(title, artist) {
  try {
    // 1. Search release-group by album title
    const newTitle = title.replaceAll(" ", "+");
    const newArtist = artist.replaceAll(" ", "+");

    const LAST_FM_API_KEY = "80c050775e4d5ee4ad3619d0b0b51a52";
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${LAST_FM_API_KEY}&artist=${newArtist}&album=${newTitle}&format=json`
    );
    const data = await response.json();
    const imagesURLS = data.album.image;

    return imagesURLS;
  } catch (err) {
    console.error("Couldn't fetch data:", err);
    return null;
  }
}
