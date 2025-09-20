// src/components/PlaylistScreen/Playlists/StatsCards.jsx
import React from "react";
import { ListMusic, Music, Users, Clock } from "lucide-react";

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
      <div className="bg-white rounded-xl border border-gray-200 p-3 lg:p-4">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#1db954] bg-opacity-10 rounded-lg flex items-center justify-center">
            <ListMusic className="w-4 h-4 lg:w-5 lg:h-5 text-[#1db954]" />
          </div>
          <div>
            <p className="text-lg lg:text-2xl font-bold text-gray-900">
              {stats.totalPlaylists}
            </p>
            <p className="text-xs lg:text-sm text-gray-600">Playlists</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-3 lg:p-4">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-500 bg-opacity-10 rounded-lg flex items-center justify-center">
            <Music className="w-4 h-4 lg:w-5 lg:h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-lg lg:text-2xl font-bold text-gray-900">
              {stats.totalTracks.toLocaleString()}
            </p>
            <p className="text-xs lg:text-sm text-gray-600">Tracks</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-3 lg:p-4">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-500 bg-opacity-10 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
          </div>
          <div>
            <p className="text-lg lg:text-2xl font-bold text-gray-900">
              {stats.publicPlaylists}
            </p>
            <p className="text-xs lg:text-sm text-gray-600">Public</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-3 lg:p-4">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-500 bg-opacity-10 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
          </div>
          <div>
            <p className="text-lg lg:text-2xl font-bold text-gray-900">
              {stats.privatePlaylists}
            </p>
            <p className="text-xs lg:text-sm text-gray-600">Private</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
