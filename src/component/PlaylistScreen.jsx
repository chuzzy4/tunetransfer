import React from 'react';
import logo from '../assets/images/lg.png'


function PlaylistScreen({
    playlists,
    playlist,
    token,
    playlistId,
    setPlaylistId,
    handleFetchPlaylist,
    handleExport,
    handleExportAll,
}) {
    return (
        <div className="min-h-screen bg-slate-800 dark:bg-zinc-900 relative">
            <div className="dark:bg-zinc-800 rounded-md relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 sticky top-0 z-50 bg-white md:shadow-xl shadow-md p-5 w-full">
                    <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 md:mb-0">Tune Transfer</h1>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        <input
                            type="text"
                            placeholder="Enter Playlist ID"
                            className="p-2 border rounded-md dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-300"
                            value={playlistId}
                            onChange={(e) => setPlaylistId(e.target.value)}
                        />
                        <button onClick={handleFetchPlaylist} className="bg-black text-white px-4 py-2 rounded-md  items-center">+</button>
                        <button onClick={handleExport} className="bg-black text-white px-4 py-2 rounded-md  items-center">
                            Export as CSV
                        </button>
                        <button onClick={handleExportAll} className="bg-black text-white px-4 py-2 rounded-md  items-center">
                         Docs
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {playlists.map((pl, index) => (
                        <div key={index} className="bg-white dark:bg-zinc-800 p-4 rounded-md shadow-sm flex items-start space-x-4 border border-zinc-200 dark:border-zinc-700">
                            <div>
                                <img aria-hidden="true" alt="music-note" src={pl.images.length > 0 ? pl.images[0].url : 'https://placehold.co/32'} className="w-8 h-8" />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">{pl.name}</h2>
                                <p className="text-zinc-600 dark:text-zinc-400">{pl.description || 'No description'}</p>
                            </div>
                            <span className="text-zinc-500 dark:text-zinc-400">{pl.id}</span>
                        </div>
                    ))}
                </div>

                {playlist && (
                    <div className="mt-4 space-y-4">
                        <div className='flex flex-col gap-5 m-5'>
                            {playlist.tracks.items.map((item, index) => (
                                <div className="bg-white dark:bg-zinc-800 p-4 rounded-md shadow-sm flex items-start space-x-4 border border-zinc-200 dark:border-zinc-700 animate__animated animate__fadeIn" key={index}>
                                    <div>
                                        <img aria-hidden="true" alt="album-cover" src={item.track.album.images.length > 0 ? item.track.album.images[0].url : 'https://placehold.co/32'} className="w-16 h-16" />
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="md:text-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.track.name}</h2>
                                        <p className="text-zinc-600 dark:text-zinc-400 text-xs">{item.track.artists.map(artist => artist.name).join(', ')}</p>
                                    </div>
                                    <p className="text-purple-900 dark:text-zinc-400 text-xs">{item.track.album.release_date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

           
            {!playlist && (
                <div className="absolute inset-0 flex justify-center items-center opacity-30">
                    <img src={logo} alt="watermark" className="max-w-full max-h-full" />
                </div>
            )}
        </div>
    );
}

export default PlaylistScreen;
