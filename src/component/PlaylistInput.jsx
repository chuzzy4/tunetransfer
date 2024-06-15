import React, { useState } from 'react';

const PlaylistInput = ({ onFetchPlaylist }) => {
  const [playlistId, setPlaylistId] = useState('');

  const handleFetch = () => {
    onFetchPlaylist(playlistId);
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Enter Playlist ID"
        value={playlistId}
        onChange={(e) => setPlaylistId(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg"
      />
      <button
        onClick={handleFetch}
        className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
      >
        Fetch Playlist
      </button>
    </div>
  );
};

export default PlaylistInput;
