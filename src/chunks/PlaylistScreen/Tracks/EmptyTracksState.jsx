// src/components/PlaylistScreen/Tracks/EmptyTracksState.jsx
import React from "react";
import { ListMusic } from "lucide-react";

const EmptyTracksState = ({ setActiveTab }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 lg:p-16 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <ListMusic className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-3">
        Select a Playlist
      </h3>
      <p className="text-gray-500 mb-6">Choose a playlist to view its tracks</p>
      <button
        onClick={() => setActiveTab("playlists")}
        className="bg-[#1db954] hover:bg-[#1ed760] text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        Browse Playlists
      </button>
    </div>
  );
};

export default EmptyTracksState;
