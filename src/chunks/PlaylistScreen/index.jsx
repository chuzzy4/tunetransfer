// src/components/PlaylistScreen/index.js
import React, { useState } from "react";
import MobileHeader from "./ Header/MobileHeader";
import DesktopHeader from "./ Header/DesktopHeader";
import TabNavigation from "./Navigation/TabNavigation";
import MobileBottomNav from "./Navigation/MobileBottomNav";
import PlaylistsGrid from "./Playlists/PlaylistsGrid";
import TracksView from "./Tracks/TracksView";
import EmptyTracksState from "./Tracks/EmptyTracksState";
import ProfileView from "./Profile/ProfileView";
import { useProfile } from "../hooks/useProfile";
import { usePlaylistFilters } from "../hooks/usePlaylistFilters";
import { useAudioPreview } from "../hooks/useAudioPreview";

function PlaylistScreen({
  playlists,
  playlist,
  handleFetchPlaylist,
  handleExport,
  handleExportAll,
}) {
  const [activeTab, setActiveTab] = useState("playlists");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isLoadingTracks, setIsLoadingTracks] = useState(false);
  const [loadingPlaylistId, setLoadingPlaylistId] = useState(null);

  // Custom hooks
  const { user, isLoadingProfile, profileError } = useProfile();
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    filteredAndSortedPlaylists,
    playlistStats,
  } = usePlaylistFilters(playlists, user);
  const { playingTrack, handlePlayPreview } = useAudioPreview();

  const handleViewTracks = async (playlistItem) => {
    try {
      setIsLoadingTracks(true);
      setLoadingPlaylistId(playlistItem.id);

      if (handleFetchPlaylist) {
        await handleFetchPlaylist(playlistItem.id);
        setActiveTab("tracks");
        setShowMobileMenu(false);
      } else {
        console.error("handleFetchPlaylist function not provided");
        alert("Unable to load tracks - function not available");
      }
    } catch (error) {
      console.error("Error fetching playlist:", error);
      alert("Failed to load playlist tracks. Please try again.");
    } finally {
      setIsLoadingTracks(false);
      setLoadingPlaylistId(null);
    }
  };

  const handleSingleExport = async (playlistItem) => {
    try {
      if (handleExport) {
        await handleExport(playlistItem);
      } else {
        console.error("handleExport function not provided");
        alert("Unable to export - function not available");
      }
    } catch (error) {
      console.error("Error exporting playlist:", error);
      alert("Failed to export playlist. Please try again.");
    }
  };

  const commonProps = {
    playlists,
    playlist,
    user,
    activeTab,
    setActiveTab,
    handleExport,
    handleExportAll,
    showMobileMenu,
    setShowMobileMenu,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader
        {...commonProps}
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />

      {/* Desktop Header */}
      <DesktopHeader {...commonProps} />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-6 pb-20 lg:pb-6">
        {/* Desktop Tab Navigation */}
        <TabNavigation
          {...commonProps}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
        />

        {/* Content Areas */}
        {activeTab === "playlists" && (
          <PlaylistsGrid
            playlists={filteredAndSortedPlaylists}
            playlist={playlist}
            playlistStats={playlistStats}
            handleViewTracks={handleViewTracks}
            handleSingleExport={handleSingleExport}
            isLoadingTracks={isLoadingTracks}
            loadingPlaylistId={loadingPlaylistId}
          />
        )}

        {activeTab === "tracks" && playlist && (
          <TracksView
            playlist={playlist}
            handleExport={handleExport}
            playingTrack={playingTrack}
            handlePlayPreview={handlePlayPreview}
          />
        )}

        {activeTab === "tracks" && !playlist && (
          <EmptyTracksState setActiveTab={setActiveTab} />
        )}

        {activeTab === "profile" && (
          <ProfileView
            user={user}
            isLoadingProfile={isLoadingProfile}
            profileError={profileError}
          />
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav {...commonProps} handleExportAll={handleExportAll} />
    </div>
  );
}

export default PlaylistScreen;
