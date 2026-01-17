import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import AlbumHeader from "../Components/AlbumHeader/AlbumHeader.jsx";
import ReviewSummary from "../Components/ReviewSummary/ReviewSummary.jsx";
import ReviewsList from "../Components/Reviews/ReviewsList.jsx";
export default function AlbumPage({ isAdmin }) {
  const { _id } = useParams();
  const [album, setAlbum] = useState();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getAlbum(_id) {
      try {
        const response = await fetch(`http://localhost:3000/albums/${_id}`);
        const data = await response.json();
        setAlbum(data);
      } catch (err) {
        console.log("Couldnt fetch album ", _id);
      }
    }
    async function getReviews(_id) {
      try {
        const response = await fetch(`http://localhost:3000/reviews/${_id}`);
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.log("Couldnt get reviews ", err);
      }
    }
    getAlbum(_id);
    getReviews(_id);
  }, [_id]);

  return (
    <>
      {album && (
        <div id="album-page">
          <AlbumHeader album={album} />
          <ReviewSummary album={album} />
          <ReviewsList reviews={reviews} albumId={_id} />
        </div>
      )}
    </>
  );
}
