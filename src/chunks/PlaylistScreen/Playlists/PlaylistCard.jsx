// src/components/PlaylistScreen/Playlists/PlaylistCard.jsx
import React from "react";
import { Download, ListMusic, Users } from "lucide-react";
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";

const PlaylistCard = ({
  playlist,
  isSelected,
  onViewTracks,
  onExport,
  isLoading,
}) => {
  return (
    <div
      className={`bg-white rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
        isSelected
          ? "border-[#1db954] shadow-md"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="p-4 lg:p-6">
        <div className="flex gap-3 lg:gap-4 mb-4">
          <img
            src={
              playlist.images?.length > 0
                ? playlist.images[0].url
                : "https://placehold.co/80x80/1db954/ffffff?text=♪"
            }
            alt={playlist.name}
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg object-cover shadow-sm flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-base lg:text-lg text-gray-900 truncate">
                {playlist.name}
              </h3>
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                <a
                  href={playlist.external_urls?.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#1db954] transition-colors p-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LiaExternalLinkSquareAltSolid className="w-4 h-4" />
                </a>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onExport(playlist);
                  }}
                  className="text-gray-400 hover:text-[#1db954] transition-colors p-1"
                  title="Export Playlist"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {playlist.description || "No description available"}
            </p>

            <div className="flex items-center gap-2 lg:gap-4 text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1">
                <ListMusic className="w-3 h-3" />
                {playlist.tracks?.total || 0} songs
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {playlist.owner?.display_name || "Unknown"}
              </span>
              {playlist.public === false && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  Private
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => onViewTracks(playlist)}
          disabled={isLoading}
          className={`w-full font-medium py-2.5 px-4 rounded-lg transition-all duration-200 relative ${
            isSelected
              ? "bg-[#1db954] text-white"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
          } ${isLoading ? "opacity-75" : ""}`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              Loading...
            </div>
          ) : isSelected ? (
            "Selected"
          ) : (
            "View Tracks"
          )}
        </button>
      </div>
    </div>
  );
};

export default PlaylistCard;
