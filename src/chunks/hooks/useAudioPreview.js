// src/hooks/useAudioPreview.js
import { useState } from "react";

export const useAudioPreview = () => {
  const [playingTrack, setPlayingTrack] = useState(null);

  const handlePlayPreview = (trackId, previewUrl) => {
    if (!previewUrl) return;

    if (playingTrack === trackId) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(trackId);
      setTimeout(() => setPlayingTrack(null), 30000);
    }
  };

  return { playingTrack, handlePlayPreview };
};
