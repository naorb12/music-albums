import { client } from "../database/database-client.js";

const db = client.db("music-store");
const albumsCollection = db.collection("albums");

export async function getAllAlbums() {
  return albumsCollection.find({}).toArray();
}

export async function getAlbumById(id) {
  return albumsCollection.findOne({ _id: newObject(id) });
}

export async function addAlbum(album) {
  const albumCoverURL = await getAlbumCover(album.title);
  return albumsCollection.insertOne({
    title: album.title,
    artist: album.artist,
    year: album.year,
    genre: album.genre,
    rating: album.rating ?? 0,
    reviewsCount: album.reviewsCount ?? 0,
    albumCoverURL: albumCoverURL,
  });
}

export async function updateAlbum(id, album) {
  return albumsCollection.findOneAndUpdate(
    { _id: id },
    { $set: album },
    { returnDocument: "after" }
  );
}

async function getAlbumCover(title) {
  try {
    // 1. Search release-group by album title
    const response = await fetch(
      `https://musicbrainz.org/ws/2/release-group/?query=release:${title}&fmt=json`
    );
    const data = await response.json();
    const releaseGroupMbid = data["release-groups"]?.[0]?.id;
    if (!releaseGroupMbid) return null;

    // 2. Get actual release MBID (required for CAA)
    const releasesRes = await fetch(
      `https://musicbrainz.org/ws/2/release?release-group=${releaseGroupMbid}&fmt=json`
    );
    const releasesData = await releasesRes.json();
    const releaseMbid = releasesData.releases?.[0]?.id;
    if (!releaseMbid) return null;

    // 3. Fetch cover art from CAA
    const coverRes = await fetch(
      `https://coverartarchive.org/release/${releaseMbid}`
    );
    const coverData = await coverRes.json();

    // Return thumbnails
    return coverData.images?.[0]?.thumbnails;
  } catch (err) {
    console.error("Couldn't fetch data:", err);
    return null;
  }
}
