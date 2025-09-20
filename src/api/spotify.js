import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

// const redirectUri =
//   import.meta.env.MODE === "development"
//     ? "http://localhost:5173/"
//     : "https://tunetransfer.netlify.app/";
const redirectUri = window.location.origin + "/";

const scopes = ["playlist-read-private", "playlist-read-collaborative"];
const authEndpoint = "https://accounts.spotify.com/authorize";

const getLoginUrl = () => {
  return `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
};

const getUserPlaylists = async (token) => {
  const result = await axios.get("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return result.data;
};

const getPlaylist = async (playlistId, token) => {
  const result = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  return result.data;
};

export { getLoginUrl, getUserPlaylists, getPlaylist };
