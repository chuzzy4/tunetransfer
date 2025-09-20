// src/components/PlaylistScreen/Tracks/TrackItem.jsx
import React from "react";
import { Play, Pause } from "lucide-react";
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";
import { formatDuration, formatDate } from "../../../utils/formatters";

const TrackItem = ({ item, index, playingTrack, handlePlayPreview }) => {
  return (
    <div className="flex items-center gap-3 lg:gap-4 py-3 lg:py-4 px-4 lg:px-6 hover:bg-gray-50 transition-colors group">
      {/* Mobile Layout */}
      <div className="lg:hidden flex items-center gap-3 w-full">
        <div className="w-8 flex items-center justify-center">
          {item.track.preview_url ? (
            <button
              onClick={() =>
                handlePlayPreview(item.track.id, item.track.preview_url)
              }
              className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-[#1db954] transition-all"
            >
              {playingTrack === item.track.id ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
          ) : (
            <span className="text-sm text-gray-500 font-medium">
              {index + 1}
            </span>
          )}
        </div>

        <img
          src={
            item.track.album?.images?.[0]?.url ||
            "https://placehold.co/48x48/1db954/ffffff?text=♪"
          }
          alt={item.track.name}
          className="w-12 h-12 rounded object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900 truncate text-sm">
              {item.track.name}
            </h4>
            {item.track.explicit && (
              <span className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-xs font-medium">
                E
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">
            {item.track.artists?.map((a) => a.name).join(", ") ||
              "Unknown Artist"}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {item.track.album?.name || "Unknown Album"}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="text-xs text-gray-500 tabular-nums">
            {formatDuration(item.track.duration_ms)}
          </div>
          <a
            href={item.track.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#1db954] transition-all p-1"
          >
            <LiaExternalLinkSquareAltSolid className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:contents">
        <div className="w-8 text-center">
          {item.track.preview_url ? (
            <button
              onClick={() =>
                handlePlayPreview(item.track.id, item.track.preview_url)
              }
              className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-[#1db954] transition-all"
            >
              {playingTrack === item.track.id ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
          ) : (
            <span className="text-sm text-gray-500 font-medium">
              {index + 1}
            </span>
          )}
        </div>

        <img
          src={
            item.track.album?.images?.[0]?.url ||
            "https://placehold.co/48x48/1db954/ffffff?text=♪"
          }
          alt={item.track.name}
          className="w-12 h-12 rounded object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900 truncate">
              {item.track.name}
            </h4>
            {item.track.explicit && (
              <span className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-xs font-medium">
                E
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">
            {item.track.artists?.map((a) => a.name).join(", ") ||
              "Unknown Artist"}
          </p>
        </div>

        <div className="w-48 text-sm text-gray-600 truncate">
          {item.track.album?.name || "Unknown Album"}
        </div>

        <div className="w-32 text-sm text-gray-500">
          {formatDate(item.added_at)}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 tabular-nums">
            {formatDuration(item.track.duration_ms)}
          </div>
          <a
            href={item.track.external_urls?.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-[#1db954] transition-all p-1"
          >
            <LiaExternalLinkSquareAltSolid className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
