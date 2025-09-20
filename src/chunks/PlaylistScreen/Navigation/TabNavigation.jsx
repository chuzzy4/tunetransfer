// src/components/PlaylistScreen/Navigation/TabNavigation.jsx
import React from "react";
import { Search } from "lucide-react";

const TabNavigation = ({
  activeTab,
  setActiveTab,
  playlists,
  playlist,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
}) => {
  return (
    <div className="hidden lg:flex items-center justify-between mb-6">
      <nav className="flex space-x-8">
        <button
          onClick={() => setActiveTab("playlists")}
          className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === "playlists"
              ? "border-[#1db954] text-[#1db954]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          All Playlists ({playlists.length})
        </button>
        <button
          onClick={() => setActiveTab("tracks")}
          className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === "tracks"
              ? "border-[#1db954] text-[#1db954]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          disabled={!playlist}
        >
          {playlist
            ? `${playlist.name} (${playlist.tracks?.total || 0})`
            : "Select a Playlist"}
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === "profile"
              ? "border-[#1db954] text-[#1db954]"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Profile
        </button>
      </nav>

      {/* Desktop Search and Filters */}
      {activeTab === "playlists" && (
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]/20 focus:border-[#1db954] w-full text-sm"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]/20 focus:border-[#1db954] text-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="tracks">Sort by Track Count</option>
            <option value="recent">Sort by Recent</option>
          </select>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]/20 focus:border-[#1db954] text-sm"
          >
            <option value="all">All Playlists</option>
            <option value="owned">My Playlists</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default TabNavigation;
