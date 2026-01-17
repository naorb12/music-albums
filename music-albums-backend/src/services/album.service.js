import { ObjectId } from "mongodb";
import { client } from "../database/database-client.js";
import "dotenv/config";

const db = client.db("music-store");
const albumsCollection = db.collection("albums");
const reviewsCollection = db.collection("reviews");

export async function getAllAlbums() {
  try {
    return await albumsCollection.find({}).toArray();
  } catch (err) {
    throw new Error("Couldn't fetch albums from DB " + err);
  }
}

export async function getAlbumById(id) {
  try {
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
        "Album " + album.title + " by " + album.artist + " already exists.",
      );
      throw new Error(
        "Album " + album.title + " by " + album.artist + " already exists.",
      );
    }
    const albumCoverURLS = await getAlbumCover(album.title, album.artist);
    const albumLinks = await getAlbumLinks(album.title, album.artist);
    return await albumsCollection.insertOne({
      title: album.title,
      artist: album.artist,
      year: album.year,
      genre: album.genre,
      rating: album.rating ?? 0,
      reviewsCount: album.reviewsCount ?? 0,
      albumCoverURL: albumCoverURLS,
      albumLinks: albumLinks,
    });
  } catch (err) {
    console.log(err);
    throw new Error("DB error: ", err);
  }
}

export async function updateAlbum(id, album) {
  try {
    const albumCoverURLS = await getAlbumCover(album.title, album.artist);

    const updatedAlbum = { ...album, albumCoverURL: albumCoverURLS };
    return await albumsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedAlbum },
      { returnDocument: "after" },
    );
  } catch (err) {
    throw new Error("Couldnt fetch album covers");
  }
}

export async function deleteAlbum(id) {
  try {
    return await albumsCollection.deleteOne({ _id: new ObjectId(id) });
  } catch (err) {
    console.log("Couldnt deleterr ", err);
    throw new Error("Couldn't delete from DB ", err);
  }
}

export async function calcReviewsAndUpdate(id, newRating, countAdded) {
  try {
    const album = await getAlbumById(id);
    if (countAdded) {
      album.rating =
        (album.rating * album.reviewsCount + newRating) /
        (album.reviewsCount + countAdded);
      album.reviewsCount += countAdded;
    } else {
      const reviews = await reviewsCollection.find({ albumId: id }).toArray();
      const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
      const rating = reviews.length === 0 ? 0 : sum / reviews.length;
      album.rating = rating;
    }
    const result = await updateAlbum(id, album);
  } catch (err) {
    console.log("Couldnt calculate reviews");
    throw err;
  }
}

async function getAlbumCover(title, artist) {
  try {
    // 1. Search release-group by album title
    const newTitle = title.replaceAll(" ", "+");
    const newArtist = artist.replaceAll(" ", "+");

    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.LAST_FM_API_KEY}&artist=${newArtist}&album=${newTitle}&format=json`,
    );
    const data = await response.json();
    if (!data.album || !data.album.image) {
      console.log(`No album cover found for ${title} by ${artist}`);
      return null;
    }
    const imagesURLS = data.album.image;

    return imagesURLS;
  } catch (err) {
    console.error("Couldn't fetch data:", err);
    return null;
  }
}

async function getAlbumLinks(title, artist) {
  const youtube = `https://music.youtube.com/search?q=${title.trim()}+${artist.trim()}`;
  const spotify = "https://open.spotify.com/";
  let appleMusic = "https://music.apple.com/";
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=album+${title.trim()}+${artist.trim()}&entity=album`,
    );
    const data = await response.json();

    appleMusic = data.results[0].collectionViewUrl;
  } catch (err) {
    console.log("Couldn't fetch links for applemusic/spotify, ", err);
  }
  return { spotify: spotify, appleMusic: appleMusic, youtube: youtube };
}
