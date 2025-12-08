import Button from "@mui/material/Button";
import { FaSpotify } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";

export default function AlbumLinks({ album }) {
  const albumLinks = album.albumLinks ? album.albumLinks : "";
  return (
    <>
      <Button
        component="a"
        href={albumLinks.spotify}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ minWidth: 32, paddingRight: 2, paddingLeft: 0 }}
      >
        <FaSpotify size={25} color="#1DB954" />
      </Button>
      <Button
        component="a"
        href={albumLinks.appleMusic}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ minWidth: 32, paddingRight: 2 }}
      >
        <SiApplemusic size={25} color="#FA243C" />
      </Button>
      <Button
        component="a"
        href={albumLinks.youtube}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ minWidth: 32, paddingRight: 2 }}
      >
        <FaYoutube size={25} color="#FF0000" />
      </Button>
    </>
  );
}
