// src/components/PlaylistScreen/Header/DesktopHeader.jsx
import React from "react";
import { Download } from "lucide-react";

const DesktopHeader = ({
  activeTab,
  playlist,
  user,
  handleExport,
  handleExportAll,
  playlists,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 hidden lg:block">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {activeTab === "tracks"
                  ? playlist?.name || "Tracks"
                  : "Tune Transfer"}
              </h1>
              {user && activeTab === "playlists" && (
                <p className="text-xs text-gray-500">{user.display_name}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExport(playlist)}
              disabled={!playlist}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Export Current
            </button>
            <button
              onClick={handleExportAll}
              disabled={playlists.length === 0}
              className="px-4 py-2 bg-[#1db954] hover:bg-[#1ed760] disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Export All ({playlists.length})
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
