import React, { useEffect, useState } from "react";
import { getPlaylist, getUserPlaylists } from "./api/spotify";
import axios from "axios";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import LoginScreen from "./auth/LoginScreen";
import PlaylistScreen from "./chunks/PlaylistScreen/index";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // FIXED: Accept playlistId as parameter and update selected playlist state
  const handleFetchPlaylist = async (playlistId) => {
    if (!playlistId || !token) {
      console.error("Missing playlist ID or token");
      return;
    }

    try {
      console.log("App: Fetching playlist with ID:", playlistId);
      const playlistData = await getPlaylist(playlistId, token);
      console.log("App: Successfully fetched playlist:", playlistData.name);

      // Update the selected playlist state
      setPlaylist(playlistData);
      return playlistData;
    } catch (error) {
      console.error("App: Error fetching playlist:", error);
      alert(
        "Error loading playlist: " +
          (error.response?.data?.error?.message || error.message)
      );

      if (error.response && error.response.status === 401) {
        window.localStorage.removeItem("token");
        setToken("");
      }
      throw error;
    }
  };

  // FIXED: Accept playlist parameter and handle both current and single playlist export
  const handleExport = async (playlistToExport = null) => {
    try {
      let targetPlaylist = playlistToExport || playlist;

      if (!targetPlaylist) {
        alert("No playlist selected for export");
        return;
      }

      console.log("App: Exporting playlist:", targetPlaylist.name);

      // If playlist doesn't have tracks loaded, fetch them first
      if (
        !targetPlaylist.tracks?.items ||
        targetPlaylist.tracks.items.length === 0
      ) {
        console.log("App: Playlist tracks not loaded, fetching...");
        targetPlaylist = await handleFetchPlaylist(targetPlaylist.id);
      }

      if (!targetPlaylist.tracks?.items) {
        throw new Error("No tracks found in playlist");
      }

      const data = targetPlaylist.tracks.items
        .filter((item) => item.track) // Filter out null tracks
        .map((item) => ({
          name: item.track.name,
          artist: item.track.artists.map((artist) => artist.name).join(", "),
          album: item.track.album?.name || "Unknown Album",
          duration: formatDuration(item.track.duration_ms),
          added_date: new Date(item.added_at).toLocaleDateString(),
          spotify_url: item.track.external_urls?.spotify || "",
        }));

      if (data.length === 0) {
        throw new Error("No valid tracks found in playlist");
      }

      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `${targetPlaylist.name}.csv`);

      console.log("App: Successfully exported playlist:", targetPlaylist.name);
    } catch (error) {
      console.error("App: Error exporting playlist:", error);
      alert("Failed to export playlist: " + error.message);
    }
  };

  const handleExportAll = async () => {
    if (playlists.length === 0) {
      alert("No playlists available to export");
      return;
    }

    setLoading(true);
    let successCount = 0;
    let failureCount = 0;

    for (const pl of playlists) {
      try {
        console.log("App: Exporting playlist:", pl.name);
        const playlistData = await getPlaylist(pl.id, token);

        if (!playlistData.tracks?.items) {
          console.warn("App: Playlist has no tracks:", pl.name);
          continue;
        }

        const data = playlistData.tracks.items
          .filter((item) => item.track)
          .map((item) => ({
            name: item.track.name,
            artist: item.track.artists.map((artist) => artist.name).join(", "),
            album: item.track.album?.name || "Unknown Album",
            duration: formatDuration(item.track.duration_ms),
            added_date: new Date(item.added_at).toLocaleDateString(),
            spotify_url: item.track.external_urls?.spotify || "",
          }));

        if (data.length > 0) {
          const csv = Papa.unparse(data);
          const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
          saveAs(blob, `${playlistData.name}.csv`);
          successCount++;
        }

        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error("App: Error exporting playlist:", pl.name, error);
        failureCount++;
      }
    }

    setLoading(false);
    alert(
      `Export completed! ${successCount} playlists exported successfully. ${failureCount} failed.`
    );
  };

  // Helper function to format duration
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="h-screen p-4 bg-slate-800 dark:bg-zinc-900 flex items-center justify-center">
        <div className="loader"></div>
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
          handleFetchPlaylist={handleFetchPlaylist}
          handleExport={handleExport}
          handleExportAll={handleExportAll}
        />
      )}
    </div>
  );
}

export default App;
