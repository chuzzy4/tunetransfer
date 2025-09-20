// src/components/PlaylistScreen/Tracks/TracksView.jsx
import React from "react";
import PlaylistHeader from "./PlaylistHeader";
import TrackItem from "./TrackItem";
import { Clock, Music } from "lucide-react";

const TracksView = ({
  playlist,
  handleExport,
  playingTrack,
  handlePlayPreview,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <PlaylistHeader playlist={playlist} handleExport={handleExport} />

      {/* Tracks Header - Desktop only */}
      <div className="hidden lg:block px-6 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
          <div className="w-8 text-center">#</div>
          <div className="w-12"></div>
          <div className="flex-1">Title</div>
          <div className="w-48">Album</div>
          <div className="w-32">Date Added</div>
          <div className="w-16 text-center">
            <Clock className="w-4 h-4 mx-auto" />
          </div>
        </div>
      </div>

      {/* Tracks List */}
      <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
        {playlist.tracks?.items?.length > 0 ? (
          playlist.tracks.items.map((item, index) => {
            if (!item.track) return null;

            return (
              <TrackItem
                key={`${item.track.id}-${index}`}
                item={item}
                index={index}
                playingTrack={playingTrack}
                handlePlayPreview={handlePlayPreview}
              />
            );
          })
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              This playlist is empty
            </h3>
            <p className="text-gray-500">No tracks found in this playlist</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TracksView;
