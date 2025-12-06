import { useState } from "react";
import AlbumCardView from "./AlbumCardView";
import AlbumCardEdit from "./AlbumCardEdit";

export default function AlbumCard({
  album,
  handleDeleteAlbum,
  handleEditAlbum,
  isAdmin,
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {!isEditing && (
        <AlbumCardView
          album={album}
          handleDeleteAlbum={handleDeleteAlbum}
          isAdmin={isAdmin}
          setIsEditing={setIsEditing}
        />
      )}
      {isEditing && (
        <AlbumCardEdit
          album={album}
          isAdmin={isAdmin}
          handleEditAlbum={handleEditAlbum}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}
