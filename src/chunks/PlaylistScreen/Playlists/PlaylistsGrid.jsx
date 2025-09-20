// src/components/PlaylistScreen/Playlists/PlaylistsGrid.jsx
import React from "react";
import StatsCards from "./StatsCards";
import PlaylistCard from "./PlaylistCard";
import { Music } from "lucide-react";

const PlaylistsGrid = ({
  playlists,
  playlist,
  playlistStats,
  handleViewTracks,
  handleSingleExport,
  isLoadingTracks,
  loadingPlaylistId,
}) => {
  return (
    <>
      <StatsCards stats={playlistStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {playlists.length > 0 ? (
          playlists.map((pl) => (
            <PlaylistCard
              key={pl.id}
              playlist={pl}
              isSelected={playlist?.id === pl.id}
              onViewTracks={handleViewTracks}
              onExport={handleSingleExport}
              isLoading={isLoadingTracks && loadingPlaylistId === pl.id}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No playlists found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaylistsGrid;
