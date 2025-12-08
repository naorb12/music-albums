import Button from "@mui/material/Button";
import { FaSpotify } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";

export default function AlbumLinks({ album }) {
  const youtubeLink = `https://music.youtube.com/search?q=${album.title.trim()}+${album.artist.trim()}`;
  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://stackoverflow.com/questions/30202755/react-router-open-link-in-new-tab"
      >
        <Button sx={{ minWidth: 32, paddingRight: 2, paddingLeft: 0 }}>
          <FaSpotify size={25} color="#1DB954" />
        </Button>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://stackoverflow.com/questions/30202755/react-router-open-link-in-new-tab"
      >
        <Button sx={{ minWidth: 32, paddingRight: 2 }}>
          <SiApplemusic size={25} color="#FA243C" />
        </Button>
      </a>
      <a target="_blank" rel="noopener noreferrer" href={youtubeLink}>
        <Button sx={{ minWidth: 32, paddingRight: 2 }}>
          <FaYoutube size={25} color="#FF0000" />
        </Button>
      </a>
    </>
  );
}
