// src/components/PlaylistScreen/Navigation/MobileBottomNav.jsx
import React from "react";
import { Music, Download, UserRound, LibraryBig } from "lucide-react";

const MobileBottomNav = ({
  activeTab,
  setActiveTab,
  playlist,
  // handleExportAll,
  playlists,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-pb rounded-t-3xl">
      <div className="flex justify-around py-2">
        <button
          onClick={() => setActiveTab("playlists")}
          className={`flex flex-col items-center gap-1 py-2 px-3 min-w-0 ${
            activeTab === "playlists" ? "text-[#1db954]" : "text-gray-500"
          }`}
        >
          <LibraryBig className="w-5 h-5 flex-shrink-0" />

          <span className="text-xs truncate">Library</span>
        </button>

        <button
          onClick={() => setActiveTab("tracks")}
          disabled={!playlist}
          className={`flex flex-col items-center gap-1 py-2 px-3 min-w-0 ${
            activeTab === "tracks" ? "text-[#1db954]" : "text-gray-500"
          } ${!playlist ? "opacity-50" : ""}`}
        >
          <Music className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs truncate">Tracks</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 py-2 px-3 min-w-0 ${
            activeTab === "profile" ? "text-[#1db954]" : "text-gray-500"
          }`}
        >
          <UserRound className="w-5 h-5 flex-shrink-0" />

          <span className="text-xs truncate">Profile</span>
        </button>

        {/* <button
          onClick={handleExportAll}
          disabled={playlists.length === 0}
          className={`flex flex-col items-center gap-1 py-2 px-3 min-w-0 text-gray-500 ${
            playlists.length === 0 ? "opacity-50" : ""
          }`}
        >
          <Download className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs truncate">Export</span>
        </button> */}
      </div>
    </div>
  );
};

export default MobileBottomNav;
