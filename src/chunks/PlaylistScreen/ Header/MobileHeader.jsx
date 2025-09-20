// src/components/PlaylistScreen/Header/MobileHeader.jsx
import React from "react";
import {
  ChevronLeft,
  Filter,
  Menu,
  X,
  Music,
  Search,
  Download,
  SlidersHorizontal,
  EllipsisVertical,
} from "lucide-react";

const MobileHeader = ({
  activeTab,
  setActiveTab,
  playlist,
  user,
  showMobileMenu,
  setShowMobileMenu,
  showMobileFilters,
  setShowMobileFilters,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  handleExport,
  handleExportAll,
  playlists,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 lg:hidden">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {activeTab === "tracks" ? (
              <button
                onClick={() => setActiveTab("playlists")}
                className="p-2 -ml-2"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            ) : null}
            <div>
              <h1 className="text-lg font-semibold text-gray-900 ">
                {activeTab === "tracks"
                  ? playlist?.name || "Tracks"
                  : "Tune Transfer"}
              </h1>
              {activeTab === "playlists" && user && (
                <p className="text-xs text-gray-500">{user.display_name}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === "playlists" && (
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="p-2"
              >
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />

                {/* <Filter className="w-5 h-5 text-gray-600" /> */}
              </button>
            )}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                // <Download className="w-5 h-5 text-gray-600" />
                <EllipsisVertical className="w-5 h-5 text-gray-600" />

                // <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Filters */}
        {showMobileFilters && activeTab === "playlists" && (
          <div className="mt-4 space-y-3 pb-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search playlists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]/20 focus:border-[#1db954] w-full"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]/20 focus:border-[#1db954]"
              >
                <option value="name">Sort by Name</option>
                <option value="tracks">Sort by Tracks</option>
                <option value="recent">Sort by Recent</option>
              </select>

              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="flex-1 px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1db954]/20 focus:border-[#1db954]"
              >
                <option value="all">All</option>
                <option value="owned">Mine</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="p-4 space-y-2">
              <button
                onClick={() => {
                  handleExport(playlist);
                  setShowMobileMenu(false);
                }}
                disabled={!playlist}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg disabled:opacity-50"
              >
                <Download className="w-5 h-5 text-gray-600" />
                <span>Export Current</span>
              </button>
              <button
                onClick={() => {
                  handleExportAll();
                  setShowMobileMenu(false);
                }}
                disabled={playlists.length === 0}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg disabled:opacity-50"
              >
                <Download className="w-5 h-5 text-gray-600" />
                <span>Export All ({playlists.length})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;
