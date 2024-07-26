import React, { useEffect, useState } from "react";
import { getPlaylist, getUserPlaylists } from "./api/spotify";
import axios from "axios";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import LoginScreen from "./component/LoginScreen";
import PlaylistScreen from "./component/PlaylistScreen";
import logo from "./assets/images/lg.png";

function App() {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playlistId, setPlaylistId] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);

    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      const tokenFragment = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"));
      if (tokenFragment) {
        token = tokenFragment.split("=")[1];
        window.location.hash = "";
        window.localStorage.setItem("token", token);
        setToken(token);
      } else {
        console.error("Access token not found in URL");
      }
    } else {
      setToken(token);
    }

    if (token) {
      checkTokenValidity(token).then((isValid) => {
        if (isValid) {
          fetchUserPlaylists(token);
        } else {
          console.error("Token is invalid or expired");
          window.localStorage.removeItem("token");
          setToken("");
        }
      });
    }
  }, []);

  const checkTokenValidity = async (token) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return false;
      }
      throw error;
    }
  };

  const fetchUserPlaylists = async (token) => {
    try {
      const data = await getUserPlaylists(token);
      setPlaylists(data.items);
    } catch (error) {
      console.error("Error fetching user playlists:", error);
    }
  };

  const handleFetchPlaylist = async () => {
    if (playlistId) {
      setLoading(true);
      try {
        const playlist = await getPlaylist(playlistId, token);
        setPlaylist(playlist);
      } catch (error) {
        console.error("Error fetching playlist:", error);
        alert("Invalid Playlist ID", error);
        if (error.response && error.response.status === 401) {
          window.localStorage.removeItem("token");
          setToken("");
        }
      }
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (playlist) {
      const data = playlist.tracks.items.map((item) => ({
        name: item.track.name,
        artist: item.track.artists.map((artist) => artist.name).join(", "),
        album: item.track.album.name,
      }));

      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `${playlist.name}.csv`);
    }
  };

  const handleExportAll = async () => {
    setLoading(true);
    for (const pl of playlists) {
      try {
        const playlist = await getPlaylist(pl.id, token);
        const data = playlist.tracks.items.map((item) => ({
          name: item.track.name,
          artist: item.track.artists.map((artist) => artist.name).join(", "),
          album: item.track.album.name,
        }));

        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `${playlist.name}.csv`);
      } catch (error) {
        console.error("Error exporting playlist:", error);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 bg-slate-800 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <img
            src={logo}
            alt="watermark"
            className="w-52 h-52 animate__animated animate__flash animate__slow"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {!token ? (
        <LoginScreen />
      ) : (
        <PlaylistScreen
          playlists={playlists}
          playlist={playlist}
          token={token}
          playlistId={playlistId}
          setPlaylistId={setPlaylistId}
          handleFetchPlaylist={handleFetchPlaylist}
          handleExport={handleExport}
          handleExportAll={handleExportAll}
        />
      )}
    </div>
  );
}

export default App;
