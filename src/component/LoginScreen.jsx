import React from 'react';
import { getLoginUrl } from '../api/spotify';

function LoginScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 shadow-xl rounded-md p-20 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">Tune Transfer</h1>
        <span className='hover:bg-green-500 p-3 rounded-3xl font-bold bg-green-700 cursor-pointer text-white '>
          <a href={getLoginUrl()}>Login to Spotify</a>
        </span>
      </div>
    </div>
  );
}

export default LoginScreen;
