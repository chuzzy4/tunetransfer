// src/hooks/usePlaylistFilters.js
import { useState, useMemo } from "react";

export const usePlaylistFilters = (playlists, user) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");

  const filteredAndSortedPlaylists = useMemo(() => {
    const filtered = playlists.filter((pl) => {
      const matchesSearch =
        pl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pl.description &&
          pl.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "public" && pl.public) ||
        (filterBy === "private" && !pl.public) ||
        (filterBy === "owned" && pl.owner?.id === user?.id);
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "tracks":
          return (b.tracks?.total || 0) - (a.tracks?.total || 0);
        case "recent":
          return new Date(b.created_at || 0) - new Date(a.created_at || 0);
        default:
          return 0;
      }
    });
  }, [playlists, searchQuery, sortBy, filterBy, user]);

  const playlistStats = useMemo(() => {
    const totalTracks = playlists.reduce(
      (sum, p) => sum + (p.tracks?.total || 0),
      0
    );
    const publicPlaylists = playlists.filter((p) => p.public).length;
    const privatePlaylists = playlists.filter((p) => !p.public).length;

    return {
      totalPlaylists: playlists.length,
      totalTracks,
      publicPlaylists,
      privatePlaylists,
    };
  }, [playlists]);

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    filteredAndSortedPlaylists,
    playlistStats,
  };
};
