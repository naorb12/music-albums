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
    fetchAlbumData();
  }, [_id]);

  async function fetchAlbumData() {
    try {
      const [albumResponse, reviewsResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_SERVER}albums/${_id}`),
        fetch(`${import.meta.env.VITE_SERVER}reviews/${_id}`),
      ]);
      const albumData = await albumResponse.json();
      const reviewsData = await reviewsResponse.json();
      setAlbum(albumData);
      setReviews(reviewsData);
    } catch (err) {
      console.log("Couldn't fetch album data ", err);
    }
  }

  return (
    <>
      {album && (
        <div id="album-page">
          <div>
            <AlbumHeader album={album} />
            <ReviewSummary album={album} reviews={reviews} />
            <ReviewsList
              reviews={reviews}
              albumId={_id}
              onReviewAdded={fetchAlbumData}
            />
          </div>
        </div>
      )}
    </>
  );
}
