// src/components/PlaylistScreen/Tracks/PlaylistHeader.jsx
import React from "react";
import { Download, Heart, MoreHorizontal } from "lucide-react";

const PlaylistHeader = ({ playlist, handleExport }) => {
  return (
    <div className="p-4 lg:p-8 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row  items-center md:items-start gap-4 lg:gap-6">
        <img
          src={
            playlist.images?.length > 0
              ? playlist.images[0].url
              : "https://placehold.co/200x200/1db954/ffffff?text=♪"
          }
          alt={playlist.name}
          className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 rounded-lg object-cover shadow-lg flex-shrink-0 mx-auto sm:mx-0"
        />
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <p className="text-xs lg:text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
            Playlist
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4 leading-tight">
            {playlist.name}
          </h2>
          {playlist.description && (
            <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-lg leading-relaxed">
              {playlist.description}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 lg:gap-6 text-sm text-gray-600 mb-4 lg:mb-8">
            <span className="font-medium">
              {playlist.owner?.display_name || "Unknown"}
            </span>
            <span className="w-1 h-1 bg-gray-400 rounded-full hidden sm:block"></span>
            <span>{playlist.tracks?.total || 0} songs</span>
            {playlist.followers?.total && (
              <>
                <span className="w-1 h-1 bg-gray-400 rounded-full hidden sm:block"></span>
                <span>
                  {playlist.followers.total.toLocaleString()} followers
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 lg:gap-4">
            <button
              onClick={() => handleExport(playlist)}
              className="bg-[#1db954] hover:bg-[#1ed760] text-white font-semibold px-6 lg:px-8 py-2.5 lg:py-3 rounded-full transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Download className="w-4 h-4" />
              Export Playlist
            </button>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-gray-200 hover:border-gray-300 rounded-full flex items-center justify-center transition-colors">
                <Heart className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
              </button>
              <button className="w-10 h-10 lg:w-12 lg:h-12 border-2 border-gray-200 hover:border-gray-300 rounded-full flex items-center justify-center transition-colors">
                <MoreHorizontal className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
