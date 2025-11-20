import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import AlbumCard from "../Components/AlbumCard";

export default function AlbumPage() {
  const { _id } = useParams();
  const [album, setAlbum] = useState();

  useEffect(() => {
    async function getAlbum(_id) {
      try {
        console.log("trying to get album");
        const response = await fetch(`http://localhost:3000/albums/${_id}`);
        const data = await response.json();
        console.log("album fetched ", data);
        setAlbum(data);
      } catch (err) {
        console.log("Couldnt fetch album ", _id);
      }
    }
    getAlbum(_id);
  }, [_id]);

  return <>{album && <AlbumCard album={album} />}</>;
}
